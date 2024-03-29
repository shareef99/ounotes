import { FC } from "react";
import { Navbar } from "../components/Navbar";
import styles from "../styles/utilities.module.css";
import target from "../images/target.png";
import mission from "../images/mission.png";
import team from "../images/team.png";
import targetImg from "../images/targetImg.png";
import missionImg from "../images/missionImg.png";
import aboutImg from "../images/teammate.png";
import { Footer } from "../components/Footer";
import mirza from "../images/mirza.png";
import shoaib from "../images/shoaib.png";
import noor from "../images/noor.png";
import nadeem from "../images/nadeem.png";
import nikhat from "../images/nikhat.png";

interface Props {}

export const About: FC<Props> = () => {
    return (
        <section>
            <Navbar />
            <section className="bg-whiteShade text-lightBlack">
                <div
                    id="about-main-section"
                    className="h-screen -mt-16 bgGradient text-midBlack w-full flex items-center 
                            justify-center"
                >
                    <div className="flex flex-col">
                        <div className="maxWidth16rem m-12">
                            <img
                                src={aboutImg}
                                alt="About img"
                                title="Image by Yvette W from Pixabay"
                            />
                        </div>
                        <div className="mx-auto">
                            <h2 className="font-bold text-2xl leading-relaxed text-center">
                                Who we are🤔?
                            </h2>
                            <p className="text-center text-lg leading-normal font-medium ">
                                We are students, determined to help students!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative overflow-hidden h-14 bg-transparent z-10 -mt-14">
                    <div className="absolute top-0 left-0 w-full">
                        <div className={styles.wave}></div>
                    </div>
                </div>
                <div
                    id="about-details"
                    className="bg-whiteShade colCenter my-14 w-full space-y-20 sm:space-y-30"
                >
                    <h2 className="text-center font-semibold text-2xl tracking-wider ">
                        About US
                    </h2>
                    <div
                        className="flex flex-col items-center sm:flex-row w-9/10 xs:w-8/10 md:w-7/10 
                                lg:w-6/10"
                    >
                        <div className="maxWidth10rem">
                            <img
                                src={missionImg}
                                alt="mission"
                                title="Icons made by Freepik from Flaticon"
                            />
                        </div>
                        <div className="mt-10 sm:mt-0">
                            <div className="sm:w-9/10 md:w-8/10 lg:w-7/10 sm:ml-auto space-y-4">
                                <h3 className="flexCenter sm:justify-start font-normal text-2xl">
                                    Our Mission
                                    <img
                                        src={mission}
                                        alt="target"
                                        className="pl-4"
                                        title="Icons made by ultimatearm from Flaticon"
                                    />
                                </h3>
                                <p className="text-left font-light text-base leading-normal">
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
                    </div>
                    <div className="flex flex-col items-center sm:flex-row-reverse w-9/10 xs:w-8/10 md:w-7/10 lg:w-6/10">
                        <div className="maxWidth10rem">
                            <img
                                src={targetImg}
                                alt="mission"
                                title="Icons made by Pixel perfect from Flaticon"
                            />
                        </div>
                        <div className="mt-10 sm:mt-0 space-y-4">
                            <div className="sm:w-9/10 md:w-8/10 lg:w-7/10 sm:mr-auto space-y-4">
                                <h3 className="flexCenter sm:justify-start font-normal text-2xl">
                                    Our Target
                                    <img
                                        src={target}
                                        alt="target"
                                        className="pl-4"
                                        title="Icons made by Freepik from Flaticon"
                                    />
                                </h3>
                                <p className="text-left font-light text-base leading-normal">
                                    Our target is to provide as many notes and
                                    information we can, and go beyond our limits
                                    to help students
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full mb-14 mt-20">
                    <div>
                        <h2 className="flexCenter text-3xl text-start">
                            Our Team
                            <img
                                src={team}
                                alt="team"
                                className="pl-4"
                                title="By Freepik from flaticon.com"
                            />
                        </h2>
                    </div>

                    <div className="flex justify-around flex-wrap max-w-9/10 mx-auto my-4">
                        <div className="p-8 space-y-8">
                            <div className="maxWidth10rem">
                                <img
                                    src={nadeem}
                                    alt="user"
                                    title="By bqlqn from flaticon.com"
                                />
                            </div>
                            <div>
                                <h3>Nadeem Shareef</h3>
                                <p>Designer and Coder</p>
                            </div>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="maxWidth10rem">
                                <img
                                    src={noor}
                                    alt="user"
                                    title="By bqlqn from flaticon.com"
                                />
                            </div>
                            <div>
                                <h3>Noor Ahmed</h3>
                                <p>Ideas, Feedback</p>
                            </div>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="maxWidth10rem">
                                <img
                                    src={nikhat}
                                    alt="user"
                                    title="By bqlqn from flaticon.com"
                                />
                            </div>
                            <div>
                                <h3>Nikhath Sultana</h3>
                                <p>Resources Provider</p>
                            </div>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="maxWidth10rem">
                                <img
                                    src={shoaib}
                                    alt="user"
                                    title="By bqlqn from flaticon.com"
                                />
                            </div>
                            <div>
                                <h3>Shoaib Ahmed</h3>
                                <p>Ideas, Feedback</p>
                            </div>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="maxWidth10rem">
                                <img
                                    src={mirza}
                                    alt="user"
                                    title="By bqlqn from flaticon.com"
                                />
                            </div>
                            <div>
                                <h3>Mirza Baig</h3>
                                <p>Resources Provider</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-8">
                    <Footer />
                </div>
            </section>
        </section>
    );
};
