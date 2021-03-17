import { FC } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    RouteChildrenProps,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/login";
import { Student as Subjects } from "./components/Subjects";
import { PrivateRoute } from "./components/PrivateRoute";
import Selection from "./components/Selection";
import { AuthProvider } from "./contexts/AuthContext";
import { Notes } from "./components/Notes";
import { Upload } from "./components/Upload";
import { About } from "./components/About";

interface Props extends RouteChildrenProps {}

const App: FC<Props> = () => {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/pages/about-us" component={About} />
                        <Route path="/login" component={Login} />

                        <PrivateRoute component={Selection} path="/selection" />
                        <Route
                            path="/student/year=:year/sem=:sem"
                            component={Subjects}
                            exact
                        />
                        <Route
                            path="/student/year=:year/sem=:sem/subject=:subject"
                            component={Notes}
                        />
                        <PrivateRoute component={Upload} path="/upload" />
                        {/* Place a route at the bottom with path "/" under switch to catch 404 page */}
                        <Route path="/" render={() => <h1>404</h1>} />
                    </Switch>
                </AuthProvider>
            </Router>
        </>
    );
};

export default App;
