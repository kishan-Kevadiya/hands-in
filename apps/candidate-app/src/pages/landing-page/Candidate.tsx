import {
    AppDeveloper,
    CandidateChat,
    CandidateChatBlure,
    CandidateTest,
    FullStackDeveloper,
    Google,
    Jesica,
    Mac,
    Rahul,
    UiDesigner,
} from "@/assets/images";
import DataIcon from "@/assets/svg/landingPage/AboutUs/DataIcon";
import InfoCheckIcon from "@/assets/svg/landingPage/AboutUs/InfoCheckIcon";
import MessageIcon from "@/assets/svg/landingPage/AboutUs/MessageIcon";
import CandidateArrow from "@/assets/svg/landingPage/Candidate/CandidateArrow";
import CandidateIcon from "@/assets/svg/landingPage/Candidate/CandidateIcon";
import CandidateRecruiter from "@/assets/svg/landingPage/Candidate/CandidateRecruiter";
import JobAlert from "@/assets/svg/landingPage/Candidate/JobAlert";
import Mailing from "@/assets/svg/landingPage/Candidate/Mailing";
import MetaDev from "@/assets/svg/landingPage/Candidate/MetaDev";
import NoMessage from "@/assets/svg/landingPage/Candidate/NoMessage";
import ProfileOverlook from "@/assets/svg/landingPage/Candidate/ProfileOverlook";
import ReverseArrow from "@/assets/svg/landingPage/Candidate/ReverseArrow";
import HeadScore from "@/assets/svg/landingPage/HeadScore";
import { TextCounter } from "@/components/animated/TextCounter";
import { TextFade } from "@/components/animated/TextFade";
import MetaGenerator from "@/components/MetaGenerator";
import { LOGIN } from "@/routes";
import { motion, useInView } from "framer-motion";
import { Divider } from "primereact/divider";
import React from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

const Candidate = () => {
    const navigate = useNavigate();

    const categorySectionRef = React.useRef<HTMLDivElement>(null);
    const proveTalentSectionRef = React.useRef<HTMLDivElement>(null);
    const directCommunicationSectionRef = React.useRef<HTMLDivElement>(null);

    const categorySectionIsInView = useInView(categorySectionRef, {
        amount: 1,
    });
    const proveTalentSectionIsInView = useInView(proveTalentSectionRef, {
        amount: 1,
    });
    const directCommunicationSectionIsInView = useInView(
        directCommunicationSectionRef,
        { amount: 0.7 }
    );

    return (
        <div>
            <MetaGenerator
                title="HeadsIn | Candidate"
                description="Track applications, get noticed, land your dream job."
                canonicalUrl="https://headsin.co/candidate"
            />
            {/* candidate hero section */}
            <section className="px-3 md:px-9 lg:px-13 overflow-hidden w-100vw h-100vh flex flex-col md:flex-row items-center justify-between">
                <div className=" flex flex-col justify-center items-center md:items-start gap-10 md:pb-50 w-full ">
                    <div className='font-extrabold  z-10 text-3xl w-full md:w-fit  md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-center md:text-start pt-10 rounded-lg"'>
                        <h1>
                            Simplify Your Next{" "}
                            <span className="text-(--color-primary)"> Job</span>{" "}
                            Hunt With Us!
                        </h1>
                    </div>

                    <p className="flex  z-10 w-full md:w-2/5 text-[#2A2A2A] font-semibold text-center md:text-left">
                        Easily browse your ideal job with AI-powered matching!
                    </p>
                    <button
                        className="w-fit z-10 flex items-center gap-5  py-3 px-5 border text-[#DF6789] border-[#DF6789] bg-white hover:bg-[#DF6789] hover:text-white rounded-[15px] font-semibold transition duration-300 ease-in-out"
                        onClick={() => navigate("/auth/register")}
                    >
                        Join Us Today
                        <i className="pi pi-arrow-right"></i>
                    </button>
                </div>

                <div className="absolute h-190 w-300 bg-[radial-gradient(closest-side,theme(colors.rose.100),transparent)] right-0"></div>

                {/* Small screen */}
                <div className="flex md:hidden h-full w-full overflow-clip">
                    <img
                        src={Google}
                        alt="google"
                        className="absolute flex mt-20 w-80"
                    />

                    <motion.div className="absolute flex right-3 mt-20">
                        <div className="flex items-center justify-between w-full max-w-md bg-white shadow-md rounded-2xl p-3 border border-pink-200 relative">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-pink-100">
                                    <i className="pi pi-apple text-2xl text-black"></i>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 me-10">
                                        Flutter Developer
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Apple{" "}
                                        <span className="text-[#DF6789]">
                                            •
                                        </span>{" "}
                                        California, CA
                                    </p>
                                </div>
                            </div>
                            <span className="absolute top-4 right-4 text-sm text-[#A7A7A7]">
                                now
                            </span>
                        </div>
                    </motion.div>

                    <motion.div className="absolute flex left-5 mt-40">
                        <div className="flex items-center justify-between w-full max-w-md bg-white shadow-md rounded-2xl p-3 border border-pink-200 relative">
                            <div className="flex items-center space-x-1">
                                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-pink-100">
                                    <MetaDev />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 me-10">
                                        Data Engineer
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Meta{" "}
                                        <span className="text-[#DF6789]">
                                            •
                                        </span>{" "}
                                        Manhattan, NY
                                    </p>
                                </div>
                            </div>
                            <span className="absolute top-4 right-4 text-sm text-[#A7A7A7]">
                                now
                            </span>
                        </div>
                    </motion.div>

                    <motion.div className="absolute right-0 mt-40">
                        <JobAlert width={"350"} />
                    </motion.div>
                </div>

                {/* Large Screen */}
                <div className="relative hidden md:flex items-center w-6/8 mt-0 md:mt-30 ">
                    <div className="absolute flex bottom-13 -left-20">
                        <CandidateArrow />
                    </div>

                    <motion.img
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        src={Google}
                        alt=""
                        className="absolute flex md:left-[-100px] w-150 h-fit  "
                    />

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                        className="absolute flex -bottom-10 left-[-300px]"
                    >
                        <div className="flex items-center justify-between w-full max-w-md bg-white shadow-md rounded-2xl p-4 border border-pink-200 relative">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100">
                                    <i className="pi pi-apple text-2xl text-black"></i>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 me-10">
                                        Flutter Developer
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Apple{" "}
                                        <span className="text-[#DF6789]">
                                            •
                                        </span>{" "}
                                        California, CA
                                    </p>
                                </div>
                            </div>
                            <span className="absolute top-4 right-4 text-sm text-[#A7A7A7]">
                                now
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.6 }}
                        className="absolute flex bottom-0 right-0"
                    >
                        <div className="flex items-center justify-between w-full max-w-md bg-white shadow-md rounded-2xl p-4 border border-pink-200 relative">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-100">
                                    <MetaDev />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 me-10">
                                        Data Engineer
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Meta{" "}
                                        <span className="text-[#DF6789]">
                                            •
                                        </span>{" "}
                                        Manhattan, NY
                                    </p>
                                </div>
                            </div>
                            <span className="absolute top-4 right-4 text-sm text-[#A7A7A7]">
                                now
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.8 }}
                        className="absolute flex top-0"
                    >
                        <JobAlert />
                    </motion.div>
                </div>
            </section>

            {/* Transform Job section */}
            <section className="mt-100 md:mt-30">
                <div className="flex flex-col w-full px-3 md:px-15 py-3 md:py-10">
                    <div className="flex flex-col w-full items-center justify-center gap-5 md:gap-10">
                        <TextFade>
                            <h1 className=" font-extrabold text-3xl w-full md:w-fit  md:text-4xl lg:text-5xl leading-tight md:text-start text-[#343434] text-center pt-10">
                                How HeadsIn&nbsp;
                                <span className="text-(--color-primary)">
                                    &nbsp;Transforms
                                </span>
                                &nbsp;Your Job Hunt!
                            </h1>
                        </TextFade>
                        <TextFade className="w-full md:w-1/2" delay={0.8}>
                            <p className="text-lg/8 text-center font-semibold text-[#4E4E4E]">
                                See how your job hunt transforms from struggle
                                to success with HeadsIn
                            </p>
                        </TextFade>
                    </div>

                    {/* First Comparison section */}
                    <div
                        ref={categorySectionRef}
                        className="lg:h-screen lg:sticky top-0 bg-[#DF6789]/5 md:bg-white flex flex-col md:flex-col lg:flex-row items-center gap-6 md:gap-10 w-full mt-20 lg:mt-0"
                    >
                        <div className="flex flex-col gap-6 md:gap-10 p-3 md:p-6 rounded-lg w-full lg:w-1/2 flex-1 overflow-hidden">
                            <h4 className="text-lg md:text-xl font-bold md:font-medium text-[#343434] text-center md:text-left">
                                Struggling to Find the Right Job?
                            </h4>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                viewport={{ once: true }}
                                className="overflow-x-auto rounded-3xl bg-white border border-gray-200"
                            >
                                <div className="p-3 w-full inline-block align-middle cursor-pointer">
                                    <div className="relative overflow-hidden rounded-xl bg-white border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="table-header-group">
                                                <tr className="divide-x divide-gray-100">
                                                    <th className="px-3 py-3 text-start text-xs font-semibold text-gray-800">
                                                        Job Title
                                                    </th>
                                                    <th className="px-3 py-3 text-center text-xs font-semibold text-gray-800">
                                                        Experience
                                                    </th>
                                                    <th className="px-3 py-3 text-center text-xs font-semibold text-gray-800">
                                                        Work Schedule
                                                    </th>
                                                    <th className="px-3 py-3 text-center text-xs font-semibold text-gray-800">
                                                        Job Type
                                                    </th>
                                                    <th className="px-3 py-3 text-center text-xs font-semibold text-gray-800">
                                                        Salary
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {[
                                                    {
                                                        title: "UI UX Designer",
                                                        exp: "2+ Years",
                                                        schedule: "Full Time",
                                                        type: "Hybrid",
                                                        salary: "20,42,000",
                                                    },
                                                    {
                                                        title: "Full Stack Developer",
                                                        exp: "1+ Years",
                                                        schedule: "Part Time",
                                                        type: "Onsite",
                                                        salary: "20,66,000",
                                                    },
                                                    {
                                                        title: "Software Engineer",
                                                        exp: "4+ Years",
                                                        schedule: "Full Time",
                                                        type: "Remote",
                                                        salary: "21,66,000",
                                                    },
                                                    {
                                                        title: "Backend Developer",
                                                        exp: "2+ Years",
                                                        schedule: "Full Time",
                                                        type: "Remote",
                                                        salary: "30,16,000",
                                                    },
                                                    {
                                                        title: "DevOps Engineer",
                                                        exp: "1+ Years",
                                                        schedule: "Part Time",
                                                        type: "Onsite",
                                                        salary: "21,66,000",
                                                    },
                                                    {
                                                        title: "Software Architect",
                                                        exp: "4+ Years",
                                                        schedule: "Part Time",
                                                        type: "Remote",
                                                        salary: "21,66,000",
                                                    },
                                                    {
                                                        title: "Game Developer",
                                                        exp: "4+ Years",
                                                        schedule: "Full Time",
                                                        type: "Onsite",
                                                        salary: "15,56,000",
                                                    },
                                                ].map((job, index) => (
                                                    <tr
                                                        key={index}
                                                        className="divide-x divide-gray-100 hover:bg-gray-100"
                                                    >
                                                        <td className="px-3 py-3 text-xs font-semibold text-gray-800">
                                                            {job.title}
                                                        </td>
                                                        <td className="px-3 py-3 text-center text-xs text-gray-800">
                                                            {job.exp}
                                                        </td>
                                                        <td className="px-3 py-3 text-center text-xs text-gray-800">
                                                            {job.schedule}
                                                        </td>
                                                        <td className="px-3 py-3 text-center text-xs text-gray-800">
                                                            {job.type}
                                                        </td>
                                                        <td className="px-3 py-3 text-center text-xs text-gray-800">
                                                            {job.salary}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 1.2,
                                            }}
                                            viewport={{ once: true }}
                                            className="absolute top-10 left-5 bg-[#D94E4E] text-white px-4 py-2 rounded-t-xl rounded-bl-xl shadow-lg text-sm md:text-base"
                                        >
                                            Endless searching
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 1.2,
                                            }}
                                            viewport={{ once: true }}
                                            className="absolute bottom-10 right-5 bg-[#D94E4E] text-white px-4 py-2 rounded-t-xl rounded-bl-xl shadow-lg text-sm md:text-base"
                                        >
                                            Irrelevant listings
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="w-full lg:hidden flex justify-center items-center">
                            <Divider
                                align="center"
                                layout="vertical"
                                type="dashed"
                                className="h-40 border-[#DF6789]"
                                pt={{
                                    content: {
                                        className: "bg-transparent",
                                    },
                                }}
                            >
                                <div
                                    className={twMerge(
                                        "flex h-[60px] w-[60px] rounded-full items-center justify-center",
                                        categorySectionIsInView
                                            ? "bg-[#DF6789] [&>svg]:fill-white"
                                            : "bg-[#FFF1F5] [&>svg]:fill-[#DF6789]"
                                    )}
                                >
                                    <DataIcon />
                                </div>
                            </Divider>
                        </div>

                        <div className="relative hidden lg:flex items-center h-full">
                            <Divider
                                align="center"
                                layout="vertical"
                                type="dashed"
                                className="absolute top-0 bottom-0 h-130 mt-20 "
                            >
                                <div
                                    className={twMerge(
                                        "flex h-[60px] w-[60px] rounded-full items-center justify-center transition-colors duration-300 ease-in-out",
                                        categorySectionIsInView
                                            ? "bg-[#DF6789] [&>svg]:fill-white"
                                            : "bg-[#FFF1F5] [&>svg]:fill-[#DF6789]"
                                    )}
                                >
                                    <DataIcon />
                                </div>
                            </Divider>
                        </div>

                        <div className="flex flex-col gap-6 md:gap-10 items-end p-3 md:p-6 rounded-lg w-full flex-1 overflow-hidden">
                            <h4 className="text-lg md:text-xl font-bold md:font-medium text-end text-gray-800 w-full md:w-2/3">
                                <span className="text-xl md:text-2xl text-[#DF6789]">
                                    Pick Your Category
                                </span>{" "}
                                - Get jobs tailored to your skills & interests
                            </h4>

                            <div className="relative lg:grid lg:grid-cols-2 gap-4 w-full h-full p-3 rounded-3xl border border-[#DF6789] overflow-hidden">
                                <div className="relative flex justify-center items-center mb-2 md:mb-0">
                                    <motion.img
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                        }}
                                        viewport={{ once: true }}
                                        src={FullStackDeveloper}
                                        alt="Full Stack Developer"
                                        className="w-full h-full object-contain"
                                    />

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.5,
                                        }}
                                        className="absolute left-5 lg:left-2 top-1/2 -translate-y-1/2 lg:top-3/4 bg-[#FFF1F5] text-[#DF6789] border-2 border-[#DF6789] px-4 py-2 rounded-lg text-sm md:text-base"
                                    >
                                        Software Development
                                    </motion.div>
                                </div>

                                <div className="relative flex justify-center items-center mb-2 md:mb-0">
                                    <motion.img
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.5,
                                        }}
                                        viewport={{ once: true }}
                                        src={UiDesigner}
                                        alt="UI Designer"
                                        className="w-full h-full object-contain"
                                    />

                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.8,
                                        }}
                                        className="absolute right-5 lg:right-2 top-1/2 -translate-y-1/2 lg:-bottom-10 lg:top-auto bg-[#FFF1F5] text-[#DF6789] border-2 border-[#DF6789] px-4 py-2 rounded-lg text-sm md:text-base"
                                    >
                                        UI UX Design
                                    </motion.div>
                                </div>
                                <div className="relative flex col-span-2 justify-center items-center mb-2 md:mb-0">
                                    <motion.img
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 1,
                                        }}
                                        viewport={{ once: true }}
                                        src={AppDeveloper}
                                        alt="App Developer"
                                        className="w-full lg:w-1/2 h-full object-contain"
                                    />

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 1.1,
                                        }}
                                        className="absolute left-5 top-1/2 -translate-y-1/2 bg-[#FFF1F5] text-[#DF6789] border-2 border-[#DF6789] px-4 py-2 rounded-lg text-sm md:text-base"
                                    >
                                        App Developer
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second Comparison Section */}
                    <div
                        ref={proveTalentSectionRef}
                        className="lg:h-screen lg:sticky top-0 bg-white flex flex-col md:flex-col lg:flex-row items-center gap-6 md:gap-10 w-full overflow-hidden mt-20 lg:mt-0"
                    >
                        <div className="flex flex-col gap-6 md:gap-10 p-4 md:p-6 rounded-lg w-full md:w-full lg:w-1/2 flex-1 min-h-0">
                            <h4 className="text-lg md:text-xl font-bold md:font-medium text-[#343434] md:w-2/3">
                                Getting Ignored by Employers? No response, no
                                feedback
                            </h4>

                            <div className="rounded-3xl bg-white border border-gray-200 flex-1">
                                <div className="min-w-full inline-block align-middle cursor-pointer">
                                    <div className="mx-auto p-4 bg-white rounded-3xl relative">
                                        <div className="space-y-3">
                                            {[
                                                {
                                                    name: "Rahul Sharma",
                                                    role: "Flutter Developer",
                                                    bg: "bg-gray-100",
                                                    img: Rahul,
                                                },
                                                {
                                                    name: "Mac Johnson",
                                                    role: "Sr. UI UX Designer",
                                                    bg: "bg-red-100",
                                                    img: Mac,
                                                },
                                                {
                                                    name: "Jessica Modi",
                                                    role: "Jr. UI UX Designer",
                                                    bg: "bg-gray-100",
                                                    img: Jesica,
                                                },
                                            ].map((profile, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{
                                                        opacity: 0,
                                                        y: -20,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: index * 0.2,
                                                        staggerChildren: 0.2,
                                                        ease: "easeInOut",
                                                        type: "tween",
                                                    }}
                                                    viewport={{ once: true }}
                                                    className={`flex flex-col justify-between items-start p-5 ${profile.bg} rounded-lg`}
                                                >
                                                    <div className="flex items-center w-full space-x-3">
                                                        <img
                                                            src={profile.img}
                                                            className="w-10 h-10 rounded-full"
                                                            alt="Profile"
                                                        />
                                                        <div className="flex items-center justify-between w-full">
                                                            <h4 className="font-semibold text-gray-800">
                                                                {profile.name}
                                                            </h4>
                                                            <span className="text-xs bg-white px-2 py-1 rounded-lg">
                                                                20 May, 2023
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-500">
                                                        {profile.role}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                delay: 0.8,
                                            }}
                                            viewport={{ once: true }}
                                            className="absolute flex items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-4 w-[90%] md:w-75 p-4 backdrop-blur border border-[#D94E4E] rounded-lg shadow-lg text-center overflow-hidden"
                                        >
                                            <div className="mx-auto">
                                                <ProfileOverlook />
                                            </div>
                                            <motion.p
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: 1,
                                                }}
                                                viewport={{ once: true }}
                                                className="text-[#D94E4E] font-semibold text-sm"
                                            >
                                                Your top profile is getting
                                                overlooked by recruiters.
                                            </motion.p>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:hidden flex justify-center items-center">
                            <Divider
                                align="center"
                                layout="vertical"
                                type="dashed"
                                className="h-40 border-[#DF6789]"
                                pt={{
                                    content: {
                                        className: "bg-transparent",
                                    },
                                }}
                            >
                                <div
                                    className={twMerge(
                                        "flex h-[60px] w-[60px] rounded-full items-center justify-center",
                                        proveTalentSectionIsInView
                                            ? "bg-[#DF6789] [&>svg]:fill-white"
                                            : "bg-[#FFF1F5] [&>svg]:fill-[#DF6789]"
                                    )}
                                >
                                    <InfoCheckIcon />
                                </div>
                            </Divider>
                        </div>

                        <div className="relative hidden lg:flex items-center h-full">
                            <Divider
                                align="center"
                                layout="vertical"
                                type="dashed"
                                className="absolute top-0 bottom-0 h-130 border-[#DF6789]"
                            >
                                <div
                                    className={twMerge(
                                        "flex h-[60px] w-[60px] rounded-full items-center justify-center",
                                        proveTalentSectionIsInView
                                            ? "bg-[#DF6789] [&>svg]:fill-white"
                                            : "bg-[#FFF1F5] [&>svg]:fill-[#DF6789]"
                                    )}
                                >
                                    <InfoCheckIcon />
                                </div>
                            </Divider>
                        </div>

                        <div className="flex flex-col gap-6 md:gap-10 items-end p-4 md:p-6 rounded-lg w-full lg:w-1/2 flex-1 min-h-0">
                            <h4 className="text-lg md:text-xl font-bold md:font-medium text-end text-gray-800 w-full md:w-2/3">
                                <span className="text-[#DF6789]">
                                    Prove Your Talent
                                </span>{" "}
                                - with AI Tests & Get Noticed!
                            </h4>

                            <div className="rounded-3xl bg-white border border-[#DF6789] flex-1 w-full">
                                <div className="relative overflow-hidden p-6 min-w-full inline-block align-middle cursor-pointer">
                                    <div className="flex h-60 md:h-77">
                                        <motion.img
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                            }}
                                            viewport={{ once: true }}
                                            src={CandidateTest}
                                            alt="Test Image"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.8,
                                        }}
                                        viewport={{ once: true }}
                                        className="absolute left-5 top-5 bg-white text-black px-4 py-2 rounded-t-xl rounded-bl-xl shadow-md"
                                    >
                                        Preassessment Test
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.8,
                                        }}
                                        viewport={{ once: true }}
                                        className="absolute -right-8 -top-6 rotate-5  text-black px-4 py-2 rounded-xl"
                                    >
                                        <HeadScore width={"220"} />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.8,
                                        }}
                                        viewport={{ once: true }}
                                        className="absolute right-5 bottom-4 bg-white text-black px-4 py-2 rounded-t-xl rounded-br-xl shadow-md"
                                    >
                                        Skill Test
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Third Comparison Section */}
                    <div
                        ref={directCommunicationSectionRef}
                        className="lg:h-screen lg:sticky top-0 bg-[#DF6789]/5 md:bg-white flex flex-col lg:flex-row items-center lg:gap-10 w-full mt-20 lg:mt-0"
                    >
                        <div className="flex flex-col gap-6 p-6 rounded-lg w-full lg:w-1/2 flex-1 min-h-0">
                            <h4 className="text-lg md:text-xl font-bold md:font-medium text-[#343434] w-full lg:w-2/3">
                                No Direct Communication – Waiting for Emails, No
                                Updates
                            </h4>

                            <div className="overflow-hidden rounded-3xl bg-white border border-gray-200 flex-1">
                                <div className="min-w-full inline-block align-middle cursor-pointer h-full">
                                    <div className="mx-auto p-4 bg-white rounded-2xl relative">
                                        <div className="relative flex-1 max-w-xs md:max-w-md mx-auto">
                                            <motion.img
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.5,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    duration: 0.5,
                                                }}
                                                viewport={{ once: true }}
                                                src={CandidateChatBlure}
                                                alt="No Communication"
                                                className="w-full h-auto object-cover"
                                            />

                                            {/* Overlay Components */}
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.5,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: 0.8,
                                                }}
                                                viewport={{ once: true }}
                                                className="absolute flex items-center inset-0 justify-center"
                                            >
                                                <Mailing />
                                            </motion.div>
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.5,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                transition={{
                                                    duration: 0.5,
                                                    delay: 0.8,
                                                }}
                                                viewport={{ once: true }}
                                                className="absolute flex items-center inset-0 justify-center"
                                            >
                                                <NoMessage />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:hidden flex justify-center items-center">
                            <Divider
                                align="center"
                                layout="vertical"
                                type="dashed"
                                className="h-40 border-[#DF6789]"
                                pt={{
                                    content: {
                                        className: "bg-transparent",
                                    },
                                }}
                            >
                                <div
                                    className={twMerge(
                                        "flex h-[60px] w-[60px] rounded-full items-center justify-center",
                                        directCommunicationSectionIsInView
                                            ? "bg-[#DF6789] [&>svg]:fill-white"
                                            : "bg-[#FFF1F5] [&>svg]:fill-[#DF6789]"
                                    )}
                                >
                                    <MessageIcon />
                                </div>
                            </Divider>
                        </div>

                        <div className="relative hidden lg:flex items-center h-full">
                            <Divider
                                align="center"
                                layout="vertical"
                                type="dashed"
                                className="absolute top-0 bottom-0 h-130 border-[#DF6789]"
                            >
                                <div
                                    className={twMerge(
                                        "flex h-[60px] w-[60px] rounded-full items-center justify-center",
                                        directCommunicationSectionIsInView
                                            ? "bg-[#DF6789] [&>svg]:fill-white"
                                            : "bg-[#FFF1F5] [&>svg]:fill-[#DF6789]"
                                    )}
                                >
                                    <MessageIcon />
                                </div>
                            </Divider>
                        </div>

                        <div className="flex flex-col gap-6 items-end p-6 rounded-lg w-full lg:w-1/2 flex-1 min-h-0">
                            <h4 className="text-lg md:text-xl font-bold md:font-medium text-end text-gray-800 w-full lg:w-2/3">
                                <span className="text-[#DF6789]">
                                    Direct Communication with Companies
                                </span>{" "}
                                – Chat & Connect Instantly
                            </h4>

                            <div className="rounded-3xl bg-white border border-[#DF6789] flex-1 w-full h-auto">
                                <div className="relative p-3 min-w-full inline-block align-middle cursor-pointer">
                                    <div className="flex-1 max-w-xs md:max-w-md mx-auto">
                                        <motion.img
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{
                                                opacity: 1,
                                                scale: 1,
                                            }}
                                            transition={{ duration: 0.5 }}
                                            viewport={{ once: true }}
                                            src={CandidateChat}
                                            alt="Direct Chat"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.5,
                                        }}
                                        viewport={{ once: true }}
                                        className="absolute top-5 left-5 flex items-center gap-5 shadow-2xl bg-white px-5 py-3 rounded-xl"
                                    >
                                        <div className="w-fit">
                                            <CandidateRecruiter />
                                        </div>
                                        <p className="text-lg font-semibold">
                                            Recruiter
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.5,
                                        }}
                                        viewport={{ once: true }}
                                        className="absolute right-5 bottom-5 flex items-center gap-5 shadow-2xl bg-white px-5 py-3 rounded-xl"
                                    >
                                        <div className="w-fit">
                                            <CandidateIcon />
                                        </div>
                                        <p className="text-lg font-semibold">
                                            Candidate
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search job section */}
            <section className="px-6 md:px-12 lg:px-15 h-fit mb-10 mt-15 overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center gap-10">
                    <div className="flex flex-col w-full lg:w-1/2 gap-6 text-center items-center md:items-start lg:text-left">
                        <h3 className="text-3xl md:text-5xl font-extrabold text-[#343434]">
                            Supercharge Your&nbsp;
                            <span className="text-[#DF6789]">Job</span>
                            &nbsp; Search Today!
                        </h3>
                        <p className="text-base md:text-lg font-semibold">
                            Get matched with the right jobs, showcase your
                            talent, and connect instantly. No ghosting. No
                            wasted time.
                        </p>

                        <button
                            className="w-fit flex items-center gap-5 py-3 px-5 border text-[#DF6789] border-[#DF6789] bg-white rounded-[15px] font-semibold hover:bg-primary hover:text-white transition-colors duration-300 ease-in-out"
                            onClick={() => navigate(LOGIN)}
                        >
                            Try HeadsIn Now
                            <i className="pi pi-arrow-right"></i>
                        </button>
                    </div>

                    <div className="relative w-full lg:w-1/2 flex items-center justify-center">
                        <div className=" absolute h-150 w-250 bg-[radial-gradient(closest-side,theme(colors.rose.100),transparent)] opacity-50 -bottom-40 right-0"></div>
                        {/* <div className='hidden md:block absolute h-70 w-70 bg-[radial-gradient(closest-side,theme(colors.rose.100),transparent)] -bottom-30 right-0'></div> */}

                        <div className="relative flex flex-col items-start h-fit w-full py-5">
                            <div className="flex z-10 items-center gap-4 lg:ms-20">
                                <div className="flex items-center justify-center w-20 h-20  md:w-25 md:h-25 lg:w-30 lg:h-30 bg-white rounded-full shadow-md">
                                    <span className="text-[#DF6789] font-extrabold text-xk md:text-2xl lg:text-3xl">
                                        <TextCounter
                                            from={0}
                                            to={4}
                                            animationOptions={{ duration: 0.8 }}
                                        />
                                        X
                                    </span>
                                </div>
                                <motion.p
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    viewport={{ once: true }}
                                    className="text-sm md:text-xl text-gray-800"
                                >
                                    Faster Job Matches
                                </motion.p>
                            </div>

                            <div className="absolute -left-20 md:left-0 -bottom-8 md:bottom-0">
                                <ReverseArrow />
                            </div>

                            <div className="flex z-10 items-center gap-4 mt-16 ms-25 md:ms-45">
                                <div className="flex items-center justify-center shrink-0 w-20 h-20  md:w-25 md:h-25 lg:w-30 lg:h-30 bg-white rounded-full shadow-md">
                                    <span className="text-[#DF6789] font-extrabold text-xk md:text-2xl lg:text-3xl">
                                        <TextCounter
                                            from={0}
                                            to={70}
                                            animationOptions={{ duration: 0.8 }}
                                        />
                                        %
                                    </span>
                                </div>
                                <motion.p
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    viewport={{ once: true }}
                                    className="text-sm md:text-xl text-gray-800"
                                >
                                    Higher Response Rate
                                </motion.p>
                            </div>

                            <div className="absolute rotate-180 -right-20 md:right-8 bottom-10">
                                <ReverseArrow />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Candidate;
