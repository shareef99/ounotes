import { PropsWithChildren, FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Props
    extends PropsWithChildren<{
        component: FC;
        path: string;
    }> {}

export const PrivateRoute: FC<Props> = ({ component: Component, path }) => {
    const { currentUser } = useAuth();

    return (
        <Route>
            {(props) => {
                return currentUser ? <Component /> : <Redirect to="/" />;
            }}
        </Route>
    );
};
