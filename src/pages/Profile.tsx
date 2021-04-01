import { FC } from "react";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

interface Props {}

export const Profile: FC<Props> = () => {
    const { user } = useAuth();
    return (
        <>
            <Navbar />
            <section
                className="flex w-full h-screen -mt-16 justify-center items-center bg-whiteShade 
                text-lightBlack"
            >
                <div
                    className="border-2 rounded-lg shadow-2xl space-y-4 px-10 py-14 mx-auto
                        w-80 max-w-9/10 xs:w-auto -mt-16"
                >
                    <div className="text-2xl text-center font-semibold">
                        <h2>Profile</h2>
                    </div>
                    <div className="overflow-ellipsis flex flex-wrap flex-col">
                        <p className="font-medium">
                            Name :{" "}
                            <span className="font-light">{user?.name}</span>
                        </p>
                        <p className="font-medium">
                            Email :{" "}
                            <span className="font-light">{user?.email}</span>
                        </p>
                        <p className="font-medium">
                            Sign in :{" "}
                            <span className="font-light">
                                {user?.providerId}
                            </span>
                        </p>
                        <p className="font-medium">
                            Student of :{" "}
                            <span className="font-light">
                                {user?.year.replace(
                                    user?.year[0],
                                    user?.year[0].toUpperCase()
                                )}{" "}
                                year{" "}
                                {user?.sem.replace(
                                    user?.sem[0],
                                    user?.sem[0].toUpperCase()
                                )}{" "}
                                sem
                            </span>
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};
