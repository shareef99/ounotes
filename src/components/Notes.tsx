import { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { NotesType } from "../types";

interface Props extends RouteComponentProps<{ subject: string }> {}

export const Notes: FC<Props> = ({ match }) => {
    const subject = match.params.subject;
    const [notes, setNotes] = useState<NotesType[]>();
    const { user } = useAuth();

    useEffect(() => {
        db.collection("notes")
            .where("year", "==", user.year)
            .where("sem", "==", user.sem)
            .where("subject", "==", subject)
            .onSnapshot((snap) => {
                setNotes(
                    snap.docs.map((doc) => ({
                        year: doc.data().year,
                        sem: doc.data().sem,
                        subject: doc.data().subject,
                        createdAt: doc.data().createdAt,
                        createdBy: doc.data().createdBy,
                        email: doc.data().email,
                        url: doc.data().url,
                    }))
                );
            });
    }, [user, subject]);

    console.log(notes);

    return (
        <>
            <h1>{subject}</h1>
        </>
    );
};
