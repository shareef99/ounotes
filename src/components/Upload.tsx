import { FC, useState } from "react";
import { storage } from "../firebase";

interface Props {}

export const Upload: FC<Props> = () => {
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [downloadURL, setDownloadURL] = useState<string | null>();
    const [progress, setProgress] = useState<number>();

    const handleFileUpload = (e: any) => {
        const file = e.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        // Use metaData to specify the details about file and
        // pass it as a parameter to .put method
        // const metaData = {
        // name: file.name,
        // };

        setError("");
        setMessage("");
        setDownloadURL(null);

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
                switch (err.code) {
                    case "storage/unauthorized":
                        setError("Your are not login!");
                        break;
                    case "storage/canceled":
                        setError("Upload canceled!");
                        break;
                    case "storage/quota-exceeded":
                        setError("Storage exceeds!, No more memory available");
                        break;
                    case "storage/unknown":
                        setError(`Failed to upload!\n${err}`);
                        break;
                }
            },
            () => {
                fileRef.getDownloadURL().then((downloadLink) => {
                    setDownloadURL(downloadLink);
                    setMessage("Uploaded successfully!");
                });
            }
        );
    };

    return (
        <>
            <input type="file" onChange={handleFileUpload} />
            <p>upload: {progress}%</p>
            <a href={downloadURL ? downloadURL : "#"}>Download</a>
            {<h1>{message}</h1>}
            {<h1>{error && error}</h1>}
        </>
    );
};
