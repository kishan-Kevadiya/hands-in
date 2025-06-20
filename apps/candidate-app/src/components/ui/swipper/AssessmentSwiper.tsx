import GeneratingImg from "@/assets/svg/assessment/GeneratingImg";
import QuestionBg from "@/assets/svg/assessment/QuestionBg";
import Star from "@/assets/svg/preassessment-modal/Star";
import { submitTestAnswers } from "@/helpers/apis/assessment-test";
import { SCORE } from "@/routes";
import { Options, Question } from "@/types/assessment-test.types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AuthButton from "../auth/AuthButton";
import ProgressField from "../auth/ProgressField";
import QuestionOption from "../auth/QuestionOption";
import SecondaryButton from "../auth/SecondaryButton";
import ButtonLoader from "../loader/ButtonLoader";

interface AssessmentSwiperProps {
    TestId: string;
    TestQuestions: Omit<Question, "answer">[];
    timeLeft: number;
    isTestLoading: boolean;
}

const AssessmentSwiper: React.FC<AssessmentSwiperProps> = ({
    timeLeft,
    TestId,
    TestQuestions,
    isTestLoading,
}) => {
    const navigate = useNavigate();

    const [allAnswers, setAllAnswers] = useState<Omit<Question, "answer">[]>(
        []
    );
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const onTestSubmit = async () => {
        setIsLoading(true);
        try {
            const userResponses = allAnswers.map((question) => ({
                questionId: question.id,
                selectedOption: question.selectedOption as Options,
            }));

            const response = await submitTestAnswers({
                testId: TestId,
                userResponses,
            });
            if (response) {
                navigate(SCORE, {
                    state: {
                        score: response.data.obtainedMarks,
                        isTestGiven: true,
                        roleName: response.data.roleName,
                    },
                });
                setAllAnswers([]);
            }
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };

    const handleOptionSelect = (option: Options, questionId: string) => {
        setAllAnswers((prevAnswers) => {
            return prevAnswers.map((answer) => {
                if (answer.id === questionId) {
                    return { ...answer, selectedOption: option };
                }
                return answer;
            });
        });
    };

    /* Set all answers */
    useEffect(() => {
        setAllAnswers(TestQuestions);
    }, [TestQuestions]);

    /* Check if time is up */
    useEffect(() => {
        if (timeLeft === 0) {
            onTestSubmit();
        }
    }, [timeLeft]);

    const progressValue = Math.floor(
        (allAnswers.filter((answer) => answer.selectedOption).length /
            allAnswers.length) *
            100
    );

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = "";
        };

        const handlePopState = (event: PopStateEvent) => {
            event.preventDefault();
            const confirmation = window.confirm(
                "Are you sure you want to leave this page?"
            );
            if (!confirmation) {
                // If user cancels, push back to current page
                window.history.pushState(null, "", window.location.href);
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    return isTestLoading || allAnswers?.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full h-[calc(100vh-200px)] gap-4">
            <div className="flex items-center justify-center">
                <GeneratingImg />
            </div>
            <div className="flex flex-col items-center justify-center gap-3 w-full">
                <p className="text-xl font-bold flex items-center gap-2">
                    Creating{" "}
                    <span>
                        <Star
                            width="24"
                            height="24"
                        />
                    </span>
                    AI-Powered Test for You...
                </p>
                <p className="text-sm md:w-full w-11/12 text-center">
                    Our system is curating intelligent questions based on your
                    preferences.
                </p>
            </div>
        </div>
    ) : (
        <>
            {/* Progress Bar */}
            <div className="flex flex-col items-center justify-center md:pb-6 lg:px-14 md:px-10 font-manrope w-full">
                <div className="lg:w-4/5 md:w-full w-11/12">
                    {allAnswers && (
                        <ProgressField
                            pt={{}}
                            value={progressValue}
                        />
                    )}
                </div>
            </div>

            <Swiper
                grabCursor={false}
                centeredSlides={true}
                slidesPerView={"auto"}
                effect={"coverflow"}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 200,
                    modifier: 2,
                    slideShadows: false,
                }}
                pagination={false}
                navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                }}
                modules={[EffectCoverflow, Navigation]}
                className="md:h-[calc(100%-220px)] h-[calc(100vh-110px)] w-full md:!pb-0 !pb-4"
                wrapperClass="lg:space-x-12 space-x-6 lg:ml-6 ml-3 items-center md:mt-0 mt-4"
                onActiveIndexChange={(index) => {
                    setActiveIndex(index.activeIndex);
                }}
            >
                {allAnswers?.map((question, index) => (
                    <SwiperSlide
                        className="lg:!w-3/4 md:!w-4/5 !w-11/12 font-manrope"
                        key={index}
                    >
                        <div
                            className={`relative transition-all duration-500 overflow-hidden flex flex-col items-center ${
                                index === activeIndex
                                    ? "bg-[#FFEFF4] border border-primary"
                                    : "bg-[#F2F2F2]"
                            } h-full rounded-3xl`}
                        >
                            <div className="absolute bottom-3 -right-16">
                                <QuestionBg
                                    color={
                                        index === activeIndex
                                            ? "#DF6789"
                                            : "#646464"
                                    }
                                />
                            </div>

                            <div className="relative z-10 flex flex-col h-full lg:gap-6 md:gap-3 gap-2 lg:w-3/5 w-4/5 lg:py-10 md:py-6 py-4 overflow-y-auto">
                                <p className="text-[#646464] font-semibold">
                                    Question {index + 1}
                                </p>
                                <p className="lg:text-3xl text-2xlcon font-semibold">
                                    {question.question}
                                </p>

                                <div className="grid md:grid-cols-2 grid-cols-1 gap-4 pt-4 z-10">
                                    <QuestionOption
                                        id={`${question.a}${index}`}
                                        name={`test-question${index}`}
                                        label={question.a}
                                        isChecked={
                                            Options.a ===
                                            question.selectedOption
                                        }
                                        onChange={() =>
                                            handleOptionSelect(
                                                Options.a,
                                                question.id
                                            )
                                        }
                                    />

                                    <QuestionOption
                                        id={`${question.b}${index}`}
                                        name={`test-question${index}`}
                                        label={question.b}
                                        isChecked={
                                            Options.b ===
                                            question.selectedOption
                                        }
                                        onChange={() =>
                                            handleOptionSelect(
                                                Options.b,
                                                question.id
                                            )
                                        }
                                    />

                                    <QuestionOption
                                        id={`${question.c}${index}`}
                                        name={`test-question${index}`}
                                        label={question.c}
                                        isChecked={
                                            Options.c ===
                                            question.selectedOption
                                        }
                                        onChange={() =>
                                            handleOptionSelect(
                                                Options.c,
                                                question.id
                                            )
                                        }
                                    />

                                    <QuestionOption
                                        id={`${question.d}${index}`}
                                        name={`test-question${index}`}
                                        label={question.d}
                                        isChecked={
                                            Options.d ===
                                            question.selectedOption
                                        }
                                        onChange={() =>
                                            handleOptionSelect(
                                                Options.d,
                                                question.id
                                            )
                                        }
                                    />
                                </div>

                                {/* Button */}

                                <div className="flex items-center justify-center md:mt-auto pt-4">
                                    <div className="flex items-center justify-center gap-4 w-4/5 h-full">
                                        {/* Previous button */}
                                        <div
                                            className={`w-1/2 h-full ${
                                                activeIndex === 0 && "hidden"
                                            }`}
                                        >
                                            <SecondaryButton
                                                type="button"
                                                customStyle="swiper-button-prev w-full h-full border-black rounded-xl"
                                                label="Previous"
                                            />
                                        </div>

                                        {/* Next & Submit button */}
                                        <div className="w-1/2">
                                            {index ===
                                            allAnswers?.length - 1 ? (
                                                <button
                                                    disabled={
                                                        progressValue !== 100 ||
                                                        isLoading
                                                    }
                                                    onClick={onTestSubmit}
                                                    type="button"
                                                    className="flex items-center justify-center w-full !bg-primary !text-white hover:bg-unset border-none focus:shadow-none !rounded-xl py-3 md:px-4 px-0 font-medium text-sm disabled:opacity-50"
                                                >
                                                    {isLoading ? (
                                                        <ButtonLoader
                                                            isVisible={
                                                                isLoading
                                                            }
                                                        />
                                                    ) : (
                                                        "Submit"
                                                    )}
                                                </button>
                                            ) : (
                                                <AuthButton
                                                    type="button"
                                                    customStyle="swiper-button-next"
                                                    label="Next"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default AssessmentSwiper;
