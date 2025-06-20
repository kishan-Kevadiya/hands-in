/* eslint-disable react-hooks/rules-of-hooks */
import Information from "@/assets/svg/landingPage/Information";
import DownloadApply from "@/assets/svg/landingPage/TimeLine/DownloadApply";
import EnhanceAI from "@/assets/svg/landingPage/TimeLine/EnhanceAI";
import PickATemplate from "@/assets/svg/landingPage/TimeLine/PickATemplate";
import { motion, useScroll, useTransform } from "framer-motion";
import type React from "react";
import { useRef } from "react";

interface TimelineStep {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    active?: boolean;
    completed?: boolean;
}

interface ResponsiveTimelineProps {
    steps?: TimelineStep[];
    activeStep?: number;
    darkMode?: boolean;
}

const LandingTimeline: React.FC<ResponsiveTimelineProps> = ({
    darkMode,
}: ResponsiveTimelineProps) => {
    // Default steps with icons and content
    const defaultSteps = [
        {
            id: 1,
            title: "Pick a",
            highlight: "Template",
            description:
                "Select a professional, ATS-friendly template to get started!",
            icon: <PickATemplate />,
        },
        {
            id: 2,
            title: "Fill in Your",
            highlight: "Information",
            description: "Add your experience, skills, and education.",
            icon: <Information />,
        },
        {
            id: 3,
            title: "Enhance with",
            highlight: "AI",
            description: "Get AI-powered content suggestions & improvements.",
            icon: <EnhanceAI />,
        },
        {
            id: 4,
            title: "Download &",
            highlight: "Apply",
            description: "Save your resume instantly and start applying!",
            icon: <DownloadApply />,
        },
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["end end", "start start"],
    });

    // Create individual progress values for each step
    const step1Progress = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
    const step2Progress = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
    const step3Progress = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
    const step4Progress = useTransform(scrollYProgress, [0.75, 1], [0, 1]);

    const stepProgresses = [
        step1Progress,
        step2Progress,
        step3Progress,
        step4Progress,
    ];

    const steps = defaultSteps;
    const bgColor = darkMode ? "bg-black" : "bg-white";
    const lineColor = "bg-primary/30";

    return (
        <div
            className={`relative w-full  flex items-center justify-center ${bgColor}`}
        >
            <div className={`sticky top-0 w-full max-w-7xl mx-auto px-4 py-8`}>
                {/* Desktop Timeline (Horizontal) */}
                <div
                    className="flex md:flex-row flex-col md:gap-0 gap-6 md:items-start md:justify-between relative"
                    ref={containerRef}
                >
                    {/* Timeline Line */}
                    <div
                        className={`absolute md:w-3/4 w-11/12 md:top-[6.2rem] top-[48%] md:right-1/2 right-[97%] translate-1/2 md:rotate-0 rotate-90 h-0.5 ${lineColor}`}
                    ></div>

                    {/* Animated Progress Line */}
                    <motion.div
                        className="absolute md:w-3/4 w-1 md:top-[6.2rem] top-[10%] md:left-[12.5%] left-[3%] md:h-0.5 h-0 bg-primary origin-left"
                        style={{
                            scaleX: scrollYProgress,
                            scaleY: scrollYProgress,
                            transformOrigin: "center left",
                        }}
                    ></motion.div>

                    {steps.map((step, index) => {
                        const scale = useTransform(
                            stepProgresses[index],
                            [0, 1],
                            [0.8, 1]
                        );
                        const opacity = useTransform(
                            stepProgresses[index],
                            [0, 1],
                            [0.5, 1]
                        );
                        const innerBackgroundColor = useTransform(
                            stepProgresses[index],
                            [0, 0.5, 1],
                            ["#ffffff", "#ffffff", "#ffffff"]
                        );
                        const backgroundColor = useTransform(
                            stepProgresses[index],
                            [0, 0.5, 1],
                            ["#FFDAE5", "#FFDAE5", "#df6789"]
                        );
                        const yOffset = useTransform(
                            stepProgresses[index],
                            [0, 1],
                            [10, 0]
                        );
                        const contentOpacity = useTransform(
                            stepProgresses[index],
                            [0, 1],
                            [0.5, 1]
                        );

                        return (
                            <div
                                key={step.id}
                                className="flex md:flex-col flex-row md:gap-4 items-center z-10 w-full"
                            >
                                {/* Icon and Circle */}
                                <div className="mb-6 flex md:flex-col flex-row-reverse gap-4 items-center">
                                    <motion.div
                                        style={{
                                            scale: scale,
                                            opacity: opacity,
                                        }}
                                        className="w-16 h-16  rounded-full mb-2 flex items-center justify-center"
                                    >
                                        {step.icon}
                                    </motion.div>
                                    <motion.div
                                        style={{
                                            backgroundColor: backgroundColor,
                                        }}
                                        className={`w-6 h-6 rounded-full border-[5px] border-primary/30 flex items-center justify-center`}
                                    >
                                        <motion.div
                                            className="w-3 h-3 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    innerBackgroundColor,
                                            }}
                                        />
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <motion.div
                                    style={{
                                        opacity: contentOpacity,
                                        y: yOffset,
                                    }}
                                    className="flex flex-col items-center text-center max-w-xs"
                                >
                                    <h3 className="text-xl font-medium text-black">
                                        {step.title}&nbsp;
                                        <span className="text-xl font-medium bg-gradient-to-r from-[#3F1562] to-primary bg-clip-text text-transparent">
                                            {step.highlight}
                                        </span>
                                    </h3>
                                    <p className="text-sm font-medium text-[#454545] w-4/5">
                                        {step.description}
                                    </p>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default LandingTimeline;
