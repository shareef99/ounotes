import { FC } from "react";
import { Navbar } from "./Navbar";
import styles from "../styles/utilities.module.css";
import Story from "../images/story.png";

interface Props {}

export const About: FC<Props> = () => {
    return (
        <>
            <section className="">
                <Navbar />
                <section>
                    <div
                        className="h-screen -mt-16 bg-blue-400 text-midBlack px-8
                            flex justify-center items-center flex-col  "
                    >
                        <div className="text-center -mt-16 md:-mt-12 max-w-xs space-y-2">
                            <h2
                                className="font-bold text-2xl leading-relaxed 
                                    flex justify-center items-center"
                            >
                                <img
                                    src={Story}
                                    alt="Story"
                                    className="pr-4"
                                    title="By Freepik from flaticon.com"
                                />
                                Our story
                                <img src={Story} alt="Story" className="pl-4" />
                            </h2>
                            <p className="text-left text-lg leading-normal font-medium ">
                                We are the group of str students who spend hours
                                to find good notes on the internet but we failed
                                in it, So we decided to build a platform/network
                                were students can help other students by
                                providing authentic notes.
                            </p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden h-14 bg-transparent z-10 -mt-14">
                        <div className="absolute top-0 left-0 w-full">
                            <div className={styles.wave}></div>
                        </div>
                    </div>
                    <div className="bg-whiteShade flex justify-center items-center flex-col py-14">
                        <h2>Hello</h2>
                    </div>
                    <h1 className="h-96 bg-whiteShade">About</h1>
                </section>
            </section>
        </>
    );
};
