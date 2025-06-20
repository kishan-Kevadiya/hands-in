import React from "react";
import { motion } from "framer-motion";

const HeadsInIcon: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="39"
        fill="none"
        viewBox="0 0 29 39"
    >
        <motion.path
            initial={{
                opacity: 0,
                y: [-40, 0, 40],
            }}
            animate={{
                y: [-100, 0, 0, 100],
                opacity: [0, 1, 1, 0],
            }}
            transition={{
                y: {
                    duration: 2,
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                },
                opacity: {
                    duration: 2,
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                },
            }}
            fill="url(#paint0_linear_2602_309)"
            d="m28.68 24.483-13.387 13.6c-.433.44-1.145.44-1.578 0L.327 24.483a1.146 1.146 0 0 1 0-1.604l3.707-3.76c.44-.44 1.145-.44 1.579 0l8.096 8.225c.434.44 1.145.44 1.579 0l8.107-8.225a1.11 1.11 0 0 1 1.579 0l3.7 3.76c.434.44.434 1.163 0 1.604z"
        ></motion.path>
        <motion.path
            initial={{
                opacity: 0,
                y: [-40, 0, 40],
            }}
            animate={{
                y: [-100, 0, 0, 100],
                opacity: [0, 1, 1, 0],
            }}
            transition={{
                y: {
                    duration: 2,
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.1,
                },
                opacity: {
                    duration: 2,
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.1,
                },
            }}
            fill="url(#paint1_linear_2602_309)"
            d="M14.505 17.315c4.583 0 8.298-3.774 8.298-8.43S19.088.455 14.505.455 6.207 4.23 6.207 8.885s3.715 8.43 8.298 8.43"
        ></motion.path>
        <defs>
            <linearGradient
                id="paint0_linear_2602_309"
                x1="0"
                x2="22.518"
                y1="28.994"
                y2="41.075"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#3F1562"></stop>
                <stop offset="1" stopColor="#DF6789"></stop>
            </linearGradient>
            <linearGradient
                id="paint1_linear_2602_309"
                x1="6.207"
                x2="20.924"
                y1="9.222"
                y2="14.482"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#3F1562"></stop>
                <stop offset="1" stopColor="#DF6789"></stop>
            </linearGradient>
        </defs>
    </svg>
);

export default HeadsInIcon;
