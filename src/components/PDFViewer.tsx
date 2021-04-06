import { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { db } from "../firebase";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

interface Props extends RouteComponentProps<{ docId: string }> {}

export const PDFViewer: FC<Props> = ({ match }) => {
    const docId = match.params.docId;
    const [PDFUrl, setPDFUrl] = useState<string>();

    useEffect(() => {
        db.collection("notes")
            .doc(docId)
            .get()
            .then((docRef) => {
                const data = docRef.data();
                setPDFUrl(data?.url);
            })
            .catch((error) => {});
    }, [docId]);

    return (
        <>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                <div
                    style={{
                        border: "1px solid rgba(0, 0, 0, 0.3)",
                        height: "750px",
                    }}
                >
                    <Viewer
                        fileUrl={`https://cors-anywhere.herokuapp.com/${PDFUrl}`}
                        withCredentials={false}
                    />
                </div>
            </Worker>
        </>
    );
};
