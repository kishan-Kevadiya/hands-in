import React from "react";
import { motion } from "framer-motion";

const PreAssesmentArrow: React.FC<React.SVGProps<SVGSVGElement>> = ({
    width = 200,
}) => (
    <svg
        width={width}
        height="230"
        viewBox="0 0 200 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_3863_45)">
            <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{
                    duration: 1,
                }}
                viewport={{ once: true, amount: 0.5 }}
                d="M34.0721 6.99984C99.9847 47.8649 149.512 150.183 89.4307 123.35C11.0472 88.3437 188.251 -27.5907 165.003 216.646"
                stroke="url(#paint0_linear_3863_45)"
                strokeWidth="1.99839"
                strokeLinecap="round"
            />
            <motion.path
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                    duration: 1,
                    delay: 1,
                }}
                viewport={{ once: true }}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M164.387 220.549C164.16 220.22 163.966 219.721 163.764 219.184C163.281 217.904 162.903 216.413 162.697 215.709C162.564 215.256 162.113 214.896 161.69 214.901C161.265 214.907 161.03 215.278 161.163 215.731C161.415 216.593 161.923 218.581 162.553 220.031C162.892 220.808 163.29 221.448 163.676 221.813C164.334 222.434 165.108 222.482 165.854 221.735C166.736 220.852 167.851 218.654 169.956 218.063C170.339 217.956 170.467 217.511 170.242 217.074C170.018 216.634 169.526 216.365 169.142 216.473C167.135 217.037 165.879 218.85 164.953 219.984C164.776 220.2 164.534 220.421 164.387 220.549Z"
                fill="#482169"
            />
        </g>
        <defs>
            <linearGradient
                id="paint0_linear_3863_45"
                x1="51.0457"
                y1="9.68385"
                x2="223.78"
                y2="175.725"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="white" />
                <stop offset="1" stopColor="#3F1562" />
            </linearGradient>
            <clipPath id="clip0_3863_45">
                <rect width="200" height="230" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default PreAssesmentArrow;
