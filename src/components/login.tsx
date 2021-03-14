import { useAuth } from "../contexts/AuthContext";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import googleIcon from "../images/google.png";
import facebookIcon from "../images/facebook.png";
import githubIcon from "../images/github.png";

const LoginButton = withStyles({
    root: {},
    contained: {
        backgroundColor: "#706c61",
        color: "#faf8eb",
        "&:hover": {
            color: "#706c61",
            backgroundColor: "#faf8eb",
        },
        "&:focus": {
            color: "#706c61",
            backgroundColor: "#faf8eb",
        },
    },
    label: {
        display: "flex",
        justifyContent: "flex-start",
    },
})(Button);

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
                <div
                    className="border-2 border-double rounded-md p-8 max-w-9/10 mx-auto xs:max-w-sm md:max-w-lg
                        bg-whiteShade shadow-xl"
                >
                    <div className=" p-8">
                        <p className="text-center font-bold text-xl mb-4">
                            Sign in using
                        </p>
                        {error && (
                            <p className="my-4 mt-8 text-red-500 w-full">
                                {error}
                            </p>
                        )}
                        <div className="space-y-4 py-4">
                            <LoginButton
                                classes={{ label: "button" }}
                                variant="contained"
                                className="w-full"
                                onClick={signInWithGoogle}
                            >
                                <img
                                    src={googleIcon}
                                    alt="Google Icon"
                                    className="pr-4"
                                    title="Icons made by Freepik from flaticon"
                                />
                                Google
                            </LoginButton>
                            <LoginButton
                                variant="contained"
                                className="w-full"
                                onClick={signInWithFacebook}
                            >
                                <img
                                    src={facebookIcon}
                                    alt="facebook icon"
                                    className="pr-4"
                                    title="Icons made by Freepik from flaticon"
                                />
                                Facebook
                            </LoginButton>
                            <LoginButton
                                variant="contained"
                                className="w-full"
                                onClick={signInWithGithub}
                            >
                                <img
                                    src={githubIcon}
                                    alt="Github Icon"
                                    title="Icons made by Freepik from flaticon"
                                    className="pr-4"
                                />
                                Github
                            </LoginButton>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
