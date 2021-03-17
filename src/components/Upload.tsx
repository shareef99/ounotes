import { FC, useState } from "react";
import { storage, timestamp, db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Notes from "../Notes.json";

interface Props {}

export const Upload: FC<Props> = () => {
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [progress, setProgress] = useState<number>();
    const [year, setYear] = useState<string>();
    const [sem, setSem] = useState<string>();
    const [subject, setSubject] = useState<string>();
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
                console.log(
                    err.code,
                    err.message,
                    err.name,
                    err.serverResponse
                );
                setError(
                    "Error while uploading! make sure your file size is less than 100mb," +
                        "Try again in a while"
                );
            },
            async () => {
                const url = await fileRef.getDownloadURL();
                const createdAt = timestamp;
                const createdBy = user.name;
                const email = user.email;
                await db.collection("notes").add({
                    url,
                    email,
                    createdBy,
                    createdAt,
                    year,
                    sem,
                    subject,
                });
                setMessage("Uploaded successfully!");
            }
        );
    };

    return (
        <>
            <section
                id="popup"
                className="w-full h-screen colCenter bg-whiteShade"
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
                    >
                        <label htmlFor="year" className="w-full">
                            <select
                                name="year"
                                id="year"
                                defaultValue="year"
                                onChange={handleYear}
                                className="box-content max-w-full w-full bg-whiteShade focus:outline-none"
                            >
                                <option value="year" disabled>
                                    Year
                                </option>
                                <option value="first">First</option>
                                <option value="second">Second</option>
                                <option value="third">Third</option>
                                <option value="forth">Forth</option>
                            </select>
                        </label>
                        <label htmlFor="sem" className="w-full">
                            <select
                                name="sem"
                                id="sem"
                                defaultValue="sem"
                                onChange={handleSem}
                                className="box-content max-w-full w-full bg-whiteShade focus:outline-none"
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
                                className="box-content max-w-full w-full bg-whiteShade focus:outline-none"
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
                        {progress && (
                            <p className="box-content max-w-full w-full">
                                upload: ${progress}
                            </p>
                        )}
                        {message && (
                            <p className="box-content max-w-full w-full text-green-500">
                                message
                            </p>
                        )}
                        {error && (
                            <p className="box-content max-w-full w-full text-red-500">
                                error
                            </p>
                        )}
                        <label htmlFor="upload-file" className="pt-4">
                            <span
                                className="hover:cursor-pointer focus:outline-none
                                border-2 border-whiteShade rounded-md px-3 py-2 bg-lightBlack text-whiteShade  
                            hover:bg-midBlack transition duration-300 ease-in "
                            >
                                Upload file
                            </span>
                            <input
                                type="file"
                                id="upload-file"
                                className="opacity-0 w-0 h-0 absolute"
                                onChange={handleFileUpload}
                            />
                        </label>{" "}
                    </form>
                </div>
            </section>
        </>
    );
};
