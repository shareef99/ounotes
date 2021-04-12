import { FC, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import emailjs from "emailjs-com";
import { Login } from "../components/login";
import details from "../details.json";
import { useForm } from "react-hook-form";

interface Props {}

interface formData {
    group: string;
    sem: string;
    subject: string;
    type: string;
}

export const Request: FC<Props> = () => {
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const { user } = useAuth();
    const { register, handleSubmit, reset, watch } = useForm();

    const group = watch("group");
    const sem = watch("sem");
    const type = watch("type");
    const subject = watch("subject");

    const onSubmit = (data: formData, e: any) => {
        e.preventDefault();
        let emailParams = {
            name: user.name,
            email: user.email,
            group,
            sem,
            type,
            subject,
        };

        if (subject) {
            emailjs
                .send(
                    "service_odb70fx",
                    "template_5lur389",
                    emailParams,
                    "user_c4UeKRVawuTnuQmfFS8ct"
                )
                .then(
                    (response) => {
                        console.log("SUCCESS!", response.status, response.text);
                        setError("");
                        setMessage("Request sended!");
                        reset();
                    },
                    (err) => {
                        setError(`FAILED..., ${err}`);
                    }
                );
        } else {
            setMessage("");
            setError("Make sure to select all fields");
        }
    };

    if (!user) {
        return (
            <>
                <Navbar />
                <section className="w-full h-screen colCenter bg-whiteShade text-lightBlack -mt-16">
                    <div>
                        <Login requestNotes={true} />
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <section
                id="popup"
                className="w-full h-screen colCenter bg-whiteShade text-lightBlack -mt-16"
            >
                <div className="border-2 rounded-lg shadow-2xl px-10 py-8 mx-auto w-72 colCenter space-y-4">
                    <h3 className="font-semibold text-lg">Select Details</h3>
                    <form
                        className="colCenter flex-wrap w-full space-y-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <label htmlFor="sem" className="w-full">
                            <select
                                id="sem"
                                defaultValue="default"
                                {...register("sem", { required: true })}
                                className="select"
                            >
                                <option value="default" disabled>
                                    Sem
                                </option>
                                <option value="first">Ist</option>
                                <option value="second">IInd</option>
                                <option value="third">IIIrd</option>
                                <option value="forth">IVth</option>
                            </select>
                        </label>
                        <label htmlFor="group" className="w-full">
                            <select
                                id="group"
                                defaultValue="default"
                                {...register("group", { required: true })}
                                className="select"
                            >
                                <option value="default" disabled>
                                    Group
                                </option>
                                <option value="CSE">CSE</option>
                                <option value="IT">IT</option>
                                <option value="ECE">ECE</option>
                                <option value="ME">ME</option>
                                <option value="CE">CE</option>
                                <option value="EEE">EEE</option>
                            </select>
                        </label>
                        <label htmlFor="type" className="w-full">
                            <select
                                id="type"
                                defaultValue="default"
                                {...register("type", { required: true })}
                                className="select"
                            >
                                <option value="default" disabled>
                                    type
                                </option>
                                <option value="notes">Notes</option>
                                <option value="important questions">
                                    Important Questions
                                </option>
                                <option value="syllabus">Syllabus</option>
                                <option value="question paper">
                                    Question Paper
                                </option>
                            </select>
                        </label>
                        <label htmlFor="subjects" className="w-full">
                            <select
                                id="subjects"
                                defaultValue="default"
                                className="select"
                                {...register("subject", { required: true })}
                            >
                                <option
                                    value="default"
                                    disabled
                                    className="box-content max-w-full w-full"
                                >
                                    Subjects
                                </option>
                                {details
                                    .find(
                                        (x) =>
                                            x.group === group && x.sem === sem
                                    )
                                    ?.subjects.map((subject) => (
                                        <option
                                            value={subject}
                                            key={subject}
                                            className="w-full max-w-full box-content"
                                        >
                                            {subject}
                                        </option>
                                    ))}
                            </select>
                        </label>
                        <div className="text-center">
                            {message && (
                                <p className="box-content max-w-full w-full text-green-500">
                                    {message}
                                    <br />
                                </p>
                            )}
                            {error && (
                                <p className="box-content max-w-full w-full text-red-500">
                                    {error}
                                </p>
                            )}
                        </div>
                        <label htmlFor="request-notes" className="pt-4">
                            <span className="uploadPageBtn">Request Note</span>
                            <input
                                id="request-notes"
                                name="request-notes"
                                type="submit"
                                className="opacity-0 w-0 h-0 absolute"
                            />
                        </label>
                    </form>
                    <div className="relative right-1 flexCenter">
                        ←
                        <button
                            className="underline hover:no-underline focus:no-underline ml-2
                                    transition-all duration-300 ease-in"
                        >
                            <Link to="/">Back to home</Link>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};
