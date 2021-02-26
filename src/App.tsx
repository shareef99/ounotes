import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                    </Switch>
                </AuthProvider>
            </Router>
        </>
    );
}

export default App;
