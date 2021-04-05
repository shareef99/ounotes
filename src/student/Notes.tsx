import { FC, useEffect, useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { NotesType } from "../types";
import { Navbar } from "../components/Navbar";
import { useForm } from "react-hook-form";

interface Props extends RouteComponentProps<{ subject: string }> {}

interface FormType {
    editName: string;
}

export const Notes: FC<Props> = ({ match }) => {
    const subject = match.params.subject;
    const [notes, setNotes] = useState<NotesType[]>();
    const { user, admins } = useAuth();
    const [docId, setDocId] = useState<string>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormType>();

    const onSubmit = (data: FormType) => {
        const newName = data.editName;
        db.collection("notes").doc(docId).update({
            name: newName,
        });
        reset();
        setDocId("");
    };

    useEffect(() => {
        const unsub = db
            .collection("notes")
            .where("subject", "==", subject)
            .orderBy("name", "asc")
            .onSnapshot((snap) => {
                setNotes(
                    snap.docs.map((doc) => ({
                        docId: doc.id,
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

    const handleEditName = (docId: string) => {
        setDocId(docId);
    };

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
                                <p>
                                    if you have the notes for {subject} you can{" "}
                                    <Link
                                        to="/pages/upload"
                                        className="font-semibold hover:font-normal focus:font-normal
                                        transition-all duration-300 ease-in"
                                    >
                                        upload
                                    </Link>{" "}
                                    it or{" "}
                                    <Link
                                        to="/pages/request"
                                        className="font-semibold hover:font-normal focus:font-normal
                                        transition-all duration-300 ease-in"
                                    >
                                        request
                                    </Link>{" "}
                                    it
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="colCenter space-y-8 bg-whiteShade my-14">
                        {notes?.map((note) => (
                            <div
                                key={note.docId}
                                className="colCenter border-b-2 px-8 py-4 space-y-4 "
                            >
                                <div>
                                    <Link
                                        to={`/pdf/${note.docId}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="colCenter space-y-4"
                                    >
                                        <span className="flex">
                                            {note.name} ➚
                                        </span>
                                    </Link>
                                </div>
                                <div className="font-light text-base">
                                    <p>Uploaded At: {note.createdAt}</p>
                                    <p>Uploaded by: {note.createdBy}</p>
                                </div>
                                {admins.includes(user?.email) && (
                                    <div>
                                        <div>
                                            {docId !== note.docId && (
                                                <button
                                                    onClick={() =>
                                                        handleEditName(
                                                            note.docId
                                                        )
                                                    }
                                                >
                                                    Edit name
                                                </button>
                                            )}
                                            {docId === note.docId && (
                                                <div>
                                                    <form
                                                        action=""
                                                        className="space-x-2"
                                                        onSubmit={handleSubmit(
                                                            onSubmit
                                                        )}
                                                    >
                                                        <label htmlFor="editName">
                                                            <input
                                                                {...register(
                                                                    "editName",
                                                                    {
                                                                        required: true,
                                                                    }
                                                                )}
                                                                type="text"
                                                                id="editName"
                                                                placeholder="Enter new name"
                                                                className="focus:outline-none 
                                                                bg-whiteShade px-2 py-1
                                                                border-2 "
                                                            />
                                                        </label>
                                                        <input
                                                            type="submit"
                                                            className="bg-whiteShade 
                                                                hover:cursor-pointer"
                                                        />
                                                    </form>
                                                    <span className="text-red-500 ">
                                                        {errors.editName &&
                                                            "Empty name cannot be assign"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};
