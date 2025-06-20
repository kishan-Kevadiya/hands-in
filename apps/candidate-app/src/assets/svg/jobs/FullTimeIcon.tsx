import * as React from "react";

const FullTimeIcon: React.FC<React.SVGProps<SVGElement>> = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 22 22"
    className="md:w-5 md:h-5 w-3 h-3"
  >
    <g fill="#DF6789" clipPath="url(#clip0_1182_1220)">
      <path d="m14.92 12.943-3.068-2.3V5.955a.851.851 0 1 0-1.704 0v5.112a.85.85 0 0 0 .34.682l3.409 2.556c.147.11.326.17.51.17a.85.85 0 0 0 .512-1.534"></path>
      <path d="M11 0C4.934 0 0 4.934 0 11s4.934 11 11 11 11-4.934 11-11S17.066 0 11 0m0 20.296c-5.125 0-9.296-4.17-9.296-9.296S5.874 1.704 11 1.704s9.296 4.17 9.296 9.296-4.17 9.296-9.296 9.296"></path>
    </g>
    <defs>
      <clipPath id="clip0_1182_1220">
        <path fill="#fff" d="M0 0h22v22H0z"></path>
      </clipPath>
    </defs>
  </svg>
);

export default FullTimeIcon;
