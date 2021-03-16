import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Selection(): JSX.Element {
    const history = useHistory();
    const { currentUser, user } = useAuth();
    const [userYear, setUserYear] = useState<string>();
    const [userSem, setUserSem] = useState<string>();

    useEffect(() => {
        if (user?.sem != undefined && user?.year != undefined) {
            history.push("/");
        }
    }, []);

    const handleYear = (e: any) => {
        e.preventDefault();
        console.log(e.target.value);
        setUserYear(e.target.value);
    };

    const handleSem = (e: any) => {
        e.preventDefault();
        console.log(e.target.value);
        setUserSem(e.target.value);
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (userYear === undefined && userYear === undefined) {
            alert("Please Select Year and Sem");
            history.push("/selection");
            return;
        }
        const userInfo = {
            year: userYear,
            sem: userSem,
        };
        db.collection("users")
            .doc(currentUser.uid)
            .set(userInfo, { merge: true });
        history.push(`/student/year=${userYear}/sem=${userSem}`);
    };

    return (
        <>
            <section className="bg-whiteShade w-full h-screen flex flex-col justify-center items-center">
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center flex-wrap px-10 py-14 shadow-2xl
                        rounded-lg space-y-4 border-2 w-8/10 mx-auto xs:w-72"
                >
                    <div className="colCenter">
                        <label htmlFor="year" className="font-medium text-lg">
                            Select year
                        </label>
                        <select
                            name="year"
                            id="year"
                            defaultValue="default"
                            onChange={handleYear}
                            className="bg-whiteShade border-b-2 mb-4 mt-2 outline-none"
                        >
                            <option disabled value="default">
                                Year
                            </option>
                            <option value="first">1st Year</option>
                            <option value="second">2nd Year</option>
                            <option value="third">3rd Year</option>
                            <option value="forth">4th Year</option>
                        </select>
                    </div>
                    <div className="colCenter">
                        <label htmlFor="sem" className="font-medium text-lg">
                            Select Sem
                        </label>
                        <select
                            name="sem"
                            id="sem"
                            defaultValue="default"
                            onChange={handleSem}
                            className="bg-whiteShade border-b-2 mb-4 mt-2 outline-none"
                        >
                            <option disabled value="default">
                                Sem
                            </option>
                            <option value="first">Ist SEM</option>
                            <option value="second">IInd SEM</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="border-2 rounded-md px-3 py-2 bg-lightBlack text-whiteShade  
                            hover:bg-midBlack transition duration-300 ease-in"
                    >
                        Submit
                    </button>
                </form>
            </section>
        </>
    );
}
