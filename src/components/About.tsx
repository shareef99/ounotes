import { FC } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";
import styles from "../styles/utilities.module.css";
import story from "../images/story.png";
import target from "../images/target.png";
import mission from "../images/mission.png";
import team from "../images/team.png";
import targetImg from "../images/targetImg.png";
import missionImg from "../images/missionImg.png";
import userImg from "../images/user.png";
import aboutImg from "../images/teammate.png";

interface Props {}

export const About: FC<Props> = () => {
    return (
        <>
            <section className="">
                <Navbar />
                <section className="bg-whiteShade">
                    <div
                        id="about-main-section"
                        className="h-screen -mt-16 bgGradient text-midBlack w-full flex items-center justify-center"
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
                                    {/* <img
                                        src={story}
                                        alt="Story"
                                        className="pr-4"
                                        title="By Freepik from flaticon.com"
                                    /> */}
                                    Who we are🤔?
                                </h2>
                                <p className="text-center text-lg leading-normal font-medium ">
                                    We are students, determined to help
                                    students!
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
                        <div className="flex flex-col items-center sm:flex-row w-9/10 xs:w-8/10 md:w-7/10 lg:w-6/10">
                            <div className="maxWidth10rem">
                                <img
                                    src={missionImg}
                                    alt="mission"
                                    title="Icons made by Freepik from Flaticon"
                                />
                            </div>
                            <div className="mt-10 sm:mt-0 space-y-4">
                                <div className="sm:w-9/10 md:w-8/10 lg:w-7/10 sm:ml-auto">
                                    <h2 className="flexCenter sm:justify-start font-bold text-2xl">
                                        Our Mission
                                        <img
                                            src={mission}
                                            alt="target"
                                            className="p-4"
                                            title="Icons made by ultimatearm from Flaticon"
                                        />
                                    </h2>
                                    <p className="text-left text-lg leading-normal font-medium ">
                                        Our mission is to make a platform
                                        powerful enough to supply everything a
                                        student needs in his/her{" "}
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
                                <div className="sm:w-9/10 md:w-8/10 lg:w-7/10 sm:mr-auto">
                                    <h2 className="flexCenter sm:justify-start font-bold text-2xl pb-3">
                                        Our Target
                                        <img
                                            src={target}
                                            alt="target"
                                            className="pl-4"
                                            title="Icons made by Freepik from Flaticon"
                                        />
                                    </h2>
                                    <p className="text-left text-lg leading-normal font-medium">
                                        Our target is to provide as many notes
                                        and information we can, and go beyond
                                        our limits to help students
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="team_wrapper" className="w-full mb-14 mt-20">
                        <div id="team_heading">
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
                        <div
                            id="team"
                            className="flex justify-around flex-wrap max-w-8/10 mx-auto"
                        >
                            <div className="p-8 space-y-8">
                                <div className="maxWidth10rem">
                                    <img
                                        src={userImg}
                                        alt="user"
                                        title="By bqlqn from flaticon.com"
                                    />
                                </div>
                                <div>
                                    <h3>Teammate name</h3>
                                    <p>Role</p>
                                </div>
                            </div>
                            <div className="p-8 space-y-8">
                                <div className="maxWidth10rem">
                                    <img
                                        src={userImg}
                                        alt="user"
                                        title="By bqlqn from flaticon.com"
                                    />
                                </div>
                                <div>
                                    <h3>Teammate name</h3>
                                    <p>Role</p>
                                </div>
                            </div>
                            <div
                                id="team_wrapper-warp"
                                className="p-8 space-y-8"
                            >
                                <div id="team_img" className="maxWidth10rem">
                                    <img
                                        src={userImg}
                                        alt="user"
                                        title="By bqlqn from flaticon.com"
                                    />
                                </div>
                                <div id="team_details">
                                    <h3 id="team_member_name">Teammate name</h3>
                                    <p id="team_member_role">Role</p>
                                </div>
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
