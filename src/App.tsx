import { useEffect, useState } from "react";
import { db, auth } from "./firebase";

function App() {
    const [testing, setTesting] = useState<any[]>([]);
    useEffect(() => {
        console.log(db);
        getTesting();
    }, []);

    const getTesting = () => {
        db.collection("testing").onSnapshot((querySnapShot) => {
            setTesting(
                querySnapShot.docs.map((doc) => ({
                    name: doc.data().name,
                    id: doc.data().id,
                }))
            );
        });
    };

    return (
        <>
            <h1 className="text-red-100">Hello</h1>
            <h1>World</h1>
            {testing.map((tests) => (
                <div key={tests.id}>
                    <h1>{tests.name}</h1>
                    <h1>{tests.id}</h1>
                </div>
            ))}
        </>
    );
}

export default App;
