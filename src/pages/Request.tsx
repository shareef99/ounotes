import { FC, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Notes from "../Notes.json";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import emailjs from "emailjs-com";

interface Props {}

export const Request: FC<Props> = () => {
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [year, setYear] = useState<string>();
    const [sem, setSem] = useState<string>();
    const [subject, setSubject] = useState<string>();
    const { user } = useAuth();

    const handleYear = (e: any) => {
        e.preventDefault();
        setYear(e.target.value);
    };

    const handleSem = (e: any) => {
        e.preventDefault();
        setSem(e.target.value);
    };

    const handleSubject = (e: any) => {
        e.preventDefault();
        setSubject(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        var emailParams = {
            name: user.name,
            email: user.email,
            year: year,
            sem: sem,
            subject: subject,
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
                    },
                    (err) => {
                        console.log("FAILED...", err);
                    }
                );
        } else {
            setMessage("");
            setError("Make sure to select all fields");
        }
    };

    return (
        <>
            <Navbar />
            <section
                id="popup"
                className="w-full h-screen colCenter bg-whiteShade text-lightBlack -mt-16"
            >
                <div
                    className="border-2 rounded-lg shadow-2xl space-y-8 px-10 py-14 mx-auto w-72 flexCenter
                        flex-col space-y-8"
                >
                    <div>
                        <h3 className="font-semibold text-lg">
                            Select Details
                        </h3>
                    </div>
                    <form
                        className="flex flex-col flex-wrap justify-center items-center w-full space-y-4"
                        onSubmit={handleSubmit}
                    >
                        <label htmlFor="year" className="w-full">
                            <select
                                name="year"
                                id="year"
                                defaultValue="year"
                                onChange={handleYear}
                                className="box-content max-w-full w-full bg-whiteShade focus:outline-none
                                    hover:cursor-pointer"
                            >
                                <option value="year" disabled>
                                    Year
                                </option>
                                <option value="first">Ist year</option>
                                <option value="second">IInd year</option>
                                <option value="third">IIrd year</option>
                                <option value="forth">IVrd year</option>
                            </select>
                        </label>
                        <label htmlFor="sem" className="w-full">
                            <select
                                name="sem"
                                id="sem"
                                defaultValue="sem"
                                onChange={handleSem}
                                className="box-content max-w-full w-full bg-whiteShade focus:outline-none
                                    hover:cursor-pointer"
                            >
                                <option value="sem" disabled>
                                    Sem
                                </option>
                                <option value="first">Ist sem</option>
                                <option value="second">IInd sem</option>
                            </select>
                        </label>
                        <label htmlFor="subjects" className="w-full">
                            <select
                                name="subjects"
                                id="subjects"
                                defaultValue="default"
                                onChange={handleSubject}
                                className="box-content max-w-full w-full bg-whiteShade focus:outline-none
                                    hover:cursor-pointer"
                                required
                            >
                                <option
                                    value="default"
                                    disabled
                                    className="box-content max-w-full w-full"
                                >
                                    Subjects
                                </option>
                                {Notes.find(
                                    (x) => x.year === year && x.sem === sem
                                )?.subjects.map((subject) => (
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
                        <label htmlFor="upload-file" className="pt-4">
                            <span
                                className="hover:cursor-pointer focus:outline-none border-2 
                                border-whiteShade rounded-md px-3 py-2 bg-lightBlack text-whiteShade  
                                hover:bg-midBlack transition duration-300 ease-in"
                            >
                                Request Note
                            </span>
                            <input
                                type="submit"
                                onClick={handleSubmit}
                                value="send"
                                id="upload-file"
                                className="opacity-0 w-0 h-0 absolute"
                            />
                        </label>{" "}
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
