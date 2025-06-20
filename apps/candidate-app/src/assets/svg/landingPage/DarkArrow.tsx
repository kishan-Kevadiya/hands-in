import React from "react";
import { motion } from "framer-motion";

const DarkArrow: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg
        width="139"
        height="66"
        viewBox="0 0 139 66"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{
                duration: 1,
            }}
            viewport={{ once: true }}
            d="M137.362 39.6186C101.577 40.055 31.1799 32.0115 54.3715 10.4574C79.3975 -12.8016 101.443 43.8524 7.83251 59.7302"
            stroke="url(#paint0_linear_3864_47)"
            stroke-width="2"
            stroke-linecap="round"
        />
        <motion.path
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
                duration: 0.5,
                delay: 1,
            }}
            viewport={{ once: true }}
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M2.47517 61.2052C2.65533 60.7656 3.06051 60.2574 3.50213 59.7168C4.55271 58.4276 5.93926 57.1216 6.57003 56.4766C6.97505 56.0607 6.99489 55.3639 6.61936 54.9189C6.24126 54.4733 5.60848 54.4486 5.20346 54.8646C4.43164 55.6556 2.58682 57.4 1.46898 58.9489C0.869919 59.7801 0.480785 60.5897 0.398927 61.2204C0.257816 62.2942 0.879571 63.1428 2.39105 63.4797C4.17924 63.8771 7.68432 63.7231 10.2054 65.5945C10.662 65.9349 11.2872 65.8 11.594 65.297C11.904 64.7918 11.7835 64.1074 11.3243 63.7664C8.91997 61.9837 5.73485 61.7539 3.61943 61.462C3.21749 61.4059 2.75095 61.2831 2.47517 61.2052Z"
            fill="#3E1461"
        />
        <defs>
            <linearGradient
                id="paint0_linear_3864_47"
                x1="136.517"
                y1="25.2385"
                x2="6.25609"
                y2="32.8888"
                gradientUnits="userSpaceOnUse"
            >
                <stop stop-color="white" />
                <stop offset="1" stop-color="#3F1562" />
            </linearGradient>
        </defs>
    </svg>
);

export default DarkArrow;
