import * as React from "react";

interface ComboStarProps extends React.SVGProps<SVGElement> {
    width?: string;
    height?: string;
}
const ComboStar: React.FC<ComboStarProps> = ({ width, height }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || "134"}
        height={height || "142"}
        fill="none"
        viewBox="0 0 134 142"
    >
        <path
            fill="url(#paint0_linear_1912_166)"
            d="M73.687 0C65.447 44.766 58.765 51.446 14 59.687c44.766 8.242 51.446 14.922 59.687 59.688 8.242-44.766 14.922-51.446 59.688-59.688C88.609 51.447 81.928 44.766 73.687 0"
            opacity="0.2"
        ></path>
        <path
            fill="url(#paint1_linear_1912_166)"
            d="M23 96c-3.176 17.25-5.75 19.824-23 23 17.25 3.176 19.824 5.75 23 23 3.176-17.25 5.75-19.824 23-23-17.25-3.176-19.824-5.75-23-23"
            opacity="0.2"
        ></path>
        <defs>
            <linearGradient
                id="paint0_linear_1912_166"
                x1="14"
                x2="119.473"
                y1="62.075"
                y2="100.367"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#3F1562"></stop>
                <stop offset="1" stopColor="#DF6789"></stop>
            </linearGradient>
            <linearGradient
                id="paint1_linear_1912_166"
                x1="0"
                x2="40.643"
                y1="119.92"
                y2="134.675"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#3F1562"></stop>
                <stop offset="1" stopColor="#DF6789"></stop>
            </linearGradient>
        </defs>
    </svg>
);

export default ComboStar;
