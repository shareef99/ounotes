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

export type authProviderType = {
    user: userType;
    currentUser: any;
    signInWithGoogle: () => void;
    signInWithFacebook: () => void;
    signInWithGithub: () => void;
    logout: () => void;
    loginError: string | void;
    admins: string[];
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
        group: "",
    },
    currentUser: null,
    signInWithGoogle: () => {},
    signInWithFacebook: () => {},
    signInWithGithub: () => {},
    logout: () => {},
    loginError: "",
    admins: [],
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
    const [userData, setUserData] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>();
    const history = useHistory();

    const admins = [
        "sowmiyamam11@gmail.com",
        "nadeemshareef934@gmail.com",
        "shoaib733021@gmail.com",
        "noor000two@gmail.com",
        "nikhathsultan05@gmail.com",
        "daniamirza678@gmail.com",
    ];

    async function signIn(provider: any) {
        setLoginError("");
        await auth
            .signInWithPopup(provider)
            .then((result) => {
                const credential = result.credential;
                const user = result.user;

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

                db.collection("users")
                    .doc(user?.uid)
                    .get()
                    .then((data) => {
                        const isSem = Boolean(data.data()?.sem);
                        if (isSem) {
                            return history.push("/");
                        }
                        return history.push("/pages/selection");
                    });
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

    async function signOut() {
        await auth.signOut();
        history.push("/");
    }

    const getUserData = () => {
        db.collection("users")
            .where("uid", "==", currentUser.uid)
            .onSnapshot((querySnapShot) => {
                setUserData(
                    querySnapShot.docs.map((doc) => ({
                        name: doc.data().displayName,
                        group: doc.data().group,
                        sem: doc.data().sem,
                        uid: doc.data().uid,
                        providerId: doc.data().providerId,
                        email: doc.data().email,
                    }))
                );
            });
    };

    const user = userData[0];

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (currentUser) {
            getUserData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    const value: authProviderType = {
        user,
        currentUser,
        signInWithGoogle,
        signInWithFacebook,
        signInWithGithub,
        logout: signOut,
        loginError: loginError,
        admins,
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    );
}
