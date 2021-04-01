import { FC, useState } from "react";
import { storage, timestamp, db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Notes from "../Notes.json";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

interface Props {}

export const Upload: FC<Props> = () => {
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [progress, setProgress] = useState<number>();
    const [year, setYear] = useState<string>();
    const [sem, setSem] = useState<string>();
    const [subject, setSubject] = useState<string>();
    const [fileName, setFileName] = useState<string>();
    const [isSubjectSelected, setIsSubjectSelected] = useState<boolean>(false);
    const { user } = useAuth();

    const handleYear = (e: any) => {
        e.preventDefault();
        setYear(e.target.value);
    };

    const handleSem = (e: any) => {
        e.preventDefault();
        setSem(e.target.value);
    };

    const handleSubject = (e: any) => {
        e.preventDefault();
        setSubject(e.target.value);
        setIsSubjectSelected(true);
    };

    const handleFileUpload = (e: any) => {
        const file = e.target.files[0];
        const fileRef = storage.ref(
            `${year} year/${sem} sem/${subject}/${file.name}`
        );
        // Use metaData to specify the details about file and
        // pass it as a parameter to .put method
        // const metaData = {
        // name: file.name,
        // };

        setError("");
        setMessage("");
        setProgress(0);
        setFileName(file.name);

        fileRef.put(file).on(
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
                    "Error while uploading! make sure your file size is less than 100mb," +
                        "Try again in a while"
                );
            },
            async () => {
                const url = await fileRef.getDownloadURL();
                const createdAt = new Date(
                    timestamp.now().seconds * 1000
                ).toLocaleDateString();
                const createdBy = user.name;
                const email = user.email;
                const name = file.name;
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
                setMessage("Uploaded successfully!");
                setIsSubjectSelected(false);
            }
        );
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setError(
            `Make sure to select all fields and select subject again for uploading second pdf with same 
            specification`
        );
        setMessage("");
        setProgress(undefined);
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
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="year" className="w-full">
                            <select
                                name="year"
                                id="year"
                                defaultValue="year"
                                onChange={handleYear}
                                className="box-content max-w-full w-full bg-whiteShade focus:outline-none
                                    hover:cursor-pointer"
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
                                name="sem"
                                id="sem"
                                defaultValue="sem"
                                onChange={handleSem}
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
                                name="subjects"
                                id="subjects"
                                defaultValue="default"
                                onChange={handleSubject}
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
                        </label>
                        <div className="text-center">
                            {progress && (
                                <div className="box-content max-w-full w-full">
                                    upload: {progress}%
                                </div>
                            )}
                            {message && (
                                <p className="box-content max-w-full w-full text-green-500">
                                    {message}
                                    <br />
                                    {fileName}
                                </p>
                            )}
                            {error && (
                                <p className="box-content max-w-full w-full text-red-500">
                                    {error}
                                </p>
                            )}
                        </div>
                        <label htmlFor="upload-file" className="pt-4">
                            <span
                                className="hover:cursor-pointer focus:outline-none border-2 
                                border-whiteShade rounded-md px-3 py-2 bg-lightBlack text-whiteShade
                                hover:bg-midBlack transition duration-300 ease-in"
                            >
                                Upload file
                            </span>
                            <input
                                type={`${
                                    isSubjectSelected ? "file" : "submit"
                                }`}
                                id="upload-file"
                                className="opacity-0 w-0 h-0 absolute"
                                onClick={handleFileUpload}
                            />
                        </label>{" "}
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
