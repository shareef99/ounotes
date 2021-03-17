import { FC, useState } from "react";
import { storage, timestamp, db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Notes from "../Notes.json";

interface Props {}

export const Upload: FC<Props> = () => {
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [downloadURL, setDownloadURL] = useState<string | null>();
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
        setDownloadURL(null);
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
                setDownloadURL(url);
                setMessage("Uploaded successfully!");
            }
        );
    };

    return (
        <>
            <section>
                <div
                    id="popup"
                    className="fixed top-0 left-0 w-full h-full bg-whiteShade"
                >
                    <div>
                        <form action="">
                            <label htmlFor="year">
                                <select
                                    name="year"
                                    id="year"
                                    defaultValue="year"
                                    onChange={handleYear}
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
                            <label htmlFor="sem">
                                <select
                                    name="sem"
                                    id="sem"
                                    defaultValue="sem"
                                    onChange={handleSem}
                                >
                                    <option value="sem" disabled>
                                        Sem
                                    </option>
                                    <option value="first">Ist sem</option>
                                    <option value="second">IInd sem</option>
                                </select>
                            </label>
                            <label htmlFor="subjects">
                                <select
                                    name="subjects"
                                    id="subjects"
                                    defaultValue="default"
                                    onChange={handleSubject}
                                >
                                    <option value="default" disabled>
                                        Subjects
                                    </option>
                                    {Notes.find(
                                        (x) => x.year === year && x.sem === sem
                                    )?.subjects.map((subject) => (
                                        <option value={subject} key={subject}>
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label htmlFor="upload-file">
                                Select file
                                <input
                                    type="file"
                                    id="upload-file"
                                    className="opacity-0 w-0 h-0 absolute"
                                    onChange={handleFileUpload}
                                />
                            </label>{" "}
                            {/* <button type="submit">Submit</button> */}
                        </form>
                        <p>upload: {progress}%</p>
                        <a href={downloadURL ? downloadURL : "#"}>Download</a>
                        {<h1>{message}</h1>}
                        {<h1>{error && error}</h1>}
                    </div>
                </div>
            </section>
        </>
    );
};
