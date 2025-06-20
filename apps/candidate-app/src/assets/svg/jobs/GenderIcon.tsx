import * as React from "react";

const GenderIcon: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 22 22"
        className="md:w-5 md:h-5 w-3 h-3"
    >
        <g
            fill="#DF6789"
            clipPath="url(#clip0_672_1338)"
        >
            <path d="M4.194 11.902 6.747 9.35a4.825 4.825 0 1 0-.971-.972L3.222 10.93l-.972-.973a.688.688 0 0 0-.972.973l.972.973-1.36 1.36a.687.687 0 1 0 .972.972l1.36-1.36.972.971a.69.69 0 0 0 .981.009.687.687 0 0 0-.008-.98zm5.432-9.84a3.437 3.437 0 1 1 0 6.875 3.437 3.437 0 0 1 0-6.875"></path>
            <path d="M20.625 7.563h-3.438a.687.687 0 0 0 0 1.375h1.778l-3.712 3.712a4.824 4.824 0 1 0 .972.972l3.712-3.712v1.777a.688.688 0 0 0 1.375 0V8.25a.69.69 0 0 0-.687-.687m-8.25 12.375a3.438 3.438 0 1 1 0-6.876 3.438 3.438 0 0 1 0 6.876"></path>
        </g>
        <defs>
            <clipPath id="clip0_672_1338">
                <path
                    fill="#fff"
                    d="M0 0h22v22H0z"
                ></path>
            </clipPath>
        </defs>
    </svg>
);

export default GenderIcon;
