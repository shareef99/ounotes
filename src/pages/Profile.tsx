import { FC } from "react";
import { Navbar } from "../components/Navbar";

interface Props {}

export const Profile: FC<Props> = () => {
    return (
        <>
            <section>
                <Navbar />
                <div>Profile</div>
            </section>
        </>
    );
};
