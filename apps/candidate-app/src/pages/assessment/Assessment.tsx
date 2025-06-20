import TimerIcon from "@/assets/svg/assessment/TimerIcon";
import AssessmentSwiper from "@/components/ui/swipper/AssessmentSwiper";
import { getTestQuestions } from "@/helpers/apis/assessment-test";
import { USE_QUERY_KEYS } from "@/helpers/constants";
import { showToast } from "@/helpers/helper";
import { DASHBOARD } from "@/routes";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const Assessment: React.FC = () => {
    const { roleId } = useParams();
    const navigate = useNavigate();

    const [timeLeft, setTimeLeft] = useState(4 * 60); // 4 minutes in seconds

    const TestQuestions = useQuery({
        queryKey: [USE_QUERY_KEYS.GET_TEST_QUESTIONS, roleId],
        queryFn: async () => await getTestQuestions(roleId!),
    });

    useEffect(() => {
        if (TestQuestions.error) {
            showToast(
                "error",
                "Error fetching test questions. Please try again later."
            );
            navigate(DASHBOARD);
        } else {
            if (TestQuestions.data && TestQuestions.data.isTestGiven) {
                showToast("success", "You have already given this test");
                navigate(DASHBOARD);
            }

            if (
                TestQuestions.data &&
                TestQuestions.data.questions?.length > 0
            ) {
                const intervalId = setInterval(() => {
                    setTimeLeft((prevTimeLeft) => {
                        if (prevTimeLeft === 0) {
                            clearInterval(intervalId);
                        }
                        return prevTimeLeft - 1;
                    });
                }, 1000); // 1 second interval
                return () => {
                    clearInterval(intervalId);
                };
            }
        }
    }, [TestQuestions]);

    return (
        <div className="flex flex-col items-center md:h-screen gap-0 w-full overflow-hidden">
            <div className="flex flex-col items-center justify-center md:pt-8 lg:px-14 md:px-10 p-4 font-manrope w-full">
                <div className="flex flex-col gap-2 lg:w-4/5 w-full">
                    <div className="flex flex-row md:gap-0 gap-4 items-center justify-between w-full">
                        {/* Logo */}
                        <div className="lg:w-52 w-48 aspect-[6.04] md:block hidden">
                            <img
                                src="/logo.webp"
                                alt="logo"
                            />
                        </div>

                        {/* Heading */}
                        <h1 className="text-center md:text-2xl text-lg font-semibold text-[#212121] leading-10">
                            Assessment Test
                        </h1>

                        {/* Timer */}
                        <div className="flex items-center justify-end md:gap-3 md:w-auto w-1/2">
                            <TimerIcon />
                            <div className="flex md:flex-col flex-row md:gap-0 gap-1 md:items-end items-center md:w-26">
                                <p className="md:text-xl text-lg text-black font-bold">
                                    {moment
                                        .utc(timeLeft * 1000)
                                        .format("mm:ss")}{" "}
                                    Min
                                </p>
                                <p className="text-[#838383] md:text-base text-sm">
                                    Time left
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <AssessmentSwiper
                TestQuestions={TestQuestions.data?.questions ?? []}
                TestId={TestQuestions.data?.testId ?? ""}
                timeLeft={timeLeft}
                isTestLoading={TestQuestions.isLoading}
            />
        </div>
    );
};

export default Assessment;
