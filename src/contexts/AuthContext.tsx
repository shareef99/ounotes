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
    signInWithFacebook: () => void;
    signInWithGithub: () => void;
    logout: () => void;
    subjects: string[] | undefined;
    loginError: string | void;
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
        providerId: "",
        email: "",
    },
    currentUser: null,
    signInWithGoogle: () => {},
    signInWithFacebook: () => {},
    signInWithGithub: () => {},
    logout: () => {},
    subjects: [],
    loginError: "",
};

const AuthContext = createContext<authProviderType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type propType = {
    children: ReactNode;
};

export function AuthProvider({ children }: propType) {
    const [loginError, setLoginError] = useState<string>("");
    const [usersData, setUsersData] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>();
    const history = useHistory();

    async function signIn(provider: any) {
        setLoginError("");
        await auth
            .signInWithPopup(provider)
            .then((result) => {
                const credential = result.credential;
                const user = result.user;
                console.log("user ", user);
                console.log("dash ", credential);

                const userInfo = {
                    uid: user?.uid,
                    email: user?.email,
                    displayName: user?.displayName,
                    photoURL: user?.photoURL,
                    providerId: credential?.providerId,
                };

                db.collection("users")
                    .doc(user?.uid)
                    .set(userInfo, { merge: true });
                setCurrentUser(userInfo);

                history.push("/selection");
            })
            .catch((err) => {
                if (
                    err.code === "auth/account-exists-with-different-credential"
                ) {
                    setLoginError(
                        "You have already login with different method.\nTry login with different provider"
                    );
                } else {
                    setLoginError(`${err.message}`);
                }
            });
    }

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        await signIn(provider);
    }

    async function signInWithFacebook() {
        const provider = new firebase.auth.FacebookAuthProvider();
        await signIn(provider);
    }

    async function signInWithGithub() {
        const provider = new firebase.auth.GithubAuthProvider();
        await signIn(provider);
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
                    providerId: doc.data().providerId,
                    email: doc.data().email,
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
        signInWithFacebook,
        signInWithGithub,
        logout,
        subjects,
        loginError: loginError,
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
