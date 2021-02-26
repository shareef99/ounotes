import React, { useState } from "react";
// import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
// import { auth } from "../firebase";
import { useAuth, authProviderType } from "../contexts/AuthContext";

export default function Login() {
    // const [loading, setLoading] = useState<boolean>(false);
    const { signInWithGoogle, logout, currentUser } = useAuth();

    const handleLogin = () => {
        signInWithGoogle();
    };
    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <button onClick={handleLogin}>Sign in with google</button>
            <br />
            <button onClick={handleLogout}>Logout</button>
            <br />
            {currentUser ? "User in" : "User out"}
        </>
    );
}
