import * as React from "react";

const VacancyIcon: React.FC<React.SVGProps<SVGElement>> = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 22 22"
        className="md:w-5 md:h-5 w-3 h-3"
    >
        <path
            fill="#DF6789"
            d="m20.8 19.792-3.453-3.454a9.291 9.291 0 1 0-1.009 1.009l3.454 3.453a.713.713 0 0 0 1.008-1.008M2.478 10.318a7.84 7.84 0 1 1 7.84 7.84 7.85 7.85 0 0 1-7.84-7.84"
        ></path>
        <path
            fill="#DF6789"
            d="M12.38 10.138a2.85 2.85 0 1 0-4.124 0 4.28 4.28 0 0 0-2.214 3.743.713.713 0 1 0 1.425 0 2.85 2.85 0 1 1 5.702 0 .713.713 0 0 0 1.425 0 4.28 4.28 0 0 0-2.214-3.744M8.893 8.18a1.425 1.425 0 1 1 2.85 0 1.425 1.425 0 0 1-2.85 0"
        ></path>
    </svg>
);

export default VacancyIcon;
