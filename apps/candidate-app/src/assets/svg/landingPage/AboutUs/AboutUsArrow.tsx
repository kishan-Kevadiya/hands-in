import React from "react";
import { motion } from "framer-motion";

const AboutUsArrow: React.FC = () => (
    <svg
        width="300"
        height="200"
        viewBox="0 0 300 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{
                duration: 0.5,
                delay: 1,
            }}
            viewport={{ once: true }}
            d="M264.758 6C245.909 63.6481 187.649 143.892 187.649 99.2652C187.649 52.9998 337.093 134.515 47.3838 184.819"
            stroke="url(#paint0_linear_3878_57)"
            stroke-width="2.20311"
            stroke-linecap="round"
        />
        <motion.path
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
                duration: 0.5,
                delay: 1.5,
            }}
            viewport={{ once: true }}
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M39.9599 185.684C40.3329 186.01 41.0363 186.296 41.7992 186.596C43.615 187.311 45.8999 187.889 46.9537 188.199C47.6308 188.4 47.8548 189.037 47.4613 189.621C47.0644 190.207 46.1968 190.519 45.5197 190.318C44.2297 189.937 41.1878 189.162 39.2058 188.236C38.1433 187.739 37.377 187.166 37.086 186.618C36.588 185.687 37.2079 184.616 39.2019 183.614C41.5614 182.429 46.4494 180.971 49.4059 178.085C49.941 177.561 50.8432 177.4 51.4091 177.727C51.9801 178.054 52.0065 178.743 51.4681 179.269C48.6479 182.02 44.3105 183.687 41.469 184.924C40.9293 185.159 40.3191 185.486 39.9599 185.684Z"
            fill="#DF6789"
        />
        <defs>
            <linearGradient
                id="paint0_linear_3878_57"
                x1="47.751"
                y1="191.062"
                x2="283.117"
                y2="11.875"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="#DF6789" />
                <stop offset="1" stop-color="white" />
            </linearGradient>
        </defs>
    </svg>
);

export default AboutUsArrow;
