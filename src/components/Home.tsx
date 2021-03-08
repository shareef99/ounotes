import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export default function Home(): JSX.Element {
    const { logout, currentUser, user } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <Navbar />
            <section>
                <div
                    id="hereSection"
                    className={`h-screen bg-gradient-to-br from-blue-400 via-lightBlue-400 to-cyan-400
                     -mt-16 flex flex-col justify-center items-center`}
                >
                    <div className="text-midBlack font-semibold text-lg text-center">
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
                                <p>Need previous year question papers?</p>
                                <p>Forget where your notes are?</p>
                                <p>Don't worry we got your back</p>
                                <Link to="/login">
                                    <button>Notes</button>
                                </Link>
                            </>
                        )}
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
