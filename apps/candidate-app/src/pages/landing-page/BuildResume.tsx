import { ResumeBuild } from "@/assets/images";
import KeyPoints from "@/assets/svg/landingPage/KeyPoints";
import Star from "@/assets/svg/preassessment-modal/Star";
import { TextCounter } from "@/components/animated/TextCounter";
import { TextFade } from "@/components/animated/TextFade";
import MetaGenerator from "@/components/MetaGenerator";
import LandingTimeline from "@/components/ui/landing-page/LandingTimeline";
import { motion } from "framer-motion";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";

const BuildResume = () => {
    const navigate = useNavigate();

    return (
        <div className="overflow-hidden">
            <MetaGenerator
                title="HeadsIn | Resume Builder"
                description="Build smart, ATS-friendly resumes in minutes."
                canonicalUrl="https://headsin.co/build-resume-page"
                keywords={[
                    "online ai resume builder",
                    "ai resume generator",
                    "ai for resume writing",
                ]}
            />
            {/* hero-section */}
            <section className="w-100vw h-100vh px-3 md:px-9 lg:px-13 overflow-hidden">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-2 py-10 lg:py-20 justify-between">
                    <div className="flex flex-col w-full lg:w-7/12 gap-6 md:gap-10 lg:gap-15 pt-5 lg:pt-10 text-center lg:text-left">
                        <h1 className="font-extrabold z-10 text-3xl md:text-3xl lg:text-7xl leading-tight text-[#343434] rounded-lg">
                            Get More Job Offers with
                            <span className="bg-gradient-to-r from-[#3F1562] to-[#A01D43] bg-clip-text text-transparent relative">
                                &nbsp;AI-Powered&nbsp;
                            </span>{" "}
                            Resume Builder!
                        </h1>

                        <p className="font-semibold z-10 text-base md:text-lg w-full md:w-2/3 text-[#2A2A2A]">
                            Quickly build a job-winning resume with HeadsIn's
                            AI-powered builder & stand out instantly!
                        </p>

                        <div className="flex justify-center lg:justify-start">
                            <Button
                                className="group w-fit z-10 py-3 px-5 flex items-center gap-3 border-0 ring-0 gradient-btn"
                                style={{
                                    // backgroundColor: "#DF6789",
                                    borderColor: "#DF6789",
                                    color: "#FFFFFF",
                                    borderRadius: "15px",
                                }}
                                onClick={() => navigate("/dashboard/resume")}
                            >
                                <span className="group-hover:animate-spin">
                                    <Star
                                        fromcolor="#FFFFFF"
                                        tocolor="#FFFFFF"
                                        width="20"
                                    />
                                </span>
                                Create Your Resume
                            </Button>
                        </div>
                    </div>

                    <div className="relative w-full lg:w-auto flex justify-center lg:justify-end">
                        <div className="absolute h-160 w-130 bg-[radial-gradient(closest-side,theme(colors.purple.100),transparent)] -left-70 bottom-0"></div>

                        <div className="absolute h-190 w-190 bg-[radial-gradient(closest-side,theme(colors.rose.100),transparent)] -right-60 -bottom-25"></div>

                        <div className="relative flex items-end justify-center bg-white/30 rounded-3xl w-full lg:w-110 aspect-[0.9] overflow-hidden mx-auto lg:mx-0">
                            <motion.img
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                src={ResumeBuild}
                                alt="Resume"
                                className="absolute right-0 bottom-0 w-11/12 aspect-[0.9]"
                            />
                        </div>

                        <div className="absolute ">
                            {/* small screen  */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                className="absolute block md:hidden -left-50 -top-10 "
                            >
                                <Star width={"70"} />
                            </motion.div>

                            {/*medium screen*/}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                className="absolute hidden md:block right-100 -top-10 "
                            >
                                <Star width={"100"} />
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="absolute right-0 md:left-40 top-10 md:top-20 rotate-20"
                        >
                            <Star />
                        </motion.div>

                        {/* <div className="absolute"> */}
                        {/* Small screens */}
                        <div className="absolute block md:hidden bottom-0 left-5">
                            <KeyPoints width={"200"} />
                        </div>

                        {/* Medium screens */}
                        <div className="absolute hidden md:block lg:hidden bottom-0 left-5">
                            <KeyPoints width={"400"} />
                        </div>

                        {/* Large screens */}
                        <div className="absolute hidden lg:block bottom-0 -left-40">
                            <KeyPoints />
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </section>

            {/*  */}
            <section className="px-6 md:px-9 lg:px-13 mt-20">
                <div
                    className="flex flex-col md:flex-row bg-gradient-to-l from-[#FFDAE5] to-[#F2E3FE] 
                  justify-between rounded-4xl gap-10 px-8 md:px-15 lg:px-30 py-10 md:py-15"
                >
                    <div className="flex flex-col w-full md:w-1/3 gap-4 md:gap-6 text-center md:text-left">
                        <p className="font-semibold text-3xl md:text-5xl">
                            <TextCounter
                                from={0}
                                to={9.3}
                                animationOptions={{ duration: 1 }}
                            />
                            /10
                        </p>
                        <p className="font-normal text-base md:text-lg text-[#3C3C3C]">
                            AI-optimized resumes that impress recruiters.
                        </p>
                    </div>

                    <div className="flex flex-col w-full md:w-1/3 gap-4 md:gap-6 text-center md:text-left">
                        <p className="font-semibold text-3xl md:text-5xl">
                            <TextCounter
                                from={0}
                                to={97}
                                animationOptions={{ duration: 1 }}
                            />
                            %
                        </p>
                        <p className="font-normal text-base md:text-lg text-[#3C3C3C]">
                            ATS-friendly resumes that get past filters with
                            ease.
                        </p>
                    </div>

                    <div className="flex flex-col w-full md:w-1/3 gap-4 md:gap-6 text-center md:text-left">
                        <p className="font-semibold text-3xl md:text-5xl">
                            <TextCounter
                                from={0}
                                to={10}
                                animationOptions={{ duration: 1 }}
                            />
                            x
                        </p>
                        <p className="font-normal text-base md:text-lg text-[#3C3C3C]">
                            Faster Resume Creation. Get job-ready in minutes!
                        </p>
                    </div>
                </div>
            </section>

            {/* 4 steps */}
            <section className="relative h-fit md:my-15 w-screen mt-10 ">
                <div className="relative h-full w-full justify-between">
                    <div className="absolute md:h-192 w-500 bg-[radial-gradient(closest-side,theme(colors.purple.100),transparent)] right-0 opacity-50"></div>
                    <div className="absolute md:h-190 w-500 bg-[radial-gradient(closest-side,theme(colors.rose.100),transparent)] left-0 opacity-50"></div>
                </div>

                <div className="flex flex-col gap-10 md:pb-10">
                    <div className="flex item-center justify-center text-center">
                        <TextFade>
                            <h2 className=" font-extrabold z-10 text-3xl md:text-4xl leading-tight  text-[#343434] rounded-lg text-center px-4 ">
                                Create a Job-Winning&nbsp;
                                <span className="bg-gradient-to-r from-[#3F1562] to-(--color-primary) bg-clip-text text-transparent relative">
                                    Resume&nbsp;
                                </span>
                                in 4 Quick Steps!
                            </h2>
                        </TextFade>
                    </div>

                    <LandingTimeline />
                </div>
            </section>
        </div>
    );
};

export default BuildResume;
