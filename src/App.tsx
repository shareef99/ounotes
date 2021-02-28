import { FC } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    RouteChildrenProps,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login";
import { Student } from "./components/Student";
import { PrivateRoute } from "./components/PrivateRoute";
import Selection from "./components/Selection";
import { AuthProvider } from "./contexts/AuthContext";
import { Notes } from "./components/Notes";

interface Props extends RouteChildrenProps {}

const App: FC<Props> = () => {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/login" component={Login} />

                        <PrivateRoute component={Selection} path="/selection" />
                        <Route
                            path="/student/year=:year/sem=:sem"
                            component={Student}
                            exact
                        />
                        <Route
                            path="/student/year=:year/sem=:sem/subject=:subject"
                            component={Notes}
                        />
                        {/* Place a route at the bottom with path "/" under switch to catch 404 page */}
                        <Route path="/" render={() => <h1>404</h1>} />
                    </Switch>
                </AuthProvider>
            </Router>
        </>
    );
};

export default App;
