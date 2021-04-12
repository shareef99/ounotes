import { FC, useState } from "react";
import { storage, timestamp, db } from "../firebase";
import details from "../details.json";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { metaDataType } from "../types";

interface Props {}

interface formData {
    group: string;
    sem: string;
    subject: string;
    type: string;
}

export const Upload: FC<Props> = () => {
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string>();
    const [message, setMessage] = useState<string>();
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
    const group: string = watch("group");
    const sem: string = watch("sem");
    const type: string = watch("type");

    console.log(group, sem);

    const handleFileSelection = (e: any) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setProgress(0);
        setIsUploaded(false);
    };

    const handleNonAdminUploads = () => {
        if (!admins.includes(user.email)) {
            setMessage("We will notify you, When it is uploaded");
        }
    };

    const onSubmit = (data: formData) => {
        setError("");
        setProgress(0);
        setIsUploaded(false);

        let fileRef: any;

        if (admins.includes(user.email)) {
            fileRef = storage.ref(
                `${data.sem} sem/${data.group}/${data.subject}/${type}/${file?.name}`
            );
        } else {
            fileRef = storage.ref(
                `unchecked/${data.sem} sem/${data.group}/${data.subject}/${type}/${file?.name}`
            );
        }

        if (data.subject === "default") {
            setError("make sure to select subject!");
            return;
        }

        if (!file) {
            setError("Try selecting file again");
            return;
        }

        const metaData: metaDataType = {
            name: file.name,
            size: file.size,
            type: file.type,
        };

        fileRef.put(file!, metaData).on(
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
                await db
                    .collection("notes")
                    .doc(data.sem)
                    .collection(data.group)
                    .doc(data.subject)
                    .collection(data.type)
                    .add({
                        url,
                        email: user.email,
                        createdBy: user.name,
                        createdAt,
                        group: data.group,
                        sem: data.sem,
                        subject: data.subject,
                        name: file?.name,
                        type,
                    });
                setIsUploaded(true);
                setFile(undefined);
                reset();
                handleNonAdminUploads();
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
                        <label htmlFor="sem" className="w-full">
                            <select
                                id="sem"
                                defaultValue="default"
                                {...register("sem", { required: true })}
                                className="box-content max-w-full w-full bg-whiteShade focus:outline-none
                                    hover:cursor-pointer"
                            >
                                <option value="default" disabled>
                                    Sem
                                </option>
                                <option value="first">Ist</option>
                                <option value="second">IInd</option>
                                <option value="third">IIIrd</option>
                                <option value="forth">IVth</option>
                            </select>
                        </label>
                        <label htmlFor="group" className="w-full">
                            <select
                                id="group"
                                defaultValue="default"
                                className="box-content max-w-full w-full bg-whiteShade focus:outline-none
                                    hover:cursor-pointer"
                                {...register("group", { required: true })}
                            >
                                <option value="default" disabled>
                                    Group
                                </option>
                                <option value="CSE">CSE</option>
                                <option value="IT">IT</option>
                                <option value="ECE">ECE</option>
                                <option value="ME">ME</option>
                                <option value="CE">CE</option>
                                <option value="EEE">EEE</option>
                            </select>
                        </label>
                        <label htmlFor="type" className="w-full">
                            <select
                                id="type"
                                defaultValue="default"
                                className="box-content max-w-full w-full bg-whiteShade focus:outline-none
                                    hover:cursor-pointer"
                                {...register("type", { required: true })}
                            >
                                <option value="default" disabled>
                                    type
                                </option>
                                <option value="notes">Notes</option>
                                <option value="important questions">
                                    Important Questions
                                </option>
                                <option value="syllabus">Syllabus</option>
                                <option value="question paper">
                                    Question Paper
                                </option>
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
                                {details
                                    .find(
                                        (x) =>
                                            x.group === group && x.sem === sem
                                    )
                                    ?.subjects.map((subject) => (
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
                            {message && (
                                <p className="box-content max-w-full w-full text-green-500">
                                    {message}
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
