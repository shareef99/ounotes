import { FC } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import StudentJSON from "../Notes.json";

interface Props extends RouteComponentProps<{ year: string; sem: string }> {}
// in RouteComponentProps we are passing an object {year : string}
// this basically tells the router what is the name of our parameter

export const Student: FC<Props> = ({ match }) => {
    const url = match.url;

    const year = match.params.year;
    const sem = match.params.sem;
    const subjects = StudentJSON.find((x) => x.year === year && x.sem === sem)
        ?.subjects;
    return (
        <>
            <div>
                {subjects?.map((subject) => (
                    <div key={subject}>
                        <Link to={`${url}subject=${subject}`}>{subject}</Link>
                    </div>
                ))}
            </div>
        </>
    );
};
