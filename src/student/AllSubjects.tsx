import { FC } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import AllNotesDetailsJSON from "../Notes.json";
import { AllNotesDetailsType } from "../types";
import { Link } from "react-router-dom";

interface Props {}

export const AllSubjects: FC<Props> = () => {
    let sem: string;

    const renderSubjects = (
        sem: string,
        x: AllNotesDetailsType,
        index: number
    ) => {
        return (
            <div className="my-14" key={index}>
                <h1 className="my-5 font-semibold text-xl ">{sem}</h1>
                <div className="flex flex-col self-start items-start space-y-2 ml-4 md:ml-10">
                    {x.subjects.map((subject: string, index) => {
                        return (
                            <button key={index} className="w-full text-left">
                                <Link
                                    to={`/student/year=${x.year}/sem=${x.sem}/subject=${subject}`}
                                >
                                    {subject}
                                </Link>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };
    return (
        <>
            <section
                id="All-Subjects"
                className="bg-whiteShade text-lightBlack"
            >
                <Navbar />
                <section>
                    <div className="max-w-9/10 my-14 mx-auto sm:max-w-8/10 lg:max-w-6/10">
                        {AllNotesDetailsJSON.map((x, index) => {
                            if (x.year === "first" && x.sem === "first") {
                                sem = "Ist sem";
                                return renderSubjects(sem, x, index);
                            }
                            if (x.year === "first" && x.sem === "second") {
                                sem = "IInd sem";
                                return renderSubjects(sem, x, index);
                            }
                            if (x.year === "second" && x.sem === "first") {
                                sem = "IIIrd sem";
                                return renderSubjects(sem, x, index);
                            } else {
                                sem = "IVnd sem";
                                return renderSubjects(sem, x, index);
                            }
                        })}
                    </div>
                </section>
                <Footer />
            </section>
        </>
    );
};
