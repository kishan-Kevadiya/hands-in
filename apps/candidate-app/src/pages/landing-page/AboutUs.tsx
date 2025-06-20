import {
    AboutusHero,
    Client1,
    Client2,
    Client3,
    Client4,
} from "@/assets/images";
import AboutUsArrow from "@/assets/svg/landingPage/AboutUs/AboutUsArrow";
import Fairnessicon from "@/assets/svg/landingPage/AboutUs/Fairnessicon";
import GoalArchive from "@/assets/svg/landingPage/AboutUs/GoalArchive";
import Growth from "@/assets/svg/landingPage/AboutUs/Growth";
import GrowthIcon from "@/assets/svg/landingPage/AboutUs/GrowthIcon";
import InnovationIcon from "@/assets/svg/landingPage/AboutUs/InnovationIcon";
import TransparancyIcon from "@/assets/svg/landingPage/AboutUs/TransparancyIcon";
import Linkdin from "@/assets/svg/landingPage/SocialMedia/Linkdin";
import { TextCounter } from "@/components/animated/TextCounter";
import { TextFade } from "@/components/animated/TextFade";
import MetaGenerator from "@/components/MetaGenerator";
import {
    Accordion,
    AccordionHeader,
    AccordionItem,
    AccordionPanel,
} from "@/components/ui/accordion/Accordion";
import { FAQs } from "@/helpers/constants";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
        {
            "@type": "Question",
            name: "What is HeadsIn and how is it different from other platforms?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "HeadsIn is a smart, AI-powered hiring platform built for today's workforce. Unlike traditional job portals, we focus on true-fit matchmaking—connecting the right talent to the right roles, faster. With pre-assessments, live application tracking, and private communication, we make hiring smarter and job-hunting simpler.",
            },
        },
        {
            "@type": "Question",
            name: "Is HeadsIn free to use?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! 🎉 HeadsIn is currently 100% free for both candidates and recruiters during our launch phase. No hidden fees. No surprises.",
            },
        },
        {
            "@type": "Question",
            name: "What makes HeadsIn better than traditional job portals?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Smart AI matching (not keyword dumping)\n240 seconds assessments for real candidate quality\nLive application/job status tracking\nPrivacy-first in-app chat\nBuilt for modern hiring, not just listing jobs",
            },
        },
    ],
};

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <div>
            <MetaGenerator
                title="HeadsIn | About Us"
                description="Revolutionizing hiring with AI and transparency."
                canonicalUrl="https://headsin.co/about-us"
                keywords={["best job portal in india"]}
                schema={faqSchema}
            />

            {/* Hero Section */}
            <section className="flex items-center justify-center w-100vw h-100vh overflow-hidden">
                <div className="flex flex-col w-full h-full items-center justify-end">
                    <div className="relative flex flex-col w-full  items-center justify-center gap-8 text-center  overflow-hidden">
                        <div className="relative w-full">
                            <div className="absolute inset-0 -z-1 h-120 w-150 bg-[radial-gradient(closest-side,theme(colors.rose.100),transparent)] -left-50"></div>
                            <div className="absolute -z-1 h-120 w-150 bg-[radial-gradient(closest-side,theme(colors.purple.100),transparent)] -right-50"></div>
                        </div>

                        <h1 className="w-4/5 md:w-3/4 text-3xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight px-0 md:px-0 font-extrabold text-[#343434]">
                            <span className="bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
                                Revolutionizing &nbsp;
                            </span>
                            the way India Hires and gets
                            <span className="inline-flex items-end justify-center h-10 w-20 md:h-14 md:w-24 lg:h-13 lg:w-32 rounded-full bg-gradient-to-r from-[#F4E7FF] to-[#FFD6E1] mx-2">
                                <motion.img
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.5,
                                        ease: "easeInOut",
                                    }}
                                    src={AboutusHero}
                                    alt="Person Illustration"
                                    className="w-full object-contain"
                                />
                            </span>
                            Hired!
                        </h1>

                        <div className="flex flex-col lg:flex-row items-center px-3 lg:px-0 lg:items-end w-full lg:w-fit justify-center mt-10 lg:mt-0 gap-6">
                            <motion.p
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.5,
                                }}
                                className="text-lg z-10 lg:text-xl text-[#2A2A2A] font-semibold text-center lg:text-start w-full lg:w-1/3"
                            >
                                At HeadsIn, strong values drive us to make your
                                hiring process faster, smarter, and simpler.
                            </motion.p>

                            <div className="w-fit hidden lg:flex ">
                                <AboutUsArrow />
                            </div>

                            <div className="flex flex-col items-center lg:items-end w-fit gap-6 mt-8 md:mt-0 overflow-hidden">
                                <div className="flex -space-x-3">
                                    <img
                                        src={Client4}
                                        alt="Client 4"
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                                    />
                                    <motion.img
                                        initial={{ x: -30 }}
                                        whileInView={{ x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.5,
                                        }}
                                        viewport={{ once: true }}
                                        src={Client3}
                                        alt="Client 3"
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                                    />
                                    <motion.img
                                        initial={{ x: -60 }}
                                        whileInView={{ x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.5,
                                        }}
                                        viewport={{ once: true }}
                                        src={Client2}
                                        alt="Client 2"
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                                    />
                                    <motion.img
                                        initial={{ x: -90 }}
                                        whileInView={{ x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.5,
                                        }}
                                        viewport={{ once: true }}
                                        src={Client1}
                                        alt="Client 1"
                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                                    />
                                    <motion.div
                                        initial={{ x: -120 }}
                                        whileInView={{ x: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.5,
                                        }}
                                        viewport={{ once: true }}
                                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-[#DF6789] text-white text-sm font-semibold"
                                    >
                                        <TextCounter
                                            from={0}
                                            to={145}
                                            animationOptions={{ duration: 0.8 }}
                                        />
                                        +
                                    </motion.div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 text-xl flex items-center justify-center border-2 border-[#FFDCE6] rounded-lg">
                                        <motion.span
                                            initial={{
                                                opacity: 0,
                                                scale: 0,
                                                rotate: 180,
                                            }}
                                            whileInView={{
                                                opacity: 1,
                                                scale: 1,
                                                rotate: 0,
                                            }}
                                            transition={{ duration: 0.5 }}
                                            viewport={{ once: true }}
                                        >
                                            ⭐
                                        </motion.span>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <p className="text-lg font-semibold">
                                            Rating
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Trusted by 150+ Clients
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-10 md:mt-16">
                        <button
                            className="flex items-center gap-3 py-3 px-6 border text-[#DF6789] border-[#DF6789] bg-white rounded-lg font-semibold hover:bg-[#DF6789] hover:text-white transition"
                            onClick={() => navigate("/auth/register")}
                        >
                            Join Us Today
                            <i className="pi pi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </section>

            {/* Detail Section  */}
            <section className="flex w-full px-3 md:px-10 mt-20 min-h-screen my-10 overflow-hidden">
                <div className="flex flex-col w-full items-center gap-15 lg:gap-10">
                    <TextFade className="w-full lg:w-1/2">
                        <h2 className="text-center text-[#343434] text-3xl pt-10 rounded-lg leading-tight lg:text-5xl lg:leading-[1.2]t font-extrabold">
                            <span className="bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
                                Join us &nbsp;
                            </span>
                            in Transforming Hiring & Empowering Careers
                        </h2>
                    </TextFade>

                    <div className="w-full sm:w-4/5 flex flex-col-reverse lg:flex-row items-center justify-center">
                        <div className="w-full lg:w-3/5">
                            <TextFade className="w-full md:w-1/3" delay={0.8}>
                                <div className="text-2xl md:text-3xl font-semibold">
                                    Our Vision
                                </div>
                            </TextFade>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                viewport={{ once: true }}
                                className="flex gap-2 w-full text-lg lg:text-xl leading-10 px-0 sm:px-5 lg:px-0 font-medium pt-4 sm:pt-10"
                            >
                                <div className="hidden sm:block w-10 items-stretch mr-4">
                                    <i className="pi pi-minus"></i>
                                </div>
                                <div className="text-base lg:text-lg">
                                    We envision a world where finding the
                                    perfect job or candidate is effortless. By
                                    combining technology, innovation, and human
                                    potential, we aim to eliminate hiring
                                    barriers, create equal opportunities, and
                                    build a transparent, future-ready job
                                    ecosystem.
                                </div>
                            </motion.div>
                        </div>
                        <div className="w-full md:w-2/5 flex items-center justify-center">
                            <Growth className="w-4/5 md:w-full h-full" />
                        </div>
                    </div>

                    <div className="w-full sm:w-4/5 flex flex-col lg:flex-row items-center justify-center">
                        <div className="w-full md:w-2/5 flex items-center justify-center">
                            <GoalArchive className="w-4/5 md:w-full h-full" />
                        </div>
                        <div className="w-full lg:w-3/5">
                            <TextFade className="w-full md:w-1/3" delay={0.8}>
                                <div className="text-2xl md:text-3xl font-semibold">
                                    Our Mission
                                </div>
                            </TextFade>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                                viewport={{ once: true }}
                                className="flex w-full text-lg md:text-xl leading-10 px-0 sm:px-5 md:px-03 font-medium pt-4 sm:pt-10"
                            >
                                <div className="hidden sm:block w-10 items-stretch mr-4">
                                    <i className="pi pi-minus"></i>
                                </div>
                                <div className="text-lg">
                                    We are on a mission to redefine the hiring
                                    experience by making job searching and
                                    recruitment seamless, efficient, and
                                    AI-driven. Our platform connects top talent
                                    with the right opportunities, ensuring
                                    faster hiring, better matches, and a smarter
                                    job market.
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sparkle Section */}
            <section className="px-0 md:px-13 py-10 w-full overflow-hidden">
                <div className="relative flex items-center flex-col bg-gradient-to-l from-[#FFEEF3] to-[#F5E8FF] rounded-3xl w-full">
                    <TextFade className="w-1/2 md:w-full">
                        <h2 className="text-center text-3xl  md:text-4xl lg:text-5xl xl:text-6xl leading-tight h-fit text-pretty font-extrabold text-[#343434] py-10">
                            The Spark Behind
                            <span className="bg-gradient-to-r from-[#3F1562] to-[#D63384] bg-clip-text text-transparent">
                                &nbsp;HeadsIn
                            </span>
                        </h2>
                    </TextFade>

                    <div className=" flex flex-col bg-white mx-3 md:mx-8 rounded-3xl p-5 md:p-8 gap-6 lg:mb-20">
                        <p className="text-base md:text-lg text-[#DF6789] font-medium">
                            It all started with a frustration—one we saw in our
                            own circles.
                        </p>
                        <p className="text-base md:text-lg text-[#1F1F1F] font-medium">
                            We saw the struggle first-hand. Talented friends and
                            classmates—smart, capable, and holding degrees from
                            top universities—were struggling to land the right
                            jobs. Not because they lacked skills, but because
                            the hiring system was broken. The problem wasn’t
                            talent—it was the process itself.
                        </p>
                        <p className="text-base md:text-lg text-[#1F1F1F] font-medium">
                            Some couldn’t get past outdated filters, others
                            missed out on opportunities due to lack of
                            visibility, and many were stuck in a cycle of
                            endless applications with no response. On the other
                            side, recruiters were equally frustrated—drowning in
                            irrelevant applications, battling fake profiles, and
                            struggling to find truly qualified candidates.
                        </p>
                        <p className="text-base md:text-lg text-[#3F1562] font-medium">
                            That’s why we built HeadsIn
                        </p>
                        <p className="text-base md:text-lg text-[#1F1F1F] font-medium">
                            More than just another job platform, HeadsIn is an
                            AI-powered hiring ecosystem that brings speed,
                            transparency, and accuracy to the recruitment
                            process. We spent months talking to over 200 HR
                            professionals, understanding the gaps, and designing
                            a solution that works for both sides. Candidates get
                            real opportunities. Recruiters get the right talent.
                        </p>

                        <TextFade>
                            <h3 className="text-center md:text-start text-2xl md:text-3xl font-semibold text-black">
                                <span className="bg-gradient-to-r from-[#3F1562] to-[#D63384] bg-clip-text text-transparent">
                                    Join us&nbsp;
                                </span>
                                in shaping the future of work!
                            </h3>
                        </TextFade>
                    </div>

                    <a
                        href="https://www.linkedin.com/in/mannrijiya/"
                        target="_blank"
                        className="hidden lg:flex absolute rotate-355  md:bottom-0 md:right-1/3 lg:bottom-0 lg:right-1/3  bg-white w-fit h-fit gap-20 items-center px-2 py-2 md:px-6 md:py-3 border-4 border-[#FCCEDB]"
                    >
                        <div className="flex w-fit flex-col md:gap-2">
                            <p className="text-sm md:text-xl  font-bold">
                                Mann Rijiya
                            </p>
                            <p className="text-sm md:text-lg font-medium">
                                Co-Founder
                            </p>
                        </div>

                        <div className="flex bg-[#DF6789] p-2 rounded-sm items-center w-fit h-fit">
                            <Linkdin color="#FFFFFF" />
                        </div>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/renish-narola-5229731bb/"
                        target="_blank"
                        className="absolute hidden lg:flex rotate-3 bottom-5 right-20 bg-white w-fit gap-20 items-center  px-2 py-2 md:px-6 md:py-3 border-4 border-[#E7CFFB]"
                    >
                        <div className="flex w-fit flex-col md:gap-2">
                            <p className="text-sm md:text-xl  font-bold">
                                Renish Narola
                            </p>
                            <p className="text-sm md:text-lg font-medium">
                                Co-Founder
                            </p>
                        </div>
                        <div className="bg-[#3F1562] p-2 rounded-sm items-center w-fit h-fit">
                            <Linkdin color="#FFFFFF" />
                        </div>
                    </a>

                    {/* Small Screens */}
                    <div className="lg:hidden w-full flex flex-col items-center justify-start gap-5 py-5">
                        <motion.a
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.5,
                            }}
                            viewport={{ once: true }}
                            href="https://www.linkedin.com/in/mannrijiya/"
                            target="_blank"
                            className="rotate-1 flex bg-white w-fit h-fit gap-20 items-center px-2 py-2 md:px-6 md:py-3 border-4 border-[#FCCEDB]"
                        >
                            <div className="flex w-fit flex-col md:gap-2">
                                <p className="text-sm md:text-xl  font-bold">
                                    Mann Rijiya
                                </p>
                                <p className="text-sm md:text-lg font-medium">
                                    Co-Founder
                                </p>
                            </div>

                            <div className="flex bg-[#DF6789] p-2 rounded-sm items-center w-fit h-fit">
                                <Linkdin color="#FFFFFF" />
                            </div>
                        </motion.a>

                        <motion.a
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.5,
                            }}
                            viewport={{ once: true }}
                            href="https://www.linkedin.com/in/renish-narola-5229731bb/"
                            target="_blank"
                            className="-rotate bg-white gap-20 items-center  px-2 py-2 md:px-6 md:py-3 border-4 border-[#E7CFFB]"
                        >
                            <div className="flex w-fit flex-col md:gap-2">
                                <p className="text-sm md:text-xl  font-bold">
                                    Renish Narola
                                </p>
                                <p className="text-sm md:text-lg font-medium">
                                    Co-Founder
                                </p>
                            </div>
                            <div className="bg-[#3F1562] p-2 rounded-sm items-center w-fit h-fit">
                                <Linkdin color="#FFFFFF" />
                            </div>
                        </motion.a>
                    </div>
                </div>
            </section>

            {/* Value of vision */}
            <section className="px-4 md:px-20 overflow-hidden">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col w-full items-center justify-center gap-5 md:gap-10">
                        <TextFade>
                            <h4 className=" font-extrabold text-3xl w-full md:text-4xl lg:text-5xl leading-tight text-[#343434] text-center pt-10">
                                The
                                <span className="bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
                                    &nbsp;Values&nbsp;
                                </span>
                                That Shape Our Vision
                            </h4>
                        </TextFade>

                        <TextFade className="w-full md:w-1/3" delay={0.8}>
                            <p className="text-sm md:text-lg/8 text-center font-semibold text-[#4E4E4E]">
                                We’re here to change the way people find work
                                and organizations find people.
                            </p>
                        </TextFade>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 w-full overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                            viewport={{ once: true }}
                            className="flex flex-col rounded-2xl gap-3 box-shadow-[0px 0px 2px 2px black]; shadow-inner shadow-[#FFEDF2] "
                        >
                            <div className="flex items-end justify-end">
                                <InnovationIcon />
                            </div>
                            <h5 className="text-2xl text-[#DF6789] font-semibold px-5">
                                Innovation
                            </h5>
                            <p className="text-sm font-medium px-5 pb-5">
                                We leverage AI and cutting-edge technology to
                                revolutionize hiring.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col rounded-2xl gap-3 shadow-inner shadow-[#FFEDF2] "
                        >
                            <div className="flex items-end justify-end">
                                <Fairnessicon />
                            </div>
                            <h5 className="text-2xl text-[#DF6789] font-semibold px-5">
                                Fairness
                            </h5>
                            <p className="text-sm font-medium px-5 pb-5">
                                Equal opportunities for all, regardless of
                                background or location.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.4 }}
                            viewport={{ once: true }}
                            className="flex flex-col rounded-2xl gap-3 shadow-inner shadow-[#FFEDF2] "
                        >
                            <div className="flex items-end justify-end">
                                <TransparancyIcon />
                            </div>
                            <h5 className="text-2xl text-[#DF6789] font-semibold px-5">
                                Transparency
                            </h5>
                            <p className="text-sm font-medium px-5 pb-5">
                                Clear, honest, and efficient processes for
                                candidates and employers at every stage.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.7 }}
                            viewport={{ once: true }}
                            className="flex flex-col rounded-2xl gap-3 shadow-inner shadow-[#FFEDF2] "
                        >
                            <div className="flex items-end justify-end">
                                <GrowthIcon />
                            </div>
                            <h5 className="text-2xl text-[#DF6789] font-semibold px-5">
                                Growth
                            </h5>
                            <p className="text-sm font-medium px-5 pb-5">
                                Empowering professionals to unlock their full
                                potential.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQs  */}
            <section>
                <div className="flex flex-col md:px-15 w-full h-fit">
                    <div className="flex flex-col w-full items-center justify-center gap-10">
                        <TextFade>
                            <h4 className=" font-extrabold text-3xl w-full md:text-4xl lg:text-5xl leading-tight text-[#343434] text-center pt-10">
                                <span className="bg-gradient-to-r from-[#3F1562] to-[#DF6789] bg-clip-text text-transparent">
                                    FAQs
                                </span>
                                , But Make It Simple
                            </h4>
                        </TextFade>
                    </div>

                    <div className="w-full mx-auto mt-5 md:mt-15 p-5">
                        <Accordion multiple={false} defaultIndex={0}>
                            {FAQs.map((faq, index) => (
                                <AccordionItem key={index}>
                                    <AccordionHeader>
                                        {faq.question}
                                    </AccordionHeader>
                                    <AccordionPanel>
                                        {faq.answer}
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}

                            <AccordionItem>
                                <AccordionHeader>
                                    What is the AI-based JD & JS Maker?
                                </AccordionHeader>
                                <AccordionPanel>
                                    <p>
                                        This tool helps recruiters and
                                        candidates create{" "}
                                        <b>polished, role-specific</b> job
                                        descriptions and career profiles in
                                        seconds.
                                    </p>
                                    <ul className="list-inside list-disc pl-5 mt-2">
                                        <li>
                                            <strong>Recruiters</strong> enter
                                            the role title + key needs → get a
                                            tailored JD instantly.
                                        </li>
                                        <li>
                                            <strong>Candidates</strong> input
                                            their skills/goals → receive a sharp
                                            profile (JS) that improves
                                            discoverability.
                                        </li>
                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionHeader>
                                    How does the in-app communication work?
                                </AccordionHeader>
                                <AccordionPanel>
                                    <p>
                                        Headsin offers{" "}
                                        <b>secure, private chat</b>&nbsp;
                                        between recruiters and job seekers —
                                        only accessible after mutual interest.
                                    </p>
                                    <ul className="list-inside list-disc pl-5 mt-2">
                                        <li>
                                            No need to exchange personal contact
                                            details.
                                        </li>
                                        <li>
                                            Manage follow-ups, schedule
                                            interviews, and stay aligned — all
                                            within Headsin.
                                        </li>
                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <AccordionHeader>
                                    What makes HeadsIn better than traditional
                                    job portals?
                                </AccordionHeader>
                                <AccordionPanel>
                                    <ul className="list-inside list-disc pl-5 space-y-1">
                                        <li>
                                            Smart AI matching (not keyword
                                            dumping)
                                        </li>
                                        <li>
                                            240 seconds assessments for real
                                            candidate quality
                                        </li>
                                        <li>
                                            Live application/job status tracking
                                        </li>
                                        <li>Privacy-first in-app chat</li>
                                        <li>
                                            Built for modern hiring, not just
                                            listing jobs
                                        </li>
                                    </ul>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
