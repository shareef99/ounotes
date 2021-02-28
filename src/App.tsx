import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login";
import { Notes } from "./components/Notes";
import { PrivateRoute } from "./components/PrivateRoute";
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

                        <PrivateRoute component={Selection} path="/selection" />
                        <Route
                            path="/notes/year=:year/sem=:sem"
                            component={Notes}
                        />
                        {/* Place a route at the bottom with path "/" under switch to catch 404 page */}
                        <Route path="/" render={() => <h1>404</h1>} />
                    </Switch>
                </AuthProvider>
            </Router>
        </>
    );
}

export default App;
