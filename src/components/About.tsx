import { FC } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import styles from "../styles/utilities.module.css";
import story from "../images/story.png";
import target from "../images/target.png";
import targetImg from "../images/targetImg.png";
import missionImg from "../images/missionImg.png";

interface Props {}

export const About: FC<Props> = () => {
    return (
        <>
            <section className="">
                <Navbar />
                <section className="bg-whiteShade">
                    <div
                        className="h-screen -mt-16 bgGradient text-midBlack px-8
                            flex justify-center items-center flex-col  "
                    >
                        <div className="text-center -mt-16 md:-mt-12 max-w-xs space-y-2">
                            <h2
                                className="font-bold text-2xl leading-relaxed 
                                    flex justify-center items-center"
                            >
                                <img
                                    src={story}
                                    alt="Story"
                                    className="pr-4"
                                    title="By Freepik from flaticon.com"
                                />
                                Our story
                                <img
                                    src={story}
                                    alt="Story"
                                    className="pl-4"
                                    title="By Freepik from flaticon.com"
                                />
                            </h2>
                            <p className="text-left text-lg leading-normal font-medium ">
                                We are the group of students who spend hours to
                                find good notes on the internet but we failed in
                                it, So we decided to build a platform/network
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
                    <div className="bg-whiteShade colCenter px-8 my-14 space-y-20 sm:space-y-30">
                        <div className="colCenter sm:flex-row ">
                            <div className="maxWidth10rem sm:mr-14">
                                <img
                                    src={missionImg}
                                    alt="mission"
                                    title="Icons made by Freepik from Flaticon"
                                />
                            </div>
                            <div className="mt-10 sm:mt-0 space-y-4 ">
                                <h2
                                    className="flexCenter sm:justify-start font-bold text-2xl 
                                        maxWidth90 sm:mr-0"
                                >
                                    Our Mission
                                    <img
                                        src={target}
                                        alt="target"
                                        className="p-4"
                                        title="Icons made by Freepik from Flaticon"
                                    />
                                </h2>
                                <p
                                    className="text-left text-lg leading-normal font-medium 
                                        maxWidth90 sm:mr-0"
                                >
                                    Our mission is to make a platform powerful
                                    enough to supply everything a student needs
                                    in his/her{" "}
                                    <span title="Bachelor of Engineering">
                                        BE
                                    </span>{" "}
                                    journey
                                </p>
                            </div>
                        </div>
                        <div className="colCenter sm:flex-row-reverse">
                            <div className="maxWidth10rem sm:ml-14">
                                <img
                                    src={targetImg}
                                    alt="mission"
                                    title="Icons made by Pixel perfect from Flaticon"
                                />
                            </div>
                            <div className="mt-10 sm:mt-0 space-y-4">
                                <h2
                                    className="flexCenter sm:justify-start flex-col 
                                        font-bold text-2xl maxWidth90 sm:ml-0"
                                >
                                    Our Target
                                    <img
                                        src={target}
                                        alt="target"
                                        className="p-4"
                                        title="Icons made by Freepik from Flaticon"
                                    />
                                </h2>
                                <p
                                    className="text-left text-lg leading-normal font-medium 
                                        maxWidth90 sm:ml-0"
                                >
                                    Our target is to provide as many notes and
                                    information we can, and go beyond our limits
                                    to help students
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden h-14 bg-transparent z-10 -mb-14">
                        <div className="absolute top-0 left-0 w-full">
                            <div className={styles.waveReversed}></div>
                        </div>
                    </div>
                    <div className="h-96 flex justify-center items-center flex-col bgGradient">
                        <div>
                            <Link to="/">Home</Link>
                        </div>
                        About
                    </div>
                </section>
            </section>
        </>
    );
};
