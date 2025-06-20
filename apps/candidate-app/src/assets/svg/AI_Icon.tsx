import React from "react";

const AI_Icon: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
            fill="url(#paint0_linear_945_905)"
            d="M12 1c-1.519 8.25-2.75 9.481-11 11 8.25 1.519 9.481 2.75 11 11 1.519-8.25 2.75-9.481 11-11-8.25-1.519-9.481-2.75-11-11"
        ></path>
        <defs>
            <linearGradient
                id="paint0_linear_945_905"
                x1="1"
                x2="20.438"
                y1="12.44"
                y2="19.497"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#3F1562"></stop>
                <stop offset="1" stopColor="#DF6789"></stop>
            </linearGradient>
        </defs>
    </svg>
);

export default AI_Icon;
