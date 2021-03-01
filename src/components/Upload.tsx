import { FC, useState } from "react";
import { storage } from "../firebase";

interface Props {}

export const Upload: FC<Props> = () => {
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleFileUpload = (e: any) => {
        const file = e.target.files[0];
        const storageRef = storage.ref("first year/first sem");
        const fileRef = storageRef.child(file.name);
        // Use metaData to specify the details about file and
        // pass it as a parameter to .put method
        // const metaData = {
        // name: file.name,
        // };
        fileRef
            .put(file)
            .then(() => {
                setMessage("Uploaded file successfully");
            })
            .catch((err) => {
                setError("Failed to upload!");
            });
    };

    return (
        <>
            <input type="file" onChange={handleFileUpload} />
            {<h1>{message}</h1>}
            {<h1>{error && error}</h1>}
        </>
    );
};
