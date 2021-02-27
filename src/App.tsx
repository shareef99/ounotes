import {
    BrowserRouter as Router,
    Switch,
    Route,
    RouteComponentProps,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login";
import Selection from "./components/Selection";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/selection" component={Selection} />
                    </Switch>
                </AuthProvider>
            </Router>
        </>
    );
}

export default App;
