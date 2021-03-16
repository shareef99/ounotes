import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import googleIcon from "../images/google.png";
import facebookIcon from "../images/facebook.png";
import githubIcon from "../images/github.png";

export default function Login(): JSX.Element {
    const {
        signInWithGoogle,
        signInWithFacebook,
        signInWithGithub,
        loginError: error,
    } = useAuth();

    return (
        <>
            <section className="bg-whiteShade w-full h-screen flex flex-col justify-center items-center">
                <div className="border-2 rounded-lg shadow-2xl space-y-4 px-10 py-14 mx-auto w-72">
                    <p className="text-center font-medium text-2xl mb-4">
                        Sign in using
                    </p>
                    {error && (
                        <p className="my-4 mt-8 text-red-500 w-full">{error}</p>
                    )}
                    <div className="space-y-4 py-8 flex flex-col justify-center items-center ">
                        <button
                            className="w-full flex justify-center border-2 py-2 rounded-md bg-lightBlack
                                text-whiteShade hover:bg-midBlack transition duration-300 ease-in"
                            onClick={signInWithGoogle}
                        >
                            <img
                                src={googleIcon}
                                alt="Google Icon"
                                className="mr-4"
                                title="Icons made by Freepik from flaticon"
                            />
                            <span className="mr-6">Google</span>
                        </button>
                        <button
                            className="w-full flex justify-center border-2 py-2 rounded-md bg-lightBlack
                                text-whiteShade hover:bg-midBlack transition duration-300 ease-in"
                            onClick={signInWithFacebook}
                        >
                            <img
                                src={facebookIcon}
                                alt="facebook icon"
                                className="mr-4"
                                title="Icons made by Freepik from flaticon"
                            />
                            <span className="mr-1">Facebook</span>
                        </button>
                        <button
                            className="w-full flex justify-center border-2 py-2 rounded-md bg-lightBlack
                                text-whiteShade hover:bg-midBlack transition duration-300 ease-in"
                            onClick={signInWithGithub}
                        >
                            <img
                                src={githubIcon}
                                alt="Github Icon"
                                title="Icons made by Freepik from flaticon"
                                className="mr-4"
                            />
                            <span className="mr-7">Github</span>
                        </button>
                    </div>
                    <div className="text-center">
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
}
