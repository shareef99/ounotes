import React from "react";
import { Link } from "react-router-dom";

interface Props {}

const BackToHome = (props: Props) => {
    return (
        <div className="relative right-1 flexCenter">
            ←
            <button
                className="underline hover:no-underline focus:no-underline ml-2
                                    transition-all duration-300 ease-in"
            >
                <Link to="/">Back to home</Link>
            </button>
        </div>
    );
};

export default BackToHome;
