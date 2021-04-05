import { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { db } from "../firebase";
import { PDFObject } from "react-pdfobject";

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
            <div className="h-screen">
                <PDFObject url={`${PDFUrl}`} height={"100vh"} />
            </div>
        </>
    );
};
