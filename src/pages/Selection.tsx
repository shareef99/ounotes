import { useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

interface formData {
    sem: string;
    group: string;
}

export default function Selection(): JSX.Element {
    const history = useHistory();
    const { currentUser, user } = useAuth();

    const { register, handleSubmit, watch } = useForm();

    const group = watch("group");
    const sem = watch("sem");

    useEffect(() => {
        if (user?.sem !== undefined && user?.year !== undefined) {
            history.push("/");
        }
    }, [user, history]);

    const onSubmit = (data: formData, e: any) => {
        e.preventDefault();
        if (group === "default" || sem === "default") {
            alert("Make sure to select all the fields");
            return;
        }
        db.collection("users")
            .doc(currentUser.uid)
            .set({ group, sem }, { merge: true })
            .then(() => history.push(`/student/${sem}/${group}`));
    };

    return (
        <>
            <section className="bg-whiteShade w-full h-screen colCenter">
                <form
                    action=""
                    onSubmit={handleSubmit(onSubmit)}
                    className="colCenter flex-wrap px-10 py-14 shadow-2xl
                        rounded-lg space-y-4 border-2 mx-auto w-72"
                >
                    <label htmlFor="group" className="w-full">
                        <select
                            id="group"
                            defaultValue="default"
                            {...register("group", { required: true })}
                            className="select"
                        >
                            <option value="default" disabled>
                                Group
                            </option>
                            <option value="CSE">CSE</option>
                            <option value="IT">IT</option>
                            <option value="ECE">ECE</option>
                            <option value="ME">ME</option>
                            <option value="CE">CE</option>
                            <option value="EEE">EEE</option>
                        </select>
                    </label>
                    <label htmlFor="sem" className="w-full">
                        <select
                            id="sem"
                            defaultValue="default"
                            {...register("sem", { required: true })}
                            className="select"
                        >
                            <option value="default" disabled>
                                Sem
                            </option>
                            <option value="first">Ist</option>
                            <option value="second">IInd</option>
                            <option value="third">IIIrd</option>
                            <option value="forth">IVth</option>
                        </select>
                    </label>
                    <button
                        type="submit"
                        className="border-2 rounded-md px-3 py-2 bg-lightBlack text-whiteShade  
                            hover:bg-midBlack transition duration-300 ease-in w-full"
                    >
                        Submit
                    </button>
                </form>
            </section>
        </>
    );
}
