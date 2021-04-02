import { FC, useState } from "react";
import { storage, timestamp, db } from "../firebase";
import Notes from "../Notes.json";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";

interface Props {}

export const Upload: FC<Props> = () => {
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string>();
    const [isUploaded, setIsUploaded] = useState<boolean>(false);
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    const year: string = watch("year");
    const sem: string = watch("sem");
    const subject: string = watch("subject");
    const [file, setFile] = useState<File>(); // Default

    const handleFileSelection = (e: any) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        setFile(selectedFile);
        setProgress(0);
        setIsUploaded(false);
    };

    const onSubmit = (data: any) => {
        console.log(data);

        const fileRef = storage.ref(
            `${year} year/${sem} sem/${subject}/${file?.name}`
        );
        // Use metaData to specify the details about file and
        // pass it as a parameter to .put method
        // const metaData = {
        // name: file.name,
        // };

        if (!file) {
            setError("Failed to upload file");
            return;
        }

        fileRef.put(file!).on(
            "state_changed",
            (snapshot) => {
                setProgress(
                    Math.floor(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                );
            },
            (err) => {
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
                const createdBy = user.name;
                const email = user.email;
                const name = file?.name;
                console.log(subject);
                await db.collection("notes").add({
                    url,
                    email,
                    createdBy,
                    createdAt,
                    year,
                    sem,
                    subject,
                    name,
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
                                {/* {Notes.find(
                                    (x) => x.year === year && x.sem === sem
                                )?.subjects.map((subject) => (
                                    <option
                                        value={subject}
                                        key={subject}
                                        className="w-full max-w-full box-content"
                                    >
                                        {subject}
                                    </option>
                                ))} */}
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
                        <label htmlFor="upload-file" className="pt-4">
                            <span
                                className="hover:cursor-pointer focus:outline-none border-2 
                                border-whiteShade rounded-md px-3 py-2 bg-lightBlack text-whiteShade
                                hover:bg-midBlack transition duration-300 ease-in w-12"
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
                            <span
                                className="hover:cursor-pointer focus:outline-none border-2 
                                border-whiteShade rounded-md px-3 py-2 bg-lightBlack text-whiteShade
                                hover:bg-midBlack transition duration-300 ease-in "
                            >
                                Submit
                            </span>
                            <input
                                type="submit"
                                id="submit"
                                name="submit"
                                className="opacity-0 w-0 h-0 absolute"
                            />
                        </label>
                        {/* <input
                            className="hover:cursor-pointer focus:outline-none border-2 
                                border-whiteShade rounded-md px-3 py-2 bg-lightBlack text-whiteShade
                                hover:bg-midBlack transition duration-300 ease-in w-12"
                            type="submit"
                        >
                            Submit
                        </input> */}
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
