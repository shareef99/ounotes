import { FC, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { db } from "../firebase";

interface Props {}

interface ProfileFormType {
    editedName: string;
}

export const Profile: FC<Props> = () => {
    const { user, currentUser } = useAuth();
    const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProfileFormType>();

    const onSubmit = (data: ProfileFormType) => {
        console.log(data.editedName);
        db.collection("users")
            .doc(currentUser?.uid)
            .update({ displayName: data.editedName })
            .then(() => {
                alert("Changes save successfully!");
            })
            .catch((err) => {
                alert(`Failed to change: ${err}`);
            });
        reset();
        setIsEditingProfile(false);
    };

    const handleEditProfile = () => {
        setIsEditingProfile(true);
    };

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
                    <div className="overflow-ellipsis flex flex-wrap flex-col space-y-1">
                        <div className="font-medium">
                            <span>Name :</span>
                            {isEditingProfile ? (
                                <form
                                    action=""
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <input
                                        type="text"
                                        {...register("editedName", {
                                            required: true,
                                        })}
                                        placeholder="New Name"
                                        className="bg-whiteShade border-2 rounded"
                                    />
                                    {errors.editedName && (
                                        <p className="text-red-400">
                                            Name is required!
                                        </p>
                                    )}
                                </form>
                            ) : (
                                <span className="font-light">{user?.name}</span>
                            )}
                        </div>
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
                            {isEditingProfile ? (
                                <></>
                            ) : (
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
                            )}
                        </p>
                    </div>
                    <div className="text-center">
                        {isEditingProfile ? (
                            <>
                                <button
                                    className="hover:cursor-pointer focus:outline-none border-2 
                                border-whiteShade rounded-md px-3 py-2 bg-lightBlack text-whiteShade
                                hover:bg-midBlack transition duration-300 ease-in w-full"
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    save
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="hover:cursor-pointer focus:outline-none border-2 
                                border-whiteShade rounded-md px-3 py-2 bg-lightBlack text-whiteShade
                                hover:bg-midBlack transition duration-300 ease-in w-full"
                                    onClick={handleEditProfile}
                                >
                                    Edit Profile
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
