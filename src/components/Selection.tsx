import React, { useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Selection(): JSX.Element {
    const history = useHistory();
    const { currentUser } = useAuth();
    const [userYear, setUserYear] = useState<string>();
    const [userSem, setUserSem] = useState<string>();

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
        if (userYear !== "second" && userYear !== "first") {
            alert(
                "Currently we only support for 2nd year , first sem students\nThanks for visiting our website"
            );
            history.push("/");
            return;
        }
        e.preventDefault();
        const userInfo = {
            year: userYear,
            sem: userSem,
        };
        db.collection("users")
            .doc(currentUser.uid)
            .set(userInfo, { merge: true });
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="year">Select year</label>
                <select
                    name="year"
                    id="year"
                    defaultValue="first"
                    onChange={handleYear}
                >
                    <option value="first">1st Year</option>
                    <option value="second">2nd Year</option>
                    <option value="third">3rd Year</option>
                    <option value="forth">4th Year</option>
                </select>
                <label htmlFor="sem">Select Sem</label>
                <select name="sem" id="sem" onChange={handleSem}>
                    <option value="first">Ist SEM</option>
                    <option value="second">IInd SEM</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
