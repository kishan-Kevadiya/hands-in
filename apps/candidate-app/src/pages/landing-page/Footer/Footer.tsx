import Arrow from "@/assets/svg/landingPage/Footer/Arrow";
import GoogleDev from "@/assets/svg/landingPage/GoogleDev";
import MacDev from "@/assets/svg/landingPage/MacDev";
import Facebook from "@/assets/svg/landingPage/SocialMedia/Facebook";
import Instagram from "@/assets/svg/landingPage/SocialMedia/Instagram";
import Linkdin from "@/assets/svg/landingPage/SocialMedia/Linkdin";
import Mail from "@/assets/svg/landingPage/SocialMedia/Mail";
import Star from "@/assets/svg/preassessment-modal/Star";
import AuthInput from "@/components/ui/auth/AuthInput";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import { ApiPost } from "@/helpers/api-helper";
import { ABOUT_US, BUILD_RESUME, CONTACTUS, DISCOVER } from "@/routes";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

const Footer = () => {
    const NAVBAR_ITEMS = [
        { title: "Build a Resume", icon: <Star />, to: BUILD_RESUME },
        { title: "Discover", icon: null, to: DISCOVER },
        { title: "About Us", icon: null, to: ABOUT_US },
        { title: "Contact Us", icon: null, to: CONTACTUS },
    ];

    const SOCIALS = [
        { id: 1, icon: <Mail />, url: "mailto:contact@headsin.co" },
        {
            id: 2,
            icon: <Linkdin />,
            url: "https://www.linkedin.com/company/headsinco/posts/?feedView=all",
        },
        {
            id: 3,
            icon: <Facebook />,
            url: "https://www.facebook.com/people/HeadsInco/61574907748702/",
        },
        {
            id: 4,
            icon: <Instagram />,
            url: "https://www.instagram.com/headsin.co?igsh=MTEyd3pyYzhhYzMzMA%3D%3D&utm_source=qr",
        },
    ];

    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const onSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        try {
            const { data }: { data: string } = await ApiPost(
                "/drop-your-email",
                { email },
                {},
                false
            );

            if (data) {
                toast.success(data);
                setEmail("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <footer className="relative flex flex-col items-center w-full bg-gradient-to-l from-[#EBD2FF] to-[#FFF1F5] rounded-t-[70px] mt-10 md:rounded-t-[110px] md:mt-20">
            <div className="container m-0 px-6 md:px-20 w-full">
                <div className="hidden md:block relative justify-between ">
                    <div className="absolute left-0 top-[-90px]">
                        <GoogleDev />
                    </div>
                    <div className="absolute right-0 top-[-120px]">
                        <MacDev />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-14 md:mt-20 gap-20">
                    <div className="w-full md:w-1/2 text-center md:text-start md:py-15">
                        <h5 className="font-extrabold text-xl md:text-3xl text-[#393939]">
                            Today we are building{" "}
                            <span className="bg-gradient-to-r from-[#3F1562] to-(--color-primary) bg-clip-text text-transparent">
                                For India
                            </span>
                            ,<br />
                            Tomorrow we will build for{" "}
                            <span className="bg-gradient-to-r from-[#3F1562] to-(--color-primary) bg-clip-text text-transparent">
                                The World
                            </span>
                        </h5>
                    </div>

                    <div className="hidden lg:flex absolute lg:top-[20%] lg:right-[50%] lg:w-60">
                        <Arrow />
                    </div>

                    <form className="flex w-full md:w-1/2 gap-3" onSubmit={onSubscribe}>
                        <AuthInput
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Drop Your Email"
                            inputStyle="!bg-white w-full text-sm md:text-base"
                            required
                        />
                        <PrimaryButton
                            label="Contact Us"
                            type="submit"
                            labelStyle="text-white text-sm md:text-base font-normal"
                            className="w-1/2 py-3 bg-linear-30 from-black via-black via-60% to-(--color-primary) to-110% gap-3 whitespace-nowrap"
                        />
                    </form>
                </div>

                <div className="flex justify-center w-full mt-10">
                    <ul className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {NAVBAR_ITEMS.map((item) => (
                            <li key={item.title} className="flex">
                                <NavLink
                                    to={item.to}
                                    className={({ isActive }) =>
                                        twMerge(
                                            "flex text-sm items-center font-semibold gap-1 md:px-4 py-2 rounded-md transition duration-300 ease-in-out",
                                            isActive
                                                ? "bg-gradient-to-r from-[#3F1562] to-(--color-primary) bg-clip-text text-transparent"
                                                : "text-[#787878] hover:text-[#3F1562]"
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

                <hr className="border-[#D5A4FE] border opacity-25 my-6" />

                <div className="flex flex-col md:flex-row justify-between items-center pb-8">
                    <div
                        onClick={() => navigate("/")}
                        className="flex flex-col items-center md:items-start gap-4"
                    >
                        <img
                            src="/logo.webp"
                            alt="headsin"
                            className="w-40 md:w-55 object-contain"
                        />
                        <p className="text-[#494949] text-sm font-semibold">
                            © 2025 HeadsIn | All rights reserved
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-3 mt-5 md:mt-0">
                        <div className="flex gap-4">
                            {SOCIALS.map((social) => (
                                <a
                                    key={social.id}
                                    href={social.url}
                                    target="_blank"
                                    className="flex items-center justify-center w-7 h-7 sm:w-7 sm:h-7 border border-[#282828] rounded-full cursor-pointer"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>

                        <div className="flex gap-4 text-sm font-semibold text-[#494949]">
                            <button
                                type="button"
                                onClick={() => navigate("code-of-conduct")}
                            >
                                Code of Conduct
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("privacy-policy")}
                            >
                                Privacy Policy
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate("terms-and-conditions")}
                            >
                                Terms & Services
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
