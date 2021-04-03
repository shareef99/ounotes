import { FC, useState } from "react";
import { storage, timestamp, db } from "../firebase";
import Notes from "../Notes.json";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";

interface Props {}

interface formData {
    year: string;
    sem: string;
    subject: string;
}

export const Upload: FC<Props> = () => {
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string>();
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const { user, admins } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    const [file, setFile] = useState<File>(); // Default
    const year: string = watch("year");
    const sem: string = watch("sem");

    const handleFileSelection = (e: any) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        setFile(selectedFile);
        setProgress(0);
        setIsUploaded(false);
    };

    const onSubmit = (data: formData) => {
        setError("");
        setProgress(0);
        setIsUploaded(false);

        let fileRef: any;

        if (admins.includes(user.email)) {
            fileRef = storage.ref(
                `${data.year} year/${data.sem} sem/${data.subject}/${file?.name}`
            );
        } else {
            fileRef = storage.ref(
                `unchecked/${data.year} year/${data.sem} sem/${data.subject}/${file?.name}`
            );
        }

        // Use metaData to specify the details about file and
        // pass it as a parameter to .put method
        // const metaData = {
        // name: file.name,
        // };

        if (data.subject === "default") {
            setError("make sure to select subject!");
            return;
        }

        if (!file) {
            setError("Try selecting file again");
            return;
        }

        fileRef.put(file!).on(
            "state_changed",
            (snapshot: any) => {
                setProgress(
                    Math.floor(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                );
            },
            (err: any) => {
                setError(
                    `Error while uploading! make sure your file size is less than 100mb,
                     Try again in a while`
                );
            },
            async () => {
                const url = await fileRef.getDownloadURL();
                const createdAt = new Date(
                    timestamp.now().seconds * 1000
                ).toLocaleDateString();
                await db.collection("notes").add({
                    url,
                    email: user.email,
                    createdBy: user.name,
                    createdAt,
                    year: data.year,
                    sem: data.sem,
                    subject: data.subject,
                    name: file?.name,
                });
                setIsUploaded(true);
                setFile(undefined);
                console.log(file);
                reset();
            }
        );
    };

    return (
        <>
            <Navbar />
            <section
                id="popup"
                className="w-full h-screen colCenter bg-whiteShade text-lightBlack -mt-16"
            >
                <div
                    className="border-2 rounded-lg shadow-2xl space-y-8 px-10 py-14 mx-auto w-72 flexCenter
                        flex-col space-y-8"
                >
                    <div>
                        <h3 className="font-semibold text-lg">
                            Select Details
                        </h3>
                    </div>
                    <form
                        action=""
                        className="flex flex-col flex-wrap justify-center items-center w-full space-y-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <label htmlFor="year" className="w-full">
                            <select
                                id="year"
                                defaultValue="year"
                                className="box-content max-w-full w-full bg-whiteShade focus:outline-none
                                    hover:cursor-pointer"
                                {...register("year", { required: true })}
                            >
                                <option value="year" disabled>
                                    Year
                                </option>
                                <option value="first">Ist year</option>
                                <option value="second">IInd year</option>
                                <option value="third">IIrd year</option>
                                <option value="forth">IVrd year</option>
                            </select>
                        </label>
                        <label htmlFor="sem" className="w-full">
                            <select
                                id="sem"
                                defaultValue="sem"
                                {...register("sem", { required: true })}
                                className="box-content max-w-full w-full bg-whiteShade focus:outline-none
                                    hover:cursor-pointer"
                            >
                                <option value="sem" disabled>
                                    Sem
                                </option>
                                <option value="first">Ist sem</option>
                                <option value="second">IInd sem</option>
                            </select>
                        </label>
                        <label htmlFor="subjects" className="w-full">
                            <select
                                id="subjects"
                                defaultValue="default"
                                {...register("subject", { required: true })}
                                className="box-content max-w-full w-full bg-whiteShade focus:outline-none
                                    hover:cursor-pointer"
                            >
                                <option
                                    value="default"
                                    disabled
                                    className="box-content max-w-full w-full"
                                >
                                    Subjects
                                </option>
                                {Notes.find(
                                    (x) => x.year === year && x.sem === sem
                                )?.subjects.map((subject) => (
                                    <option
                                        value={subject}
                                        key={subject}
                                        className="w-full max-w-full box-content"
                                    >
                                        {subject}
                                    </option>
                                ))}
                            </select>
                            {errors.subject && (
                                <span className="text-red-500">
                                    Select subject
                                </span>
                            )}
                        </label>
                        <div id="message" className="text-center space-y-2">
                            {progress > 5 && (
                                <div className="box-content max-w-full w-full ">
                                    uploading: {progress}%
                                </div>
                            )}
                            {isUploaded && (
                                <p className="box-content max-w-full w-full text-green-500">
                                    File uploaded successfully!
                                    <br />
                                    {file?.name}
                                </p>
                            )}
                            {error && (
                                <p className="box-content max-w-full w-full text-red-500">
                                    {error}
                                </p>
                            )}
                            {file && (
                                <p className="box-content max-w-full w-full text-lightBlack">
                                    Selected File: {file.name}
                                </p>
                            )}
                        </div>
                        <label
                            htmlFor="upload-file"
                            className="pt-4 w-full flexCenter"
                        >
                            <span
                                className="hover:cursor-pointer focus:outline-none border-2 flexCenter
                                border-whiteShade rounded-md px-3 py-2 bg-lightBlack text-whiteShade
                                hover:bg-midBlack transition duration-300 ease-in w-full"
                            >
                                Upload file
                            </span>
                            <input
                                type="file"
                                id="upload-file"
                                className="opacity-0 w-0 h-0 absolute"
                                onChange={handleFileSelection}
                                multiple={false}
                            />
                        </label>
                        <label htmlFor="submit" className="w-full flexCenter">
                            <input
                                type="submit"
                                id="submit"
                                name="submit"
                                className="hover:cursor-pointer focus:outline-none border-2 
                                border-whiteShade rounded-md px-3 py-2 bg-lightBlack text-whiteShade
                                hover:bg-midBlack transition duration-300 ease-in w-full"
                            />
                        </label>
                    </form>
                    <div className="relative right-1 flexCenter">
                        ←
                        <button
                            className="underline hover:no-underline focus:no-underline ml-2 ease-in
                                transition-all duration-300"
                        >
                            <Link to="/">Back to home</Link>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};
