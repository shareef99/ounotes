import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {}

export const Footer: FC<Props> = () => {
    return (
        <>
            <section id="footer" className="bg-lightBlack text-whiteShade ">
                {/* <div
                    className="w-9/10 mx-auto rounded-2xl h-28 relative bottom-14 
                    bg-midBlack text-lightBlack flexCenter"
                >
                    <h3>Request Notes --&gt;&gt;</h3>
                </div> */}
                <div className="flexCenter">
                    <ul
                        className="flex flex-wrap flex-col sm:flex-row justify-around items-start 
                        py-14 sm:space-x-8 space-y-8 sm:space-y-0 "
                    >
                        <li className="underline hover:no-underline">
                            <Link to="/pages/request">Request Notes</Link>
                        </li>
                        <li className="underline hover:no-underline">
                            <Link to="/pages/about-us">About us</Link>
                        </li>

                        <li className="underline hover:no-underline">
                            <Link to="/pages/upload">Upload Notes</Link>
                        </li>
                        <li className="underline hover:no-underline">
                            <a
                                href="https://github.com/shareef99/ounotes"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Github
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="text-center pb-10">
                    <p>
                        Design and Coded by{" "}
                        <a
                            href="https://portfolio.shareef.vercel.app/"
                            className="font-semibold underline hover:no-underline"
                        >
                            Shareef
                        </a>{" "}
                        <br />
                    </p>
                    <p>© 2021 Nadeem Shareef</p>
                </div>
            </section>
        </>
    );
};
