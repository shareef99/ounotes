import { FC } from "react";
import { Navbar, navbarHeight } from "./Navbar";
import styles from "../styles/components/about.module.css";

interface Props {}

export const About: FC<Props> = () => {
    return (
        <>
            <section className="">
                <Navbar />
                <section>
                    <div className={`h-screen -mt-${navbarHeight} bg-blue-400`}>
                        About
                    </div>
                    <div className="relative overflow-hidden h-14 bg-transparent z-10 -mt-14">
                        <div className="absolute top-0 left-0 w-full">
                            <div className={styles.wave}></div>
                        </div>
                    </div>
                    <h1 className={`h-96 ${styles.color}`}>About</h1>
                    <h1 className={`h-96 ${styles.color}`}>About</h1>
                </section>
            </section>
        </>
    );
};
