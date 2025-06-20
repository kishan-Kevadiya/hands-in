import * as React from "react";

const MailIcon: React.FC<React.SVGProps<SVGElement>> = ({ stroke, width, height }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || "40"}
        height={height || "40"}
        fill="none"
        viewBox="0 0 40 40"
        className="md:w-10 md:h-10 w-6 h-6"
    >
        <circle cx="20" cy="20" r="19.5" fill="#fff" stroke={stroke || "#D3D3D3"}></circle>
        <path
            stroke="#DF6789"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.3"
            d="M23.75 26.375h-7.5c-2.25 0-3.75-1.125-3.75-3.75v-5.25c0-2.625 1.5-3.75 3.75-3.75h7.5c2.25 0 3.75 1.125 3.75 3.75v5.25c0 2.625-1.5 3.75-3.75 3.75"
        ></path>
        <path
            stroke="#DF6789"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="1.3"
            d="m23.75 17.75-2.347 1.875c-.773.615-2.04.615-2.813 0l-2.34-1.875"
        ></path>
    </svg>
);

export default MailIcon;
