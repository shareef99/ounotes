import { FC } from "react";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import details from "../details.json";

interface Props {}

interface selectSubjectFormType {
    group: string;
    sem: string;
}

export const AllSubjects: FC<Props> = () => {
    const { register, watch } = useForm<selectSubjectFormType>();
    const group = watch("group");
    const sem = watch("sem");

    return (
        <section className="bg-whiteShade text-lightBlack">
            <Navbar />
            <form action="" className="mt-14 space-x-4 text-center">
                <span className="font-medium text-lg">filter by</span>
                <label htmlFor="group">
                    <select
                        id="group"
                        defaultValue="default"
                        {...register("group", { required: true })}
                    >
                        <option value="default">Group</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                        <option value="ME">ME</option>
                        <option value="CE">CE</option>
                        <option value="EEE">EEE</option>
                    </select>
                </label>
                <label htmlFor="sem">
                    <select
                        id="sem"
                        defaultValue="default"
                        {...register("sem", { required: true })}
                    >
                        <option value="default">Sem</option>
                        <option value="first">Ist</option>
                        <option value="second">IInd</option>
                        <option value="third">IIIrd</option>
                        <option value="forth">IVth</option>
                    </select>
                </label>
            </form>
            <section className="container flex flex-col ">
                {details
                    // eslint-disable-next-line
                    .filter((x) => {
                        if (sem === undefined && group === undefined) {
                            return x;
                        }
                        if (sem === "default" && group === "default") {
                            return x;
                        }
                        if (sem !== "default" && group !== "default") {
                            return x.group === group && x.sem === sem;
                        }
                        if (sem === "default") {
                            return x.group === group;
                        }
                        if (group === "default") {
                            return x.sem === sem;
                        }
                    })
                    .map((x, index) => (
                        <div key={index} className="colCenter my-6">
                            <h2 className="text-xl  ">
                                {x.group}{" "}
                                {x.sem === "first"
                                    ? "Ist"
                                    : x.sem === "second"
                                    ? "IInd"
                                    : x.sem === "third"
                                    ? "IIIrd"
                                    : x.sem === "forth"
                                    ? "IVth"
                                    : ""}{" "}
                                sem
                            </h2>
                            <ul className="space-y-2">
                                {x.subjects.map((subject, index) => (
                                    <li
                                        key={index}
                                        className="hover:opacity-80"
                                    >
                                        <Link
                                            to={`/student/${x.sem}/${x.group}/${subject}`}
                                        >
                                            {subject}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
            </section>
            <div className="pt-10">
                <Footer />
            </div>
        </section>
    );
};
