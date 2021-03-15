import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

interface Props {}

export const Navbar: FC<Props> = () => {
    const [isAtTop, setIsAtTop] = useState<any>();
    const history = useHistory();
    const { currentUser, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const open = Boolean(anchorEl);

    const handleScroll = () => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 50) {
                setIsAtTop(true);
            } else {
                setIsAtTop(false);
            }
        });
    };

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfile = () => {
        history.push("/profile");
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                className={`flex max-w-full w-full justify-between px-5% sm:px-10% h-16 items-center 
                    bg-transparent transition duration-500 ease-in sticky top-0  border-opacity-0 ${
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
                {currentUser ? (
                    <>
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                className="focus:outline-none"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleProfile}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={logout}>Sign out</MenuItem>
                            </Menu>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <button>Log in</button>
                        </div>
                    </>
                )}
            </nav>
        </>
    );
};
