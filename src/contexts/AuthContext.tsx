import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

export type authProviderType = {
    currentUser: any;
    signInWithGoogle: () => void;
    logout: () => void;
};

export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
}

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
    // const [error, setError] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<any>();
    const history = useHistory();

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await auth.signInWithPopup(provider);
        const userInfo = {
            uid: credential.user?.uid,
            email: credential.user?.email,
            displayName: credential.user?.displayName,
            photoURL: credential.user?.photoURL,
        };
        await db
            .collection("users")
            .doc(credential.user?.uid)
            .set(userInfo, { merge: true });
        setCurrentUser(userInfo);
        history.push("/selection");
    }

    async function logout() {
        await auth.signOut();
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
