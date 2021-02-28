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
        if (userYear === undefined && userYear === undefined) {
            alert("Please Select Year and Sem");
            history.push("/selection");
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
        history.push(`/notes/year=${userYear}/sem=${userSem}`);
    };

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="year">Select year</label>
                <select
                    name="year"
                    id="year"
                    defaultValue="default"
                    onChange={handleYear}
                >
                    <option disabled value="default">
                        Year
                    </option>
                    <option value="first">1st Year</option>
                    <option value="second">2nd Year</option>
                    <option value="third">3rd Year</option>
                    <option value="forth">4th Year</option>
                </select>
                <label htmlFor="sem">Select Sem</label>
                <select
                    name="sem"
                    id="sem"
                    defaultValue="default"
                    onChange={handleSem}
                >
                    <option disabled value="default">
                        Sem
                    </option>
                    <option value="first">Ist SEM</option>
                    <option value="second">IInd SEM</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
