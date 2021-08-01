import { useAuth } from "../contexts/AuthContext";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import weDo from "../images/whatWeDo.png";
import howWeDo from "../images/how.png";
import youDo from "../images/youCanDo.png";
import Styles from "../styles/utilities.module.css";
import { Footer } from "./Footer";

export default function Home(): JSX.Element {
    const { currentUser } = useAuth();

    return (
        <section className="bg-whiteShade">
            <Navbar />
            <section className="bg-whiteShade text-lightBlack">
                <div>
                    <div
                        id="hereSection"
                        className={`h-screen -mt-16 flex justify-around items-center flex-col 
                            md:flex-row-reverse text-midBlack w-full md:w-9/10 mx-auto bg-bottom-4
                            xs:bg-bottom bg-contain bg-clip-padding bg-no-repeat ${Styles.bgImg}`}
                    >
                        <div className="space-y-8 flex flex-col items-center h-screen relative">
                            <div
                                className="absolute top-1/4 xs:top-3/10 sm:top-4/10 w-max z-10 
                                    opacity-100 bg-opacity-50 bg-whiteShade px-4"
                            >
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                                    Your needs in one place.
                                </h1>
                            </div>
                            <div
                                className="space-x-4 flex justify-center sm:justify-start absolute 
                                        bottom-56"
                            >
                                {currentUser ? (
                                    <button
                                        className="border-2 rounded-md px-3 py-2 bg-lightBlack 
                                            self-center hover:bg-midBlack md:self-start text-lg 
                                            text-whiteShade font-semibold transition duration-500 
                                            ease-in border-transparent"
                                    >
                                        <Link to="/student/all-subjects">
                                            Subjects
                                        </Link>
                                    </button>
                                ) : (
                                    <button
                                        className="border-2 rounded-md px-3 py-2 bg-lightBlack 
                                            text-whiteShade hover:bg-midBlack self-center 
                                            md:self-start text-lg w-max font-semibold transition 
                                            duration-500 ease-in border-transparent"
                                    >
                                        <Link to="/login">Sign in</Link>
                                    </button>
                                )}
                                <button
                                    className="border-2 rounded-md px-3 py-2 self-center leading-7 
                                        hover:bg-midBlack hover:text-whiteShade font-semibold
                                        transition duration-500 ease-in w-max"
                                >
                                    <Link to="/pages/about-us"></Link>
                                    About US
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-14 w-full">
                    <h2
                        className="text-center font-semibold text-2xl sm:text-3xl md:text-4xl 
                                tracking-wider my-14 text-midBlack"
                    >
                        HOW IT WORK
                    </h2>
                    <div
                        className="flex justify-around items-baseline flex-wrap max-w-full mx-auto 
                                space-y-12 sm:space-y-8"
                    >
                        <div
                            className="flex flex-col mx-auto max-w-7/10 xs:max-w-6/10 sm:max-w-xs 
                                sm:m-8 space-y-8"
                        >
                            <div className="self-center">
                                <img
                                    src={weDo}
                                    alt="How we do icon"
                                    title="Icon made by ultimatearm from flaticon"
                                />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-center font-normal text-xl">
                                    What we do?
                                </h3>
                                <p className="font-light text-base">
                                    we provide the notes, syllabus, previous
                                    year question papers, Important questions
                                    for the students of Bachelor of
                                    Engineering(BE).
                                </p>
                            </div>
                        </div>
                        <div
                            className="flex flex-col mx-auto max-w-7/10 xs:max-w-6/10 sm:max-w-xs 
                                sm:m-8 space-y-8"
                        >
                            <div className="self-center">
                                <img
                                    src={howWeDo}
                                    alt="How we do icon"
                                    title="Icon made by Flat Icon from flatIcon"
                                />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-center font-normal text-xl">
                                    How we do?
                                </h3>
                                <p className="font-light text-base">
                                    We are students, we collect our resources
                                    from our fellow students and some great
                                    teachers help us with resources and we put
                                    all of them under one root for better
                                    accessibility.
                                </p>
                            </div>
                        </div>
                        <div
                            className="flex flex-col mx-auto max-w-7/10 xs:max-w-6/10 sm:max-w-xs 
                                sm:m-8 space-y-8"
                        >
                            <div className="self-center">
                                <img
                                    src={youDo}
                                    alt="What you can do icon"
                                    title="Icon made by freepik from flatIcon"
                                />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-center font-normal text-xl">
                                    What you can do?
                                </h3>
                                <p className="font-light text-base">
                                    You can help us by providing the resources
                                    you have and if you find any notes are
                                    missing or miss leading you can report us.
                                    After all, "Sharing is caring"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </section>
    );
}
