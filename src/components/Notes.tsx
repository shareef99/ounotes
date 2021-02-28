import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps<{ subject: string }> {}

export const Notes: FC<Props> = ({ match }) => {
    return (
        <>
            <h1>{match.params.subject}</h1>
        </>
    );
};
