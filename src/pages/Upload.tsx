import { FC, useState } from "react";
import { storage, timestamp, db } from "../firebase";
import details from "../details.json";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";

interface Props {}

interface formData {
    group: string;
    sem: string;
    subject: string;
    type: string;
}

export const Upload: FC<Props> = () => {
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

    const [files, setFiles] = useState<Array<File>>([]); // Default
    const [uploadedFiles, setUploadedFiles] = useState<Array<File>>([]);

    const group: string = watch("group");
    const sem: string = watch("sem");
    const type: string = watch("type");
    const subject: string = watch("subject");

    const handleFileSelection = (e: any) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newFile = e.target.files[i];
            setFiles((prevState) => [...prevState, newFile]);
        }
        setError(undefined);
        setIsUploaded(false);
    };

    const handleNonAdminUploads = () => {
        if (!admins.includes(user.email)) {
            setMessage("We will notify you, When it is uploaded");
        }
    };

    const onSubmit = (data: formData) => {
        setError(undefined);
        setIsUploaded(false);

        if (subject === "default" || subject === undefined) {
            setError("make sure to select subject!");
            return;
        }

        if (type === "default" || type === undefined) {
            setError("Select type of the file!");
            return;
        }

        if (files.length === 0) {
            setError("Try selecting file(s).");
            return;
        }

        const promises: any = [];
        files.forEach((file, index) => {
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

            const uploadTask = fileRef.put(file);
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                (snapshot: any) => {
                    setMessage(`Uploading file(s)...`);
                },
                (err: any) => {
                    setError(`Error while uploading! Try again in a while`);
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
                            group,
                            sem,
                            subject,
                            name: file?.name,
                            type,
                        });
                }
            );
            Promise.all(promises)
                .then(() => {
                    setUploadedFiles(files);
                    setFiles([]);
                    handleNonAdminUploads();
                    setIsUploaded(true);
                    reset();
                    setMessage(undefined);
                })
                .catch((err) => {
                    setError(err.message);
                });
        });
    };

    return (
        <>
            <Navbar />
            <section
                id="popup"
                className="w-full h-screen colCenter bg-whiteShade text-lightBlack -mt-16"
            >
                <div className="border-2 rounded-lg shadow-2xl px-10 py-8 mx-auto w-72 colCenter space-y-4">
                    <h3 className="font-semibold text-lg">Select Details</h3>
                    <form
                        className="colCenter flex-wrap w-full space-y-2"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <label htmlFor="sem" className="w-full">
                            <select
                                id="sem"
                                defaultValue="default"
                                {...register("sem", { required: true })}
                                className="select"
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
                                className="select"
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
                                className="select"
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
                                className="select"
                                {...register("subject", { required: true })}
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
                            {isUploaded && uploadedFiles && (
                                <div className="uploadPageMessage text-green-500 space-y-2">
                                    Files uploaded successfully! <br />
                                    {uploadedFiles.map((file, index) => (
                                        <>
                                            <p>
                                                {index + 1}. {file.name}
                                            </p>
                                        </>
                                    ))}
                                </div>
                            )}
                            {message && (
                                <p className="uploadPageMessage text-green-500">
                                    {message}
                                </p>
                            )}
                            {error && (
                                <p className="uploadPageMessage text-red-500">
                                    {error}
                                </p>
                            )}
                            {files.length > 0 && (
                                <div className="uploadPageMessage text-lightBlack space-y-2">
                                    Selected File(s): <br />
                                    {files.map((file, index) => (
                                        <>
                                            <p>
                                                {index + 1}. {file.name}
                                            </p>
                                        </>
                                    ))}
                                </div>
                            )}
                        </div>
                        <label
                            htmlFor="upload-files"
                            className="pt-4 w-full flexCenter"
                        >
                            <span className="uploadPageBtn">Upload file</span>
                            <input
                                type="file"
                                id="upload-files"
                                className="opacity-0 w-0 h-0 absolute"
                                onChange={handleFileSelection}
                                multiple={true}
                            />
                        </label>
                        <label htmlFor="submit" className="w-full flexCenter">
                            <input
                                type="submit"
                                id="submit"
                                name="submit"
                                className="uploadPageBtn"
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
