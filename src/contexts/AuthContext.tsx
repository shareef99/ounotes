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
import { userType } from "../types";
import StudentJSON from "../Notes.json";

export type authProviderType = {
    user: userType;
    currentUser: any;
    signInWithGoogle: () => void;
    logout: () => void;
    subjects: string[] | undefined;
};

export interface User {
    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;
}

const authContextDefaultValues: authProviderType = {
    user: {
        name: "",
        year: "",
        sem: "",
        uid: "",
    },
    currentUser: null,
    signInWithGoogle: () => {},
    logout: () => {},
    subjects: [],
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
    const [usersData, setUsersData] = useState<any[]>([]);
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

    const getUserData = () => {
        db.collection("users").onSnapshot((querySnapShot) => {
            setUsersData(
                querySnapShot.docs.map((doc) => ({
                    name: doc.data().displayName,
                    year: doc.data().year,
                    sem: doc.data().sem,
                    uid: doc.data().uid,
                }))
            );
        });
    };

    const user: userType = usersData.find(
        (user) => user.uid === currentUser?.uid
    );

    const subjects = StudentJSON.find(
        (x) => x.year === user?.year && x.sem === user?.sem
    )?.subjects;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        getUserData();
    }, []);

    const value: authProviderType = {
        user,
        currentUser,
        signInWithGoogle,
        logout,
        subjects,
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
