import * as React from "react";

const VerticalLineIcon: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="40"
        fill="none"
        viewBox="0 0 8 40"
        className="hidden md:block"
    >
        <path stroke="#C8C8C8" d="M4 0v40"></path>
        <circle cx="4" cy="20" r="3.5" fill="#F6F6F6" stroke="#C8C8C8"></circle>
    </svg>
);

export default VerticalLineIcon;
