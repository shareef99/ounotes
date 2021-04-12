import { FC, useEffect, useState } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db, storage } from "../firebase";
import { NotesType } from "../types";
import { Navbar } from "../components/Navbar";
import { useForm } from "react-hook-form";

interface Props
    extends RouteComponentProps<{
        sem: string;
        group: string;
        subject: string;
    }> {}

interface FormType {
    editName: string;
}

export const Notes: FC<Props> = ({ match }) => {
    const subject = match.params.subject;
    const sem = match.params.sem;
    const group = match.params.group;

    const [notes, setNotes] = useState<NotesType[]>();
    const [importantQuestions, setImportantQuestions] = useState<NotesType[]>();
    const [syllabus, setSyllabus] = useState<NotesType[]>();
    const [questionPapers, setQuestionPapers] = useState<NotesType[]>();

    const { user, admins } = useAuth();

    const [editingNote, setEditingNote] = useState<NotesType>();

    const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState<boolean>(false);
    // const [deleteDocId, setDeleteDocId] = useState<string>();
    const [deleteNote, setDeleteNote] = useState<NotesType>();

    const [error, setError] = useState<string>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormType>();

    // Editing Note name form
    const onSubmit = (data: FormType) => {
        const newName = data.editName;
        db.collection("notes")
            .doc(sem)
            .collection(group)
            .doc(subject)
            .collection(editingNote?.type!)
            .doc(editingNote?.docId)
            .update({
                newName,
            });
        reset();
        setEditingNote(undefined);
    };

    const handleEditName = (note: NotesType) => {
        setEditingNote(note);
    };

    const handleDelete = (docId: string) => {
        setIsDeletePopUpOpen(true);
        setError(undefined);
        const note = notes?.find((x) => x.docId === docId);
        setDeleteNote(note);
    };

    const handleCancelDelete = () => {
        setIsDeletePopUpOpen(false);
    };

    const handleConfirmDelete = () => {
        console.log("Deleting", deleteNote);
        storage
            .ref(
                `${deleteNote?.sem} sem/${deleteNote?.group}/${deleteNote?.subject}/${deleteNote?.type}/${deleteNote?.name}`
            )
            .delete()
            .then(() => {
                db.collection("notes")
                    .doc(sem)
                    .collection(group)
                    .doc(subject)
                    .collection(deleteNote?.type!)
                    .doc(deleteNote?.docId)
                    .delete()
                    .then(() => {
                        setIsDeletePopUpOpen(false);
                        console.log("Deleted", deleteNote);
                    })
                    .catch((err) => {
                        setError(err);
                    });
            })
            .catch((err) => {
                setError(`Fail to delete! ${err.message}`);
            });
    };

    useEffect(() => {
        const getDetails = (
            type: string,
            setFunc: React.Dispatch<
                React.SetStateAction<NotesType[] | undefined>
            >
        ) => {
            db.collection("notes")
                .doc(sem)
                .collection(group)
                .doc(subject)
                .collection(type)
                .onSnapshot((snap) => {
                    setFunc(
                        snap.docs.map((doc) => ({
                            docId: doc.id,
                            createdAt: doc.data().createdAt,
                            createdBy: doc.data().createdBy,
                            email: doc.data().email,
                            group: doc.data().group,
                            newName: doc.data().newName,
                            name: doc.data().name,
                            sem: doc.data().sem,
                            subject: doc.data().subject,
                            type: doc.data().type,
                            url: doc.data().url,
                        }))
                    );
                });
        };

        getDetails("notes", setNotes);
        getDetails("important questions", setImportantQuestions);
        getDetails("syllabus", setSyllabus);
        getDetails("question paper", setQuestionPapers);
    }, [sem, group, subject]);
    console.log(notes);
    console.log(importantQuestions);
    console.log(syllabus);
    console.log(questionPapers);

    return (
        <>
            <section className="bg-whiteShade w-full h-screen">
                <Navbar />
                {isDeletePopUpOpen && (
                    <>
                        <div
                            id="delete-popup"
                            className="w-full h-screen bg-whiteShade colCenter -mt-16 "
                        >
                            <div className="flex flex-col px-3 py-5 space-y-8">
                                <span>
                                    {deleteNote?.newName
                                        ? `${deleteNote.newName}`
                                        : `${deleteNote?.name}`}
                                </span>
                                {error && <span>{error}</span>}
                                <div className="space-x-4 text-center">
                                    <button onClick={handleConfirmDelete}>
                                        Confirm
                                    </button>
                                    <button onClick={handleCancelDelete}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
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
                    <div
                        className={`colCenter space-y-8 bg-whiteShade my-14 ${
                            isDeletePopUpOpen && "hidden"
                        }`}
                    >
                        {!isDeletePopUpOpen &&
                            notes?.map((note) => (
                                <div
                                    key={note.name}
                                    className={`colCenter border-b-2 px-8 py-4 space-y-4 `}
                                >
                                    <div>
                                        <a
                                            href={note.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="colCenter space-y-4"
                                        >
                                            <span className="flex">
                                                {note.newName
                                                    ? `${note.newName}`
                                                    : `${note.name}`}
                                                ➚
                                            </span>
                                        </a>
                                    </div>
                                    <div className="font-light text-base">
                                        <p>Uploaded At: {note.createdAt}</p>
                                        <p>Uploaded by: {note.createdBy}</p>
                                    </div>
                                    {admins.includes(user?.email) && (
                                        <div>
                                            <div className="space-x-4">
                                                {editingNote?.docId !==
                                                    note.docId && (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                handleEditName(
                                                                    note
                                                                )
                                                            }
                                                        >
                                                            Edit name
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    note.docId
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                            {editingNote?.docId ===
                                                note.docId && (
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
                                    )}
                                </div>
                            ))}
                    </div>
                )}
            </section>
        </>
    );
};
