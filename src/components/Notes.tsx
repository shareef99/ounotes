import { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { NotesType } from "../types";
import { Navbar } from "./Navbar";

interface Props extends RouteComponentProps<{ subject: string }> {}

export const Notes: FC<Props> = ({ match }) => {
    const subject = match.params.subject;
    const [notes, setNotes] = useState<NotesType[]>();
    const { user } = useAuth();

    useEffect(() => {
        const unsub = db
            .collection("notes")
            .where("subject", "==", subject)
            .orderBy("createdAt", "desc")
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
                        name: doc.data().name,
                    }))
                );
            });

        return () => unsub();
    }, [user, subject]);

    console.log(notes);

    return (
        <>
            <section className="bg-whiteShade w-full h-screen">
                <Navbar />
                <div className="colCenter space-y-8 bg-whiteShade">
                    {notes?.map((note) => (
                        <div
                            key={note.name}
                            className="colCenter border-b-2 px-8 py-4 space-y-4"
                        >
                            <div>
                                <a
                                    href={note.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="colCenter space-y-4"
                                >
                                    <span className="flex">{note.name} ➚</span>
                                </a>
                            </div>
                            <div className="font-light text-base">
                                <p>Created At: {note.createdAt}</p>
                                <p>Uploaded by: {note.createdBy}</p>
                            </div>
                            {console.log(new Date(note.createdAt.nanoseconds))}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};
