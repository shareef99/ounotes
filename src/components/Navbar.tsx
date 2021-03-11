import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";

interface Props {}

export const Navbar: FC<Props> = () => {
    const [isAtTop, setIsAtTop] = useState<any>();
    const history = useHistory();

    const handleLogin = () => {
        history.push("/login");
    };

    const handleScroll = () => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 50) {
                setIsAtTop(true);
            } else {
                setIsAtTop(false);
            }
        });
    };

    useEffect(() => {
        handleScroll();
        return () => {
            setIsAtTop({});
        };
    }, []);

    return (
        <>
            <nav
                className={`flex max-w-full w-full justify-between px-5% sm:px-10% h-16 items-center bg-transparent
                    transition duration-500 ease-in sticky top-0  border-opacity-0 ${
                        isAtTop &&
                        `transition duration-500 ease-in bg-blue-500 text-whiteShade z-20
                      border-b-2 shadow-xl `
                    }`}
            >
                <div>
                    <p>Logo</p>
                </div>
                <ul className="flex space-x-6">
                    <li>nav1</li>
                    <li>nav2</li>
                    <li>nav3</li>
                </ul>
                <div>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </nav>
        </>
    );
};
