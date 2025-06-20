import {
    AiPowered,
    AiPoweredBlure,
    Communication,
    DavidHeadscore,
    JessicaHeadscore,
    MacHeadscore,
    MacShortlist,
    MichelShortlist,
    NavinHeadscore,
    PritiHeadscore,
} from "@/assets/images";
import AiEnhance from "@/assets/svg/landingPage/AiEnhance";
import Check from "@/assets/svg/landingPage/Check";
import AiCandidateMatching from "@/assets/svg/landingPage/Company/AiCandidateMatching";
import BigStar from "@/assets/svg/landingPage/Company/BigStar";
import Hiring from "@/assets/svg/landingPage/Company/Hiring";
import Message from "@/assets/svg/landingPage/Company/Message";
import ThreeStar from "@/assets/svg/landingPage/Company/ThreeStar";
import HeadScore from "@/assets/svg/landingPage/HeadScore";
import Star from "@/assets/svg/preassessment-modal/Star";
import { TextCounter } from "@/components/animated/TextCounter";
import { TextFade } from "@/components/animated/TextFade";
import MetaGenerator from "@/components/MetaGenerator";
import { motion } from "framer-motion";
import PreAssesmentArrow from "./PreAssesmentArrow";

const Company = () => {
    const openCompanyUrl = () => {
        const companyUrl = import.meta.env.VITE_COMPANY_URL;
        window.location.href = companyUrl;
    };

    return (
        <div>
            <MetaGenerator
                title="HeadsIn | Company"
                description="Hire pre-assessed, role-fit talent faster."
                canonicalUrl="https://www.headsin.co/company"
            />
            {/* Hero Section */}
            <section className="flex items-center overflow-hidden justify-center w-full lg:h-screen bg-[radial-gradient(closest-side,theme(colors.purple.100),transparent)]">
                <div className="relative flex flex-col w-full items-center justify-center gap-8 text-center p-4">
                    <motion.div
                        initial={{ opacity: 0, rotate: 120, scale: 0 }}
                        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="hidden lg:block absolute bottom-100 right-1/6"
                    >
                        <BigStar />
                    </motion.div>

                    <TextFade className="w-full md:w-3/4">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight px-0 md:px-0 text-pretty font-extrabold text-[#343434]">
                            Source and Hire
                            <br />{" "}
                            <span className="text-[#3F1562]">
                                Pre-vetted
                            </span>{" "}
                            Talent With Ease!
                        </h1>
                    </TextFade>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="text-sm md:text-lg lg:text-xl px-3 md:px-3 lg:px-0 font-medium "
                    >
                        Hire from India’s First Role-specific Pre-assessed
                        Talent Pool.
                    </motion.p>

                    <button
                        type="button"
                        onClick={openCompanyUrl}
                        className="w-fit flex items-center gap-5 whitespace-nowrap py-4 px-3 md:mt-20 md:py-3 md:px-5 border bg-white text-[#3F1562] border-[#3F1562] bg-transperant rounded-[15px] font-semibold hover:bg-[#3F1562] hover:text-white transition-colors duration-300 ease-in-out"
                    >
                        Join Us Today
                        <i className="pi pi-arrow-right"></i>
                    </button>

                    <div className="block md:hidden">
                        <motion.div
                            initial={{ opacity: 0, x: -30, y: 30 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="lg:absolute top-[290px] left-30"
                        >
                            <img
                                src={JessicaHeadscore}
                                alt="Jessica Score"
                                className="w-full h-auto"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30, y: 30 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="lg:absolute top-[220px] right-30"
                        >
                            <img
                                src={MacHeadscore}
                                alt="Mac Score"
                                className="w-full h-auto"
                            />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: -30, y: 30 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="hidden md:block absolute bottom-[-80px] left-30"
                    >
                        <img
                            src={JessicaHeadscore}
                            alt="Jessica Score"
                            className="h-50"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30, y: 30 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="hidden md:block absolute bottom-[-80px] right-30"
                    >
                        <img
                            src={MacHeadscore}
                            alt="Mac Score"
                            className="h-50"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Detail Section */}
            <section className="flex flex-col ">
                {/* Ai-Powered Job */}
                <div className="sticky top-0 bg-white flex-col lg:flex lg:flex-row w-full h-auto lg:h-screen lg:items-center lg:justify-center overflow-hidden">
                    <div className="flex flex-col items-start lg:justify-center gap-5 md:gap-7 lg:gap-10 w-full lg:w-1/2 h-fit lg:h-full py-15 px-4 md:px-10 lg:py-30 lg:px-20">
                        <div className="flex md:flex-col items-center md:items-start justify-start gap-5 md:gap-7 lg:gap-10">
                            <div>
                                <ThreeStar />
                            </div>
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true, amount: 1 }}
                                className="text-2xl md:text-3xl lg:text-5xl leading tight w-2/3  font-extrabold text-[#343434]"
                            >
                                AI-Powered Job{" "}
                                <span className="text-[#3F1562]">Posting</span>
                            </motion.h3>
                        </div>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            viewport={{ once: true }}
                            className="text-sm/5 md:text-lg/10 lg:text-2xl/10 font-medium text-[#343434]"
                        >
                            Post jobs effortlessly with AI-driven suggestions
                            that optimize descriptions, requirements, and
                            qualifications—ensuring you attract the best talent
                            in seconds.
                        </motion.p>
                    </div>

                    {/* large screen  */}
                    <div className="hidden md:block relative w-1/2 h-full py-30 px-20">
                        <img
                            src={AiPoweredBlure}
                            alt="Ai Powered Job"
                            className="absolute top-1/4 right-50 w-120"
                        />

                        <motion.img
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            src={AiPowered}
                            alt=""
                            className="absolute top-35 right-5 w-120"
                        />

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="absolute rotate-347 top-60 left-15"
                        >
                            <AiEnhance height="260" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="absolute top-30 right-15"
                        >
                            <Star width="70" />
                        </motion.div>
                    </div>

                    {/* small screeen  */}
                    <div className="md:hidden relative w-full h-full py-30 px-20">
                        <img
                            src={AiPoweredBlure}
                            alt="Ai Powered Job"
                            className="absolute w-90 top-8 right-3"
                        />

                        <motion.img
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            src={AiPowered}
                            alt=""
                            className="absolute w-70 top-0 right-4"
                        />

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="absolute rotate-347 top-15 -left-10"
                        >
                            <AiEnhance height="150" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="absolute top-0 right-0"
                        >
                            <Star width="60" />
                        </motion.div>
                    </div>
                </div>

                {/* Ai-candidate matching */}
                <div className="sticky top-0 bg-white flex-col lg:flex lg:flex-row w-full h-auto lg:h-screen overflow-hidden lg:items-center lg:justify-center">
                    <div className="flex flex-col items-start lg:justify-center gap-5 md:gap-7 lg:gap-10 w-full lg:w-1/2 h-fit lg:h-full py-15 px-4 md:px-10 lg:py-30 lg:px-20">
                        <div className="flex md:flex-col items-center md:items-start justify-start gap-5 md:gap-7 lg:gap-10">
                            <div>
                                <AiCandidateMatching />
                            </div>
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-2xl md:text-3xl lg:text-5xl leading tight w-2/3  font-extrabold text-[#343434]"
                            >
                                AI Candidate{" "}
                                <span className="text-[#3F1562]">Matching</span>
                            </motion.h3>
                        </div>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-sm/5 md:text-lg/10 lg:text-2xl/10 font-medium text-[#343434]"
                        >
                            Instantly find the best candidates for your job
                            role.
                        </motion.p>
                    </div>

                    {/* large screen  */}
                    <div className="hidden md:block relative w-1/2 h-full py-30 px-20">
                        <div className="absolute top-65 left-30 h-50 w-125 border-2 rounded-2xl border-[#F5E9FF]"></div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="absolute bottom-55 left-27"
                        >
                            <Star width="50" />
                        </motion.div>

                        <motion.img
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            src={MacShortlist}
                            alt=""
                            className="absolute top-1/4 left-10 w-130"
                        />

                        <motion.img
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            viewport={{ once: true }}
                            src={MichelShortlist}
                            alt=""
                            className="absolute top-70 left-40 w-140"
                        />

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            viewport={{ once: true }}
                            className="absolute rotate-5 top-1/5 right-0"
                        >
                            <HeadScore height="260" />
                        </motion.div>
                    </div>

                    {/* small screeen  */}
                    <div className="md:hidden relative w-full h-full py-30 px-20">
                        <div className="absolute top-3 left-7 h-50 w-90 border-2 rounded-2xl border-[#F5E9FF]"></div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="absolute top-0 right-0"
                        >
                            <Star width="50" />
                        </motion.div>

                        <motion.img
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            viewport={{ once: true }}
                            src={MacShortlist}
                            alt=""
                            className="absolute top-1 left-3 w-80"
                        />

                        <img
                            src={MichelShortlist}
                            alt="MichelShortlist"
                            className="absolute top-20 right-0 w-80"
                        />
                    </div>
                </div>

                {/* Seamless Messaging */}
                <div className="sticky top-0 bg-white flex-col lg:flex lg:flex-row w-full h-auto lg:h-screen overflow-hidden lg:items-center lg:justify-center">
                    <div className="flex flex-col items-start lg:justify-center gap-5 md:gap-7 lg:gap-10 w-full lg:w-1/2 h-fit lg:h-full py-15 px-4 md:px-10 lg:py-30 lg:px-20">
                        <div className="flex md:flex-col items-center md:items-start justify-start gap-5 md:gap-7 lg:gap-10">
                            <div>
                                <Message />
                            </div>
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-2xl md:text-3xl lg:text-5xl leading tight w-2/3  font-extrabold text-[#343434]"
                            >
                                Seamless{" "}
                                <span className="text-[#3F1562]">
                                    Communication
                                </span>
                            </motion.h3>
                        </div>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="text-sm/5 md:text-lg/10 lg:text-2xl/10 font-medium text-[#343434]"
                        >
                            Chat, schedule interviews & hire faster.
                        </motion.p>
                    </div>

                    {/* large  */}
                    <div className="hidden md:block relative items-center justify-center w-1/2 h-full py-30 px-20 bg-[radial-gradient(closest-side,theme(colors.purple.100),transparent)]">
                        <motion.img
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            src={Communication}
                            alt=""
                            className="h-100"
                        />
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="absolute items-center left-0 top-1/3   bg-[#FAF4FF] text-black text-xl border-2 border-[#D199FF] px-7 py-4 rounded-t-xl rounded-br-xl "
                        >
                            Yes, I'm Intrested
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            viewport={{ once: true }}
                            className="absolute items-center bottom-1/3 bg-gradient-to-r from-[#3F1562] via-[#3F1562] to-[#7933B4] text-xl text-white px-7 py-4 rounded-t-xl rounded-l-xl"
                        >
                            Hi Mac, Interested in Senior UI UX Designer
                        </motion.div>
                    </div>

                    {/* small  */}
                    <div className="md:hidden relative items-center justify-center w-full overflow-hidden  py-30 px-20 bg-[radial-gradient(closest-side,theme(colors.purple.100),transparent)]">
                        <img
                            src={Communication}
                            alt="Communication"
                            className="absolute w-full px-4 left-0 top-0"
                        />
                        <div className="absolute items-center left-3 top-1/3   bg-[#FAF4FF] text-black text-sm border-2 border-[#D199FF] px-3 py-2 rounded-t-xl rounded-br-xl ">
                            Yes, I'm Intrested
                        </div>
                        <div className="absolute items-center right-3 bottom-1 bg-gradient-to-r from-[#3F1562] via-[#3F1562] to-[#7933B4] text-sm text-white px-3 py-2 rounded-t-xl rounded-l-xl">
                            Hi Mac, Interested in Senior UI UX Designer
                        </div>
                    </div>
                </div>

                {/* Smart Hiring  */}
                <div className="sticky top-0 bg-white flex-col lg:flex lg:flex-row w-full h-screen overflow-hidden lg:items-center lg:justify-center">
                    <div className="flex flex-col items-start lg:justify-center gap-5 md:gap-7 lg:gap-10 w-full lg:w-1/2 h-fit lg:h-full py-15 px-4 md:px-10 lg:py-30 lg:px-20">
                        <div className="flex md:flex-col items-center md:items-start justify-start gap-5 md:gap-7 lg:gap-10">
                            <div>
                                <Hiring />
                            </div>
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-2xl md:text-3xl lg:text-5xl leading tight w-2/3  font-extrabold text-[#343434]"
                            >
                                Smart{" "}
                                <span className="text-[#3F1562]">Hiring</span>,
                                Instant Results
                            </motion.h3>
                        </div>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="text-sm/5 md:text-lg/10 lg:text-2xl/10 font-medium text-[#343434]"
                        >
                            Faster hiring with real-time insights.
                        </motion.p>
                    </div>

                    {/* large  */}
                    <div className="hidden md:block relative items-center justify-center w-1/2 h-full py-30 px-20 bg-[radial-gradient(closest-side,theme(colors.purple.100),transparent)]">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            src={DavidHeadscore}
                            alt=""
                            className="absolute top-1/4 left-0 w-130"
                        />

                        <motion.img
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            src={PritiHeadscore}
                            alt=""
                            className="absolute bottom-1/5 right-20 w-100"
                        />

                        <motion.img
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                            src={NavinHeadscore}
                            alt=""
                            className="absolute h-50 top-2/6"
                        />

                        <div className="absolute left-1/9 bottom-1/3 flex border border-white rounded-2xl p-2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                viewport={{ once: true }}
                                className="flex justify-between gap-5 items-center px-8 py-3 rounded-xl bg-white"
                            >
                                <Check color="#3F1562" />
                                <p className="text-[#3F1562] text-xl font-semibold">
                                    ShortList
                                </p>
                            </motion.div>
                        </div>

                        <div className="absolute right-1/9 top-1/3 flex border border-white rounded-2xl p-2">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                viewport={{ once: true }}
                                className="flex justify-between gap-5 items-center px-8 py-3 rounded-xl bg-white"
                            >
                                <Check color="#3F1562" />
                                <p className="text-[#3F1562] text-2xl font-semibold">
                                    Accepted
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* small */}
                    <div className="md:hidden relative items-center justify-center w-full h-full md:py-30 md:px-20 bg-[radial-gradient(closest-side,theme(colors.purple.100),transparent)]">
                        <motion.img
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            src={DavidHeadscore}
                            alt=""
                            className="absolute top-0 left-4 w-full"
                        />

                        <motion.img
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            src={PritiHeadscore}
                            alt=""
                            className="absolute top-50 right-4 w-full"
                        />

                        <motion.img
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                            src={NavinHeadscore}
                            alt=""
                            className="absolute w-full top-20 left-5"
                        />

                        <div className="absolute left-0 top-80 flex border border-white rounded-2xl p-2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                viewport={{ once: true }}
                                className="flex justify-between gap-5 items-center px-8 py-3 rounded-xl bg-white"
                            >
                                <Check color="#3F1562" />
                                <p className="text-[#3F1562] text-sm font-semibold">
                                    ShortList
                                </p>
                            </motion.div>
                        </div>

                        <div className="absolute right-0 top-70 flex border border-white rounded-2xl p-2">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                viewport={{ once: true }}
                                className="flex justify-between gap-5 items-center px-8 py-3 rounded-xl bg-white"
                            >
                                <Check color="#3F1562" />
                                <p className="text-[#3F1562] text-sm font-semibold">
                                    Accepted
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Match Telent */}
            <section className="px-4 md:px-9 lg:px-13 mb-10 overflow-hidden">
                <div className="flex-col md:flex-col lg:flex lg:flex-row bg-[#F4E7FF] rounded-3xl  ">
                    <div className="flex flex-col w-full lg:w-1/2 gap-10 md:gap-15 justify-center ps-5 py-10 md:ps-10 md:py-20">
                        <h4 className="text-2xl md:text-3xl lg:text-5xl leading tight text-[#343434] font-extrabold  text-pretty">
                            Match <span className="text-[#3F1562]">Talent</span>{" "}
                            with the right role in just 45 seconds
                        </h4>
                        <p className="text-sm/5 md:text-lg/10 font-semibold">
                            Start hiring with us today!
                        </p>

                        <button
                            type="button"
                            onClick={openCompanyUrl}
                            className="w-fit flex items-center gap-5 whitespace-nowrap py-4 px-3 md:py-3 md:px-5 border text-[#3F1562] border-[#E1BEFF] bg-[#F4E7FF] rounded-[15px] font-semibold"
                        >
                            Try HeadsIn now!
                            <i className="pi pi-arrow-right"></i>
                        </button>
                    </div>

                    <div className="relative flex items-center w-full lg:w-1/2 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:130px_130px]">
                        <div className="absolute flex items-center gap-10 top-50 right-20">
                            <div className="flex items-center justify-center w-30 h-30 bg-white rounded-full shadow-md">
                                <span className="text-[#3F1562] font-extrabold text-4xl">
                                    <TextCounter
                                        from={0}
                                        to={12}
                                        animationOptions={{ duration: 0.8 }}
                                    />
                                    X
                                </span>
                            </div>
                            <p className="text-3xl font-medium text-[#3F1562] mt-2 whitespace-nowrap">
                                Faster Than Before
                            </p>
                        </div>

                        <div className="absolute right-150 top-15 rotate-310 ">
                            <PreAssesmentArrow width="130" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Company;
