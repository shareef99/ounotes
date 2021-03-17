import { FC } from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Props extends RouteComponentProps<{ year: string; sem: string }> {}
// in RouteComponentProps we are passing an object {year : string}
// this basically tells the router what is the name of our parameter

export const Student: FC<Props> = ({ match }) => {
    console.log(match);
    const { user, subjects } = useAuth();

    return (
        <>
            <div>
                {subjects?.map((subject) => (
                    <div key={subject}>
                        <Link
                            to={`/student/year=${user?.year}/sem=${user?.sem}/subject=${subject}`}
                        >
                            {subject}
                        </Link>
                    </div>
                ))}
                <Link to="/">Home</Link>
            </div>
        </>
    );
};
