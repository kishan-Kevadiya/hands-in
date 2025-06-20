import Star from "@/assets/svg/preassessment-modal/Star";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import {
    fadeInVariant,
    hideNavItemsVariant,
    liVariant,
    mobileMenuVariant,
    ulVariant,
} from "@/helpers/animation";
import {
    ABOUT_US,
    BUILD_RESUME,
    CANDIDATE,
    COMPANY,
    DISCOVER,
    LANDING_PAGE,
    LOGIN
} from "@/routes";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const NAVBAR_ITEMS = [
        { title: "Home", icon: null, to: LANDING_PAGE },
        { title: "Build a Resume", icon: <Star />, to: BUILD_RESUME },
        { title: "Discover", icon: null, to: DISCOVER },
        { title: "About Us", icon: null, to: ABOUT_US },
        { title: "Candidate", icon: null, to: CANDIDATE },
        { title: "Company", icon: null, to: COMPANY },
    ];

    const openCompanyUrl = () => {
        const companyUrl = import.meta.env.VITE_COMPANY_URL;
        window.location.href = companyUrl;
    };

    return (
        <nav className="flex sticky items-center justify-between px-7 py-4 xl:px-9 xl:py-7 bg-transparent z-50">
            <Link to={LANDING_PAGE} className="hidden lg:flex items-center">
                <img
                    src="/logo.webp"
                    alt="headsin"
                    className="w-44 object-contain"
                />
            </Link>

            <div
                className={twMerge(
                    "absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none z-50 md:flex items-center transition-all duration-300",
                    isOpen ? "block" : "hidden"
                )}
            >
                <ul className="hidden lg:flex flex-col md:flex-row items-center gap-5 md:gap-2 p-4 md:p-0">
                    {NAVBAR_ITEMS.map((item) => (
                        <li key={item.title} className="flex">
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    twMerge(
                                        "flex text-sm 2xl:text-lg items-center h-full font-semibold gap-2 px-2 lg:px-3 xl:px-4  py-2 rounded-md transition duration-300 ease-in-out",
                                        isActive
                                            ? "bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent"
                                            : "text-[#9D9D9D] hover:text-[#3F1562]"
                                    )
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {item.icon && (
                                            <span className="flex items-center w-5 h-5">
                                                <Star
                                                    fromcolor={
                                                        isActive
                                                            ? "#3F1562"
                                                            : "#9D9D9D"
                                                    }
                                                    tocolor={
                                                        isActive
                                                            ? "#DF6789"
                                                            : "#9D9D9D"
                                                    }
                                                />
                                            </span>
                                        )}
                                        <span>{item.title}</span>
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="hidden lg:flex items-center gap-4">
                <PrimaryButton
                    label="Hire Talent"
                    type="button"
                    onClick={openCompanyUrl}
                    labelStyle="text-white font-semibold text-sm"
                    className="py-3 px-6 bg-[#3F1562]  hover:scale-105 whitespace-nowrap hover:!shadow-[0px_0px_14px_1px_rgba(63,21,98,1)]"
                />
                <PrimaryButton
                    label="Search Job"
                    type="button"
                    onClick={() => {
                        navigate(LOGIN);
                    }}
                    labelStyle="text-white font-semibold text-sm"
                    className="py-3 px-6 bg-[#DF6789] hover:scale-105 whitespace-nowrap hover:!shadow-[0px_0px_14px_1px_rgba(223,103,137,1)]"
                />
                <PrimaryButton
                    label="Login as Company"
                    type="button"
                    onClick={openCompanyUrl}
                    labelStyle="text-[#3F1562] font-semibold text-sm hover:text-white"
                    className="hidden py-3 px-6 border border-[#3F1562] bg-white hover:bg-[#3F1562]"
                />
                <PrimaryButton
                    label="Login as User"
                    type="button"
                    onClick={() => {}}
                    labelStyle="text-white font-semibold text-sm "
                    className="hidden py-3 px-6 bg-[#DF6789] whitespace-nowrap"
                />
            </div>

            <motion.nav
                initial="closed"
                animate={isOpen ? "opened" : "closed"}
                className="w-full flex lg:hidden justify-between items-center"
            >
                <Link to="/">
                    <img
                        src="/logo.webp"
                        alt="headsin"
                        className="w-44 object-contain"
                    />
                </Link>

                <div className="overflow-y-hidden">
                    <motion.div
                        variants={hideNavItemsVariant}
                        onClick={() => setIsOpen(true)}
                        className="uppercase text-[13px] cursor-pointer"
                    >
                        <i className="pi pi-bars text-xl" color="#000" />
                    </motion.div>
                </div>

                <motion.div
                    variants={mobileMenuVariant}
                    className="mobile-menu fixed top-0 left-0 h-screen w-full flex flex-col items-center font-dm-sans bg-primary text-white"
                >
                    <motion.button
                        variants={fadeInVariant}
                        onClick={() => setIsOpen(false)}
                        className="self-end m-5 outline-none border-none bg-transparent uppercase text-[13px] cursor-pointer"
                    >
                        Close
                    </motion.button>

                    <motion.ul variants={ulVariant} className="list-none mt-10">
                        {NAVBAR_ITEMS.map((navItem) => (
                            <motion.li
                                key={navItem.to}
                                variants={liVariant}
                                whileTap={{ scale: 0.95 }}
                                className="my-5 overflow-y-hidden select-none hover:italic hover:cursor-pointer"
                            >
                                <motion.div
                                    variants={liVariant}
                                    className="text-center capitalize text-[34px]"
                                >
                                    <Link
                                        to={navItem.to}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {navItem.title}
                                    </Link>
                                </motion.div>
                            </motion.li>
                        ))}
                    </motion.ul>

                    {/* <motion.div
                        variants={fadeInVariant}
                        className="contact mt-20 flex"
                    >
                        <a
                            href="tel:+91 7861944202"
                            className="font-normal mr-10"
                        >
                            +91 7861944202
                        </a>
                        <a
                            href="mailto:hedsin.get@gmail.com"
                            className="font-normal"
                        >
                            hedsin.get@gmail.com
                        </a>
                    </motion.div> */}

                    <motion.div variants={fadeInVariant}>
                        <div className="grid grid-cols-2 gap-4 w-full mt-4 lg:hidden">
                            <PrimaryButton
                                label="Hire Talent"
                                type="button"
                                onClick={openCompanyUrl}
                                labelStyle="text-white font-semibold text-sm"
                                className="w-full py-3 bg-[#3F1562] text-center"
                            />
                            <PrimaryButton
                                label="Search Job"
                                type="button"
                                onClick={() => {
                                    navigate(LOGIN);
                                }}
                                labelStyle="text-white font-semibold text-sm text-[#DF6789]"
                                className="w-full py-3 bg-white text-center"
                            />
                            <PrimaryButton
                                label="Login as Company"
                                type="button"
                                onClick={openCompanyUrl}
                                labelStyle="text-[#3F1562] font-semibold text-sm hover:text-white"
                                className="hidden py-3 px-6 border border-[#3F1562] bg-white hover:bg-[#3F1562]"
                            />
                            <PrimaryButton
                                label="Login as User"
                                type="button"
                                onClick={() => {
                                    navigate("/auth");
                                }}
                                labelStyle="text-white font-semibold text-sm text-[#DF6789]"
                                className="hidden py-3 px-6 bg-white whitespace-nowrap"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.nav>
        </nav>
    );
};

export default Navbar;
