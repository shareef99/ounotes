import { FC } from "react";
import { Navbar } from "./Navbar";

interface Props {}

export const About: FC<Props> = () => {
    return (
        <>
            <Navbar />
            <section>
                <h1>About</h1>
            </section>
        </>
    );
};
