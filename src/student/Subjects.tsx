import { FC } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Navbar } from "../components/Navbar";

interface Props extends RouteComponentProps<{ year: string; sem: string }> {}
// in RouteComponentProps we are passing an object {year : string}
// this basically tells the router what is the name of our parameter

export const Subjects: FC<Props> = ({ match }) => {
    console.log(match);
    const { user, subjects } = useAuth();

    return (
        <>
            <section className="bg-whiteShade w-full h-screen">
                <Navbar />
                <section
                    className="text-lightBlack flex flex-col justify-center items-center h-screen 
                        -mt-16"
                >
                    <div
                        className="border-2 rounded-lg shadow-2xl space-y-4 px-10 py-14 mx-auto
                        w-80 max-w-9/10 xs:w-auto "
                    >
                        {subjects?.map((subject) => (
                            <div key={subject}>
                                <Link
                                    to={`/student/year=${user.year}/sem=${user.sem}/subject=${subject}`}
                                >
                                    {subject}
                                </Link>
                            </div>
                        ))}
                        <div className="pt-2 flexCenter">
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
            </section>
        </>
    );
};
