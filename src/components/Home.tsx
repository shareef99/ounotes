import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Home(): JSX.Element {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <h1 className="text-red-100">Hello</h1>
            <h1>World</h1>
            <Link to="/login">Login</Link>
            <br />
            <button onClick={handleLogout}>Log out</button>
            <br />
            <Link to="/selection">Selection</Link>
        </>
    );
}
