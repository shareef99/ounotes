// import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function Login(): JSX.Element {
    const history = useHistory();
    const { signInWithGoogle, logout, currentUser } = useAuth();

    const handleLogin = () => {
        signInWithGoogle();
    };
    const handleLogout = () => {
        logout();
    };

    if (currentUser) {
        history.push("/");
    }

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
