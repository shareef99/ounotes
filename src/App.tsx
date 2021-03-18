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
import Selection from "./pages/Selection";
import { AuthProvider } from "./contexts/AuthContext";
import { Notes } from "./components/Notes";
import { Upload } from "./pages/Upload";
import { About } from "./pages/About";
import { Request } from "./pages/Request";
import { Profile } from "./pages/Profile";

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
                        <Route
                            path="/student/year=:year/sem=:sem"
                            component={Subjects}
                            exact
                        />
                        <Route
                            path="/student/year=:year/sem=:sem/subject=:subject"
                            component={Notes}
                        />
                        <Route path="/pages/profile" component={Profile} />
                        <Route path="/pages/request" component={Request} />
                        <PrivateRoute component={Upload} path="/pages/upload" />
                        <PrivateRoute
                            component={Selection}
                            path="/pages/selection"
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
