import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    FC,
} from "react";
import { auth } from "../firebase";
import firebase from "firebase";

export type authProviderType = {
    currentUser: any;
    signInWithGoogle: () => void;
    logout: () => void;
};

const authContextDefaultValues: authProviderType = {
    currentUser: null,
    signInWithGoogle: () => {},
    logout: () => {},
};

const AuthContext = createContext<authProviderType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type propType = {
    children: ReactNode;
};

export function AuthProvider({ children }: propType) {
    const [error, setError] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<any>();

    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {})
            .catch(() => {
                setError("Failed to login");
            });
    }

    function logout() {
        auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    const value: authProviderType = {
        currentUser,
        signInWithGoogle,
        logout,
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
