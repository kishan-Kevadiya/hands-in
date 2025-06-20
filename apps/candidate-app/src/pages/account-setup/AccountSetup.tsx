import { BrowseJobsImg, CompleteYourProfileImg } from "@/assets/images";
import AuthButton from "@/components/ui/auth/AuthButton";
import { BROWSE_JOBS, COMPLETE_PROFILE } from "@/routes";
import { useState } from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

const AccountSetup: React.FC = () => {
    const navigate = useNavigate();
    const [selectedChoice, setSelectedChoice] = useState<string>("profile");

    const handleNext = () => {
        if (selectedChoice === "profile") {
            navigate(COMPLETE_PROFILE);
        } else {
            navigate(BROWSE_JOBS, { state: { from: "account-setup" } });
        }
    };

    return (
        <div className="bg-gradient-to-tr from-[#FFB2DF]/50 to-[#E9D0FF]/50 flex items-center justify-center md:h-screen md:py-10 md:px-14 p-4">
            <div className="bg-white/50 rounded-2xl p-6 h-full w-full">
                <div className="relative flex flex-col items-center justify-center w-full p-10 gap-6 bg-white rounded-2xl font-manrope h-full z-0">

                    {/* bg design */}
                    <div className="absolute top-1/2 right-1/3 w-1/2 h-1/2 shadow-2xl blur-3xl shadow-[#FFB2DF] rounded-full bg-[#FFB2DF]/50 -z-10" />
                    <div className="absolute bottom-1/2 left-1/3 w-1/2 h-1/2 shadow-2xl blur-3xl shadow-[#E9D0FF] rounded-full bg-[#E9D0FF]/50 -z-10" />

                    {/* Logo */}
                    <div className="w-52 aspect-[6.04]">
                        <img src="/logo.webp" alt="logo" />
                    </div>

                    {/* Heading */}
                    <h1 className="text-center md:text-2xl text-xl font-semibold text-[#212121] md:leading-10 leading-8">
                        Hey, do you want to complete your profile or{" "}
                        <br className="hidden md:block" /> continue browsing for
                        a job?
                    </h1>

                    {/* Selection Options */}
                    <div className="transition-all duration-300 grid grid-cols-1 md:grid-cols-2 gap-6 mb-2 lg:w-3/5 w-full">
                        {/* Complete Profile Option */}
                        <div className="flex flex-col items-center gap-4">
                            <h2
                                className={twMerge(
                                    "text-xl font-semibold transition-all duration-300 ease-in-out",
                                    selectedChoice === "profile"
                                        ? "text-black [&_span]:text-primary"
                                        : "text-[#8F8F8F]"
                                )}
                            >
                                Complete Your <span>Profile</span>
                            </h2>
                            <div
                                onClick={() => setSelectedChoice("profile")}
                                className={twMerge(
                                    "w-full focus:outline-none rounded-2xl transition-all duration-300 ease-in-out",
                                    selectedChoice === "profile"
                                        ? "ring-2 ring-primary saturate-100"
                                        : "saturate-0"
                                )}
                            >
                                <div className={`aspect-[1.66] cursor-pointer`}>
                                    {<img
                                        src={CompleteYourProfileImg}
                                        alt="complete your profile"
                                        className="w-full h-full rounded-2xl"
                                    />}
                                </div>
                            </div>
                        </div>

                        {/* Browse Option */}
                        <div className="flex flex-col items-center gap-4">
                            <h2
                                className={twMerge(
                                    "text-xl font-semibold transition-all duration-300 ease-in-out",
                                    selectedChoice === "browse"
                                        ? "text-black [&_span]:text-primary"
                                        : "text-[#8F8F8F]"
                                )}
                            >
                                Browse <span>Jobs</span>
                            </h2>
                            <div
                                onClick={() => setSelectedChoice("browse")}
                                className={twMerge(
                                    "w-full focus:outline-none rounded-2xl transition-all duration-300 ease-in-out",
                                    selectedChoice === "browse"
                                        ? "ring-2 ring-primary saturate-100"
                                        : "saturate-0"
                                )}
                            >
                                <div
                                    className={`aspect-[1.66] cursor-pointer rounded-2xl `}
                                >
                                    {<img
                                        src={BrowseJobsImg}
                                        alt="browse jobs"
                                        className="w-full h-full rounded-2xl"
                                    />}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Button */}
                    <div className="flex justify-center md:w-1/4 w-1/2">
                        <AuthButton label="Next" onClick={handleNext} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSetup;
