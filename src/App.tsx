// import { useEffect, useState } from "react";
// import { db, auth } from "./firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
// const [testing, setTesting] = useState<any[]>([]);
// useEffect(() => {
//     console.log(db);
//     getTesting();
// }, []);

// const getTesting = () => {
//     db.collection("testing").onSnapshot((querySnapShot) => {
//         setTesting(
//             querySnapShot.docs.map((doc) => ({
//                 name: doc.data().name,
//                 id: doc.data().id,
//             }))
//         );
//     });
// };

//  {
//      testing.map((tests) => (
//          <div key={tests.id}>
//              <h1>{tests.name}</h1>
//              <h1>{tests.id}</h1>
//          </div>
//      ));
//  }
