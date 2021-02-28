import { FC } from "react";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps<{ year: string; sem: string }> {}
// in RouteComponentProps we are passing an object {year : string}
// this basically tells the router what is the name of our parameter

export const Notes: FC<Props> = ({ match }) => {
    console.log(match);
    return (
        <>
            <div>
                We are at {match.params.year} year and {match.params.sem} sem
            </div>
        </>
    );
};
