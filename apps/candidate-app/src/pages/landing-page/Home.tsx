import {
    AiQuestion,
    Grid,
    JobDescriptionCard,
    Logo,
    RahulSharmaCard,
    RecuiterCursor,
    Resume,
} from "@/assets/images";
import AiEnhance from "@/assets/svg/landingPage/AiEnhance";
import DarkArrow from "@/assets/svg/landingPage/DarkArrow";
import HeadScore from "@/assets/svg/landingPage/HeadScore";
import Ai from "@/assets/svg/landingPage/Home/Ai";
import BetterHiring from "@/assets/svg/landingPage/Home/BetterHiring";
import FilteringCandidate from "@/assets/svg/landingPage/Home/FilteringCandidate";
import HeadsInIcon from "@/assets/svg/landingPage/Home/HeadsInIcon";
import NoBias from "@/assets/svg/landingPage/Home/NoBias";
import NoGuess from "@/assets/svg/landingPage/Home/NoGuess";
import Offers from "@/assets/svg/landingPage/Home/Offers";
import Profile from "@/assets/svg/landingPage/Home/Profile";
import RealTimeCandidate from "@/assets/svg/landingPage/Home/RealTimeCandidate";
import ReduceHiring from "@/assets/svg/landingPage/Home/ReduceHiring";
import Search from "@/assets/svg/landingPage/Home/Search";
import Talent from "@/assets/svg/landingPage/Home/Talent";
import Tracking from "@/assets/svg/landingPage/Home/Tracking";
import KabirCard from "@/assets/svg/landingPage/KabirCard";
import LightArrow from "@/assets/svg/landingPage/LightArrow";
import Recommended from "@/assets/svg/landingPage/Recommended";
import Star from "@/assets/svg/preassessment-modal/Star";
import { TextCounter } from "@/components/animated/TextCounter";
import { TextFade } from "@/components/animated/TextFade";
import MetaGenerator from "@/components/MetaGenerator";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import Statistics from "@/components/ui/InfiniteScroll/Client";
import { motion } from "framer-motion";
import { Outlet, useNavigate } from "react-router";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PreAssesmentArrow from "./PreAssesmentArrow";
import UICard from "./UICard";

// FAQ Schema for HeadsIn FAQ page
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is HeadsIn and how does it help with job searching?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "HeadsIn is an AI-powered job platform that helps job seekers find the right job faster by matching their skills with relevant roles, offering real-time application tracking, and providing smart pre-assessments to improve hiring outcomes. It's designed to make job searching easier, faster, and more transparent in India.",
            },
        },
        {
            "@type": "Question",
            name: "How does HeadsIn help recruiters hire better candidates?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "HeadsIn uses AI-driven scorecards, pre-assessments, and real-time applicant tracking to help recruiters identify the most suitable candidates quickly. The platform also ensures privacy with in-app communication, reducing hiring time and improving candidate quality.",
            },
        },
        {
            "@type": "Question",
            name: "Is HeadsIn free to use for job seekers and employers?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, HeadsIn is free for all job seekers. Recruiters can use the platform for free during the initial launch phase, with affordable annual pricing post-launch to access premium hiring tools and AI-based features.",
            },
        },
        {
            "@type": "Question",
            name: "How does HeadsIn use AI?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "HeadsIn uses AI to match candidates with the right jobs, generate smart scorecards, conduct 3-minute role-based assessments, and track applications in real-time. It also offers an AI-based JD maker to help recruiters create clear, role-specific job descriptions instantly.",
            },
        },
    ],
};

const Home = () => {
    const reviews = [
        {
            name: "Jay Shah",
            position: "HR Manager, TechNova Solutions",
            review: "HeadsIn has transformed our hiring process. We found highly skilled candidates effortlessly, and the AI-driven match reduced our hiring time by 50%!",
        },
        {
            name: "Neha Verma",
            position: "Software Developer",
            review: "Finding my dream job was never this easy! HeadsIn’s smart recommendations helped me land a perfect role in just a few days.",
        },
        {
            name: "Ravi Mehta",
            position: "Founder, DigitalX Agency",
            review: "We struggled with irrelevant applications before HeadsIn. Now, we receive pre-assessed candidates who fit our requirements perfectly!",
        },
        {
            name: "Rohan Das",
            position: "Marketing Specialist",
            review: "Applying for jobs was always frustrating until I used HeadsIn. Their two-way tracking kept me updated, and I got hired faster than ever!",
        },
    ];

    const navigate = useNavigate();

    return (
        <div className="overflow-hidden">
            <MetaGenerator
                title="HeadsIn | AI-driven Job Search and Role-Specific Talent"
                description="Revolutionizing the way India hires and get hired. Get role-specific professional, real-time tracking, and transparent matches."
                keywords={[
                    "hiring website in india",
                    "ai recruitment platform",
                    "ai hiring platform",
                ]}
                schema={faqSchema}
            />
            {/* Hero-section */}
            <section className="relative w-100vw h-100vh  flex flex-col items-center overflow-hidden">
                <div className="absolute h-180 w-180 bg-[radial-gradient(closest-side,theme(colors.rose.100),theme(colors.white),transparent)] -left-70 top-0 opacity-80"></div>
                <div className="absolute h-130 w-160 bg-[radial-gradient(closest-side,theme(colors.purple.100),transparent)] -right-70 top-0"></div>
                <div className="absolute bottom-0 left-1/2 ">
                    <HeadsInIcon />
                </div>

                <div className="w-full z-10 md:w-3/5 px-4">
                    <div className="font-extrabold text-center pt-10 md:pt-20 rounded-lg">
                        <TextFade>
                            <h1 className="text-4xl leading-tight md:text-5xl lg:text-6xl lg:leading-[1.2]">
                                <span className="text-[#3F1562]">
                                    Curated Talent
                                </span>
                                {" "} &
                                <span className="text-[#DF6789]">
                                    {" "} Ideal Jobs
                                </span>
                                {" "} Just For You
                            </h1>
                        </TextFade>
                    </div>
                </div>

                <div className="flex w-full z-10 flex-col min-h-[500px]">
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="absolute z-10 left-0 md:top-20"
                        >
                            <HeadScore />
                        </motion.div>
                        <div className="hidden lg:block absolute z-10  md:left-1/5 md:top-40 w-35">
                            <LightArrow />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="absolute z-10 inset-0 flex items-center justify-center mt-55"
                        >
                            <KabirCard />
                        </motion.div>
                        <div className="absolute inset-0 backdrop-blur-2xl flex items-center justify-center mt-55">
                            <img src={Grid} alt="Grid" />
                        </div>

                        <motion.div
                            animate={{
                                x: [0, -50, -50, 0],
                                y: [0, -50, -50, 0],
                                scale: [1, 0.9, 0.9, 1],
                            }}
                            transition={{
                                duration: 5,
                                delay: 0.2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                            }}
                            className="absolute z-10 flex top-75 left-5/9"
                        >
                            <img
                                src={RecuiterCursor}
                                alt="RecuiterCursor"
                                className="w-40 aspect-[1.6] object-contain"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            viewport={{ once: true }}
                            className="hidden md:block absolute inset-0 top-85 left-2/9"
                        >
                            <Recommended />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0, rotate: 0 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 360 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className=" absolute right-110 rotate-6 top-0"
                        >
                            <Star width={60} />
                        </motion.div>

                        <div className=" absolute right-2/8 top-40">
                            <DarkArrow />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 50, y: 50 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                            viewport={{ once: true }}
                            className="hidden lg:block absolute right-10 top-30"
                        >
                            <AiEnhance />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Sponser-section */}
            <section>
                <Statistics />
            </section>

            {/* Join-us-section */}
            <section className="">
                <div className="flex flex-col gap-4 px-3 lg:px-5">
                    <TextFade delay={0.5}>
                        <h2 className="font-extrabold text-[#343434] text-4xl text-center leading-tight lg:text-5xl lg:leading-[1.2] pt-10 rounded-lg ">
                            Why HeadsIn Is {" "}
                            <span className="bg-gradient-to-b from-[#3F1562] to-(--color-primary) bg-clip-text text-transparent">
                                Right
                            </span>
                            {" "} For You?
                        </h2>
                    </TextFade>
                    <TextFade delay={0.8}>
                        <p className="text-[#4E4E4E] text-center font-semibold">
                            Designed for Recruiters. Built for Job Seekers.
                            Perfect for You
                        </p>
                    </TextFade>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-4 md:p-8 mt-10">
                        <div className="flex flex-col flex-1 border rounded-3xl border-[#FFC7D7] p-6 md:p-10 gap-6 md:gap-8 overflow-hidden">
                            <TextFade>
                                <p className="text-lg md:text-xl font-semibold text-[#343434]">
                                    Got Talent?
                                </p>
                            </TextFade>

                            <motion.h4
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="text-2xl md:text-4xl lg:text-5xl font-extrabold w-full md:w-4/5 text-[#343434]"
                            >
                                Why Job {" "}
                                <span className=" text-[#DF6789]">Seekers</span>
                                {" "} Love Us
                            </motion.h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 overflow-hidden">
                                <div className="flex items-center gap-3">
                                    <Ai />
                                    <p>
                                        <span className="bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
                                            AI
                                        </span>
                                        -Powered Job Matches
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Tracking />
                                    <p>Live Application Tracking</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Offers />
                                    <p>Quick Job Offers</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Search />
                                    <p>
                                        <span className="bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
                                            AI
                                        </span>
                                        -Powered Resume Builder
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5 items-center">
                                <PrimaryButton
                                    label="Sign up"
                                    type="button"
                                    onClick={() => navigate("/auth/register")}
                                    labelStyle="text-white font-normal text-sm"
                                    className="w-full sm:w-fit py-3 px-6 bg-[#DF6789]"
                                />
                                <p
                                    onClick={() => navigate("/candidate")}
                                    className="text-[#DF6789] font-semibold flex items-center gap-2 cursor-pointer"
                                >
                                    Know more
                                    <i
                                        className="pi pi-arrow-up-right"
                                        style={{ color: "#DF6789" }}
                                    ></i>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col flex-1 shrink-0 bg-[#DF6789] rounded-3xl  min-h-[430px] overflow-hidden">
                            <div className="flex p-4 md:p-5 h-fit items-center justify-between whitespace-nowrap md:overflow-hidden gap-1.5">
                                {[
                                    "Recommended",
                                    "Applied",
                                    "In Progress",
                                    "Accepted",
                                    "Rejected",
                                ].map((status, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.2,
                                        }}
                                        viewport={{ once: true }}
                                        key={index}
                                        className="bg-white/20 w-full rounded-full px-4 py-2 text-white text-center"
                                    >
                                        {status}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="relative flex justify-between gap-4 bg-white/20 overflow-hidden rounded-b-3xl h-full p-1 md:p-6 lg:p-10">
                                <img
                                    src={Logo}
                                    alt="Logo"
                                    className="absolute left-[-60px] bottom-[-40px] h-28 w-28 md:h-40 md:w-40"
                                />

                                <motion.img
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    src={AiQuestion}
                                    alt="AI Question"
                                    className="absolute left-2 top-2 md:left-5 md:top-4 md:w-1/2 aspect-[1.41]"
                                />
                                <motion.img
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    src={Resume}
                                    alt="Resume"
                                    className="absolute right-5 bottom-0 h-48 md:h-85"
                                />

                                <div className="relative rotate-5 left-20 md:bottom-20 md:left-40 ">
                                    {/* small screen  */}
                                    <motion.div className="absolute block md:hidden ">
                                        <HeadScore width={"250"} />
                                    </motion.div>

                                    {/*medium screen*/}
                                    <motion.div
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 1.1,
                                        }}
                                        viewport={{ once: true }}
                                        className="absolute hidden md:block "
                                    >
                                        <HeadScore />
                                    </motion.div>
                                </div>

                                <div className="absolute left-0 top-40 ">
                                    {/* small screen  */}
                                    <div className="absolute block md:hidden ">
                                        <UICard
                                            className="min-w-300"
                                            width={"290"}
                                        />
                                    </div>

                                    {/*medium screen*/}
                                    <motion.div
                                        initial={{ opacity: 0, x: 30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 1.1,
                                        }}
                                        viewport={{ once: true }}
                                        className="absolute hidden md:block "
                                    >
                                        <UICard className="min-w-300" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex-1 bg-[#3F1562] rounded-3xl overflow-hidden min-h-[400px] p-4 md:p-6">
                            <img
                                src={Logo}
                                alt="Logo"
                                className="absolute right-[-60px] top-[-40px] h-28 w-28 md:h-40 md:w-40"
                            />
                            <div className="absolute bg-white/5 bottom-0 w-full h-16 rounded-tr-2xl"></div>

                            <div className="flex w-fit lg:w-110">
                                <motion.div
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 1.1,
                                    }}
                                    viewport={{ once: true }}
                                    className="bg-white/15 rounded-3xl p-3"
                                >
                                    <img
                                        src={RahulSharmaCard}
                                        alt="Rahul Sharma"
                                        className=" w-fit"
                                    />
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 1.1,
                                }}
                                viewport={{ once: true }}
                                className="absolute flex w-fit bottom-5 p-3"
                            >
                                <img
                                    src={JobDescriptionCard}
                                    alt="Job Description"
                                    className=" w-fit"
                                />
                            </motion.div>

                            <div className="relative ">
                                {/* small screen  */}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 1.1,
                                    }}
                                    viewport={{ once: true }}
                                    className="absolute block md:hidden left-15 top-0"
                                >
                                    <Recommended />
                                </motion.div>

                                {/*medium screen*/}
                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 1.1,
                                    }}
                                    viewport={{ once: true }}
                                    className="absolute hidden md:block right-0 -top-20"
                                >
                                    <Recommended />
                                </motion.div>
                            </div>

                            <div className="absolute left-25 top-50 md:left-110 md:top-30">
                                <Star fromcolor="#DEB6FF" tocolor="#DEB6FF" />
                            </div>
                        </div>

                        <div className="flex flex-col flex-1 border rounded-3xl border-[#DEB6FF] p-6 md:p-10 gap-6 md:gap-8 overflow-hidden">
                            <TextFade>
                                <p className="text-lg md:text-xl font-semibold text-[#343434]">
                                    Need Talent?
                                </p>
                            </TextFade>

                            <motion.h4
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                                className="text-2xl md:text-4xl lg:text-5xl font-extrabold w-full md:w-4/5 text-[#343434]"
                            >
                                Why{" "}
                                <span className="text-[#3F1562]">
                                    Recruiters
                                </span>{" "}
                                Love Us
                            </motion.h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="flex items-center gap-3">
                                    <Talent />
                                    <p>
                                        <span className="bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
                                            AI
                                        </span>
                                        -Screened Talent
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RealTimeCandidate />
                                    <p>Real-Time Candidate Status</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Profile />
                                    <p>Trusted Profiles</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FilteringCandidate />
                                    <p>
                                        <span className="bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
                                            AI
                                        </span>
                                        -Powered Candidate Matching
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5 items-center">
                                <PrimaryButton
                                    label="Sign up"
                                    type="button"
                                    onClick={() => {
                                        const companyUrl = import.meta.env
                                            .VITE_COMPANY_URL;
                                        window.open(
                                            companyUrl + "auth/register",
                                            "_blank"
                                        );
                                    }}
                                    labelStyle="text-white font-normal text-sm"
                                    className="w-full sm:w-fit py-3 px-6 bg-[#3F1562]"
                                />
                                <p
                                    onClick={() => navigate("/company")}
                                    className="text-[#3F1562] font-semibold flex items-center gap-2 cursor-pointer"
                                >
                                    Know more
                                    <i
                                        className="pi pi-arrow-up-right"
                                        style={{ color: "#3F1562" }}
                                    ></i>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HedsIn Numbers */}
            <section className="bg-gradient-to-l from-[#EBD2FF] to-[#FFF1F5] mx-5 md:mx-13 my-20 rounded-3xl ">
                <div className="flex flex-col md:flex-row overflow-hidden">
                    <div className="flex flex-col gap-5 w-full md:w-2/5 p-8 md:p-12">
                        <TextFade>
                            <h3 className="text-start font-extrabold text-3xl md:text-5xl leading-tight">
                                HeadsIn In
                                <span className="bg-gradient-to-r from-[#3F1562] to-(--color-primary) bg-clip-text text-transparent">
                                    &nbsp; Numbers
                                </span>
                            </h3>
                        </TextFade>
                        <div className="">
                            <p className="text-[#4E4E4E] text-start text-base md:text-lg font-semibold">
                                Hiring or job hunting?
                            </p>
                            <p className="text-[#4E4E4E] text-start text-base md:text-lg font-semibold">
                                We make it efficient and effective!
                            </p>
                        </div>
                    </div>

                    <div className="w-full h-full items-center bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:120px_120px] overflow-hidden p-8 md:p-12">
                        <div className="flex flex-wrap justify-center  my-10 me-30 px-2 gap-6 w-full">
                            <div className="bg-white rounded-3xl flex flex-col gap-3 p-6 md:p-13 text-start shadow-lg flex-1 min-w-[200px] w-full">
                                <h4 className="text-4xl font-extrabold text-[#3F1562]">
                                    <TextCounter
                                        from={0}
                                        to={3}
                                        animationOptions={{ duration: 1.5 }}
                                    />
                                    K+
                                </h4>
                                <p className="text-lg text-[#4E4E4E]">
                                    Candidates
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl flex flex-col gap-3 p-6 md:p-13 text-start shadow-lg flex-1 min-w-[200px] w-full">
                                <h4 className="text-4xl font-extrabold  text-[#3F1562]">
                                    <TextCounter
                                        from={0}
                                        to={95}
                                        animationOptions={{ duration: 1.5 }}
                                    />
                                    %
                                </h4>
                                <p className="text-lg text-[#4E4E4E] whitespace-nowrap md:whitespace-break-spaces">
                                    Job Application Accuracy
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl flex flex-col gap-3 p-6 md:p-13 text-start shadow-lg flex-1 min-w-[200px] w-full">
                                <h4 className="text-4xl font-extrabold text-[#3F1562]">
                                    <TextCounter
                                        from={0}
                                        to={125}
                                        animationOptions={{ duration: 1.5 }}
                                    />
                                    +
                                </h4>
                                <p className="text-lg text-[#4E4E4E]">
                                    Companies
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* skills */}
            <section className="relative w-full py-16 px-5 md:px-6 overflow-clip">
                <div className="flex justify-center relative px-4">
                    <div className="absolute z-10 -top-6 right-5 sm:right-[15%]">
                        <Star />
                    </div>
                    <div className="absolute -top-15 right-5 sm:right-[15%]">
                        <Star
                            width={60}
                            fromcolor={"#E2E2E2"}
                            tocolor={"#E2E2E2"}
                        />
                    </div>
                    <TextFade>
                        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center rounded-lg">
                            Resumes tell a story, but
                            <span className="bg-gradient-to-b from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent relative block sm:inline">
                                &nbsp;Skills&nbsp;
                            </span>
                            prove the fit
                        </h2>
                    </TextFade>
                </div>

                <div className="flex justify-center text-center md:justify-end md:text-right mt-6 lg:mt-10 pe-5 overflow-hidden">
                    <motion.p
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.3 }}
                        className="font-semibold text-gray-600 text-base sm:text-lg md:text-xl leading-snug"
                    >
                        Our{" "}
                        <span className="font-bold">
                            250-sec AI-powered Pre-Assessment
                        </span>{" "}
                        filters top talent fast,
                        <br className="hidden md:block" />
                        ensuring the right fit for every role!
                    </motion.p>
                </div>

                <div className="hidden absolute inset-0 rotate-50 md:rotate-7 md:flex items-center justify-center">
                    <svg
                        className="w-100vw"
                        viewBox="0 0 1000 300"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="layer1">
                            <g id="g484">
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{
                                        pathLength: {
                                            delay: 1,
                                            type: "tween",
                                            duration: 2,
                                        },
                                    }}
                                    viewport={{ once: true, amount: 0.7 }}
                                    d="M0 150C200 50 400 250 600 150C800 50 1000 250 1200 150"
                                    stroke="#D3B8E6"
                                    strokeWidth="1"
                                    strokeDasharray="8 8"
                                />
                                <motion.path
                                    d="M0 150C200 50 400 250 600 150C800 50 1000 250 1200 150"
                                    stroke="#FFFFFF"
                                    strokeWidth="2"
                                    strokeDasharray="8 8"
                                />
                            </g>
                        </g>
                    </svg>
                </div>

                <div className="relative min-h-70 w-full rotate-0 md:rotate-9 max-w-6xl mx-auto mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.8 }}
                        className="flex flex-col rotate-0 md:rotate-353 items-center text-center"
                    >
                        <div className="bg-[#F4E7FF] p-5 rounded-full shadow-lg">
                            <ReduceHiring />
                        </div>
                        <h4 className="mt-4 text-lg font-bold">
                            Reduce Hiring Time
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Shortlist in minutes instead of weeks.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 2.1 }}
                        className="flex flex-col rotate-0 md:rotate-352 mt-0 md:mt-20 items-center text-center"
                    >
                        <div className="bg-[#F4E7FF] p-5 rounded-full shadow-lg">
                            <NoGuess />
                        </div>
                        <h4 className="mt-4 text-lg font-bold">
                            Eliminate Guesswork
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Know exactly who has the right skills before
                            interviews.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 2.4 }}
                        className="flex flex-col rotate-0 md:rotate-351 mt-0 md:mt-10 items-center text-center"
                    >
                        <div className="bg-[#F4E7FF] p-5 rounded-full shadow-lg">
                            <BetterHiring />
                        </div>
                        <h4 className="mt-4 text-lg font-bold">
                            Better Hires, Lower Attrition
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Select candidates based on proven ability, not just
                            words.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 2.7 }}
                        className="flex flex-col rotate-0 md:rotate-352 items-center text-center"
                    >
                        <div className="bg-[#F4E7FF] p-5 rounded-full shadow-lg">
                            <NoBias />
                        </div>
                        <h4 className="mt-4 text-lg font-bold">
                            Unbiased Screening
                        </h4>
                        <p className="text-gray-600 text-sm">
                            Let skills do the talking.
                        </p>
                    </motion.div>
                </div>

                <div className="px-4 md:px-8 mt-10 text-left">
                    <motion.h5
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#343434] rounded-lg"
                    >
                        <span className="bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
                            Pre-Assessments
                        </span>{" "}
                        Are <br className="hidden md:block" />a Game-Changer for
                        Hiring
                    </motion.h5>
                </div>
            </section>

            {/* Review Section */}
            <section className="my-20 mt-40 px-4 md:px-8 lg:px-13">
                <div className="relative ">
                    <div className="absolute left-1/2 bottom-0">
                        <PreAssesmentArrow />
                    </div>
                </div>

                <p className="text-lg md:text-xl font-semibold text-[#DF6789] mt-10 md:mt-20">
                    User MVP Feedback
                </p>

                <div className="flex flex-col lg:flex-row justify-between gap-10 md:gap-20 items-center">
                    <div className="w-full lg:w-1/2 bg-[radial-gradient(closest-side,theme(colors.rose.100),transparent)] flex justify-center">
                        <div className="grid grid-cols-2 gap-6 w-full max-w-md md:max-w-lg">
                            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl w-full h-28 md:h-32">
                                <div className="text-4xl md:text-5xl">😌</div>
                                <div className="mt-3 text-lg md:text-xl font-bold bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
                                    <TextCounter
                                        from={0}
                                        to={28}
                                        animationOptions={{ duration: 0.5 }}
                                    />
                                    %
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl w-full h-28 md:h-32">
                                <div className="text-4xl md:text-5xl">🙂</div>
                                <div className="mt-3 text-lg md:text-xl font-bold bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
                                    <TextCounter
                                        from={0}
                                        to={13}
                                        animationOptions={{ duration: 0.5 }}
                                    />
                                    %
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl w-full h-32 md:h-40">
                                <div className="text-5xl md:text-6xl">😇</div>
                                <div className="mt-3 text-xl md:text-2xl font-bold bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
                                    <TextCounter
                                        from={0}
                                        to={47}
                                        animationOptions={{ duration: 0.5 }}
                                    />
                                    %
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl w-full h-32 md:h-40">
                                <div className="text-5xl md:text-6xl">😐</div>
                                <div className="mt-3 text-xl md:text-2xl font-bold bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
                                    <TextCounter
                                        from={0}
                                        to={12}
                                        animationOptions={{ duration: 0.5 }}
                                    />
                                    %
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col w-full lg:w-1/2 lg:pe-40">
                        <motion.h6
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight text-[#343434]"
                        >
                            What Users Are
                            <span className="bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
                                &nbsp; Saying&nbsp;
                            </span>
                            About HeadsIn
                        </motion.h6>

                        <div className="flex flex-col mt-10">
                            {reviews.length > 0 && (
                                <Swiper
                                    centeredSlides={true}
                                    slidesPerView={1}
                                    autoplay={{ delay: 1000 }}
                                    loop
                                    pagination={false}
                                    modules={[Navigation]}
                                    navigation={{
                                        nextEl: ".swiper-button-next",
                                        prevEl: ".swiper-button-prev",
                                    }}
                                    className="w-full"
                                >
                                    {reviews.map((review, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="flex flex-col items-start w-full gap-4">
                                                <span className="text-2xl md:text-3xl font-bold">
                                                    {review.name}
                                                </span>
                                                <span className="text-lg md:text-xl font-semibold text-[#DF6789]">
                                                    {review.position}
                                                </span>
                                                <span className="w-11/12 text-lg md:text-xl font-semibold text-[#4E4E4E]">
                                                    {review.review}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-end gap-5 mt-6">
                                                <button className="swiper-button-prev flex items-center justify-center w-12 h-12 border border-[#DF6789] rounded-full hover:bg-[#DF6789]/30 hover:[&_i]:text-white transition duration-300 ease-in-out outline-none">
                                                    <i className="pi pi-arrow-left text-[#DF6789] text-xl"></i>
                                                </button>

                                                <button className="swiper-button-next flex items-center justify-center w-12 h-12 border border-[#DF6789] rounded-full hover:bg-[#DF6789]/30 hover:[&_i]:text-white transition duration-300 ease-in-out outline-none">
                                                    <i className="pi pi-arrow-right text-[#DF6789] text-xl"></i>
                                                </button>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Outlet />
        </div>
    );
};

export default Home;
