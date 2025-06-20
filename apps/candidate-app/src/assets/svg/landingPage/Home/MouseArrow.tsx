import React from "react";

const MouseArrow: React.FC = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="39"
        fill="none"
        viewBox="0 0 30 39"
    >
        <g filter="url(#filter0_d_3526_98)">
            <path
                fill="#3F1562"
                d="M.909 6.079C.606 4.79 2.09 3.837 3.137 4.649l19.725 15.315c1.222.948.237 2.886-1.25 2.458l-8.9-2.562a1.404 1.404 0 0 0-1.775 1.129l-1.51 9.51c-.242 1.521-2.402 1.6-2.754.102z"
            ></path>
            <path
                stroke="#fff"
                strokeWidth="1.404"
                d="m2.706 5.203 19.725 15.315c.611.475.119 1.444-.625 1.23l-8.9-2.563a2.106 2.106 0 0 0-2.663 1.694l-1.51 9.51c-.12.76-1.2.8-1.377.05L1.592 5.92c-.151-.645.591-1.122 1.114-.716Z"
            ></path>
        </g>
        <defs>
            <filter
                id="filter0_d_3526_98"
                width="33.778"
                height="38.57"
                x="-4.748"
                y="0.135"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feColorMatrix
                    in="SourceAlpha"
                    result="hardAlpha"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                ></feColorMatrix>
                <feOffset dy="1.404"></feOffset>
                <feGaussianBlur stdDeviation="2.809"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out"></feComposite>
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                <feBlend
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_3526_98"
                ></feBlend>
                <feBlend
                    in="SourceGraphic"
                    in2="effect1_dropShadow_3526_98"
                    result="shape"
                ></feBlend>
            </filter>
        </defs>
    </svg>
);

export default MouseArrow;
