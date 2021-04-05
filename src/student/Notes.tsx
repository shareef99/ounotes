import { FC, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { NotesType } from "../types";
import { Navbar } from "../components/Navbar";

interface Props extends RouteComponentProps<{ subject: string }> {}

export const Notes: FC<Props> = ({ match }) => {
    const subject = match.params.subject;
    const [notes, setNotes] = useState<NotesType[]>();
    const { user } = useAuth();

    useEffect(() => {
        const unsub = db
            .collection("notes")
            .where("subject", "==", subject)
            .orderBy("name", "asc")
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

    return (
        <>
            <section className="bg-whiteShade w-full h-screen">
                <Navbar />
                {notes?.length === 0 ? (
                    <>
                        <div className="colCenter h-screen -mt-16 space-y-8 bg-whiteShade">
                            <div
                                key="No notes"
                                className="colCenter border-b-2 px-8 py-4 space-y-4 max-w-9/10 mx-auto
                                    sm:max-w-8/10 md:max-w-6/10"
                            >
                                <p>
                                    Sorry we don't have the notes of {subject}{" "}
                                    yet, We will notify you once someone
                                    uploaded the notes
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="colCenter space-y-8 bg-whiteShade my-14">
                        {notes?.map((note) => (
                            <div
                                key={note.name}
                                className="colCenter border-b-2 px-8 py-4 space-y-4 "
                            >
                                <div>
                                    <a
                                        href={note.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="colCenter space-y-4"
                                    >
                                        <span className="flex">
                                            {note.name} ➚
                                        </span>
                                    </a>
                                </div>
                                <div className="font-light text-base">
                                    <p>Uploaded At: {note.createdAt}</p>
                                    <p>Uploaded by: {note.createdBy}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};
