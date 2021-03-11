import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import homeImg from "../images/homeImg.png";
import { useHistory } from "react-router-dom";

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
            <section>
                <div className="bgGradient">
                    <div
                        id="hereSection"
                        className="h-screen -mt-16 flex justify-around items-center flex-col md:flex-row-reverse text-midBlack 
                        w-full md:w-9/10 mx-auto"
                    >
                        <div className="origin-center transform -rotate-12 md:rotate-12 -skew-x-12 md:skew-x-12 mx-5% xs:mx-10% md:mx-0">
                            <img
                                src={homeImg}
                                alt="Thinking Head"
                                title="Image by Abdessamad Salmoun jlali from Pixabay"
                            />
                        </div>
                        <div className="mb-15% text-center space-y-8 md:mt-44">
                            {currentUser ? (
                                <>
                                    <h1>Welcome {currentUser.displayName}</h1>
                                    <Link
                                        to={`/student/year=${user?.year}/sem=${user?.sem}`}
                                    >
                                        Go to your notes
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <h1 className="text-2xl font-bold maxWidth90 xs:max-w-8/10">
                                        Everything you need in one place.
                                    </h1>
                                    <button
                                        className="ring-4 px-4  py-2  rounded ring-blue-500 
                                        ring-opacity-100 
                                ring-offset-4 ring-offset-blue-600 font-semibold"
                                        onClick={handleLogin}
                                    >
                                        Log in
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <Link to="/login">Login</Link>
                <br />
                <button onClick={handleLogout}>Log out</button>
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
