import { Congretulation } from "@/assets/images";
import QuestionBg from "@/assets/svg/assessment/QuestionBg";
import Circle from "@/assets/svg/preassessment-modal/Circle";
import AuthButton from "@/components/ui/auth/AuthButton";
import Confetti from "@/components/ui/confetti/Confetti";
import HeadScore from "@/components/ui/progressbar/HeadScore";
import { ASSESSMENT, DASHBOARD, JOB_DETAILS } from "@/routes";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";

const Headscore: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { roleId } = useParams();
    const jobId = localStorage.getItem("jobId");

    useEffect(() => {
        if (state?.score === undefined) {
            navigate(DASHBOARD);
        } else if (!state?.isTestGiven) {
            navigate(ASSESSMENT + "/" + roleId);
        }
    }, [state]);

    return (
        <div className="relative overflow-hidden bg-radial from-white from-40% to-[#FFA4BE]/30 flex items-center justify-center h-screen">
            <div className="absolute -top-20 -right-20">
                <Circle />
            </div>
            <div className="absolute -bottom-24 -left-10">
                <Circle />
            </div>
            <div className="absolute top-16 -left-52 rotate-[-20deg] ">
                <QuestionBg />
            </div>
            <div className="absolute bottom-24 -right-16 rotate-[-20deg] ">
                <QuestionBg />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-transparent h-screen flex items-center justify-center">
                <Confetti />
            </div>

            <div className=" flex flex-col items-center justify-center w-full p-10 gap-6 rounded-2xl font-manrope h-full z-0 overflow-y-auto">
                {/* Logo */}
                <div className="w-52 aspect-[6.04]">
                    <img
                        src="/logo.webp"
                        alt="logo"
                    />
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className="aspect-square w-14">
                        <img
                            src={Congretulation}
                            alt="Congretulation"
                            className="w-full h-full"
                        />
                    </div>
                    <p className="md:text-5xl text-4xl font-bold text-primary">
                        Congratulations!
                    </p>

                    <p className="text-lg text-black font-medium text-center">
                        Your hard work paid off! Here’s your performance in the
                        assessment
                        <br className="hidden md:block" /> test for the{" "}
                        <span className="text-primary">{state?.roleName}</span>{" "}
                        category.
                    </p>

                    <div className="flex flex-col items-center gap-2">
                        <HeadScore value={state?.score} />
                        <p className="font-semibold text-black text-center">
                            Headscore
                        </p>
                    </div>
                </div>

                {/* Next Button */}
                <div className="flex justify-center w-52">
                    <AuthButton
                        disabled={!state?.isTestGiven}
                        onClick={() =>
                            navigate(
                                jobId ? `${JOB_DETAILS}/${jobId}` : DASHBOARD
                            )
                        }
                        customStyle="flex-row-reverse justify-between text-start !px-5"
                        label="Let's job hunt"
                        icon={<i className="pi pi-arrow-right"></i>}
                    />
                </div>
            </div>
        </div>
    );
};

export default Headscore;
