import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useHistory } from "react-router-dom";
import homeImg from "../images/homeImg.png";
import weDo from "../images/whatWeDo.png";
import howWeDo from "../images/how.png";
import youDo from "../images/youCanDo.png";

export default function Home(): JSX.Element {
    const { logout, currentUser, user } = useAuth();
    const history = useHistory();

    const handleLogout = () => {
        logout();
    };

    const handleLogin = () => {
        history.push("/login");
    };

    return (
        <>
            <Navbar />
            <section className="bg-whiteShade">
                <div className="bgGradient">
                    <div
                        id="hereSection"
                        className="h-screen -mt-16 flex justify-around items-center flex-col 
                            md:flex-row-reverse text-midBlack w-full md:w-9/10 mx-auto"
                    >
                        <div
                            className="origin-center transform -rotate-12 md:rotate-12 -skew-x-12 
                                md:skew-x-12 mx-5% xs:mx-10% md:mx-0"
                        >
                            <img
                                src={homeImg}
                                alt="Thinking Head"
                                title="Image by Abdessamad Salmoun jlali from Pixabay"
                            />
                        </div>
                        <div className="mb-15% space-y-8 md:mt-44 flex flex-col justify-center">
                            {currentUser ? (
                                <>
                                    <h1>Welcome {user?.name}</h1>
                                    <Link
                                        to={`/student/year=${user?.year}/sem=${user?.sem}`}
                                    >
                                        Go to your notes
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <h1
                                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                                            font-bold maxWidth90 xs:max-w-full"
                                    >
                                        Your needs in one place.
                                    </h1>
                                    <button
                                        className="ring-4 px-4  py-2  rounded ring-blue-600 ring-opacity-100
                                            self-center md:self-start md:ml-2 ring-offset-4
                                            ring-offset-blue-500 font-semibold hover:ring-offset-blue-600 
                                            transition duration-500 ease-in-out"
                                        onClick={handleLogin}
                                    >
                                        Log in
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="my-28 w-full">
                    <h2 className="text-center font-semibold text-xl tracking-wider my-14">
                        HOW IT WORK
                    </h2>
                    {/* <div className="mx-auto"> */}
                    <div className="flex justify-around items-baseline flex-wrap max-w-full mx-auto space-y-12 sm:space-y-0">
                        <div
                            className="flex flex-col mx-auto max-w-7/10 xs:max-w-6/10 sm:max-w-xs sm:m-8
                                space-y-8"
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
                            className="flex flex-col mx-auto max-w-7/10 xs:max-w-6/10 sm:max-w-xs sm:m-8
                                space-y-8"
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
                            className="flex flex-col mx-auto max-w-7/10 xs:max-w-6/10 sm:max-w-xs sm:m-8
                                space-y-8"
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
                    {/* </div> */}
                </div>
                <Link to="/login">Login</Link>
                <br />
                <button onClick={handleLogout}>Log out</button>
                <br />
                <p>{`Name: ${user?.name}`}</p>
                <p>{`Provider ID: ${user?.providerId}`}</p>
                {console.log(user)}
                <br />
                <Link to="/selection">Selection</Link>
                <br />
                <Link to="/upload">Upload</Link>
                <br />
                <Link to="/pages/about-us">About</Link>
            </section>
        </>
    );
}
