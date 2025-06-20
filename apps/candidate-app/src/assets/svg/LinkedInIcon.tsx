import * as React from "react";

interface LinkedInIconProps extends React.SVGProps<SVGSVGElement> {
    background?: string;
    color?: string;
    width?: string;
    height?: string;
}

const LinkedInIcon: React.FC<LinkedInIconProps> = ({
    background,
    color,
    width,
    height,
    ...props
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width || "24"}
        height={height || "24"}
        fill="none"
        viewBox="0 0 28 28"
        className="md:w-10 md:h-10 w-6 h-6"
        {...props}
    >
        <g clipPath="url(#clip0_9_7600)">
            <path
                fill={background || "#0B69C7"}
                d="M14 28c7.732 0 14-6.268 14-14S21.732 0 14 0 0 6.268 0 14s6.268 14 14 14"
            ></path>
            <path
                fill={color || "#fff"}
                d="M10.868 8.91a1.912 1.912 0 1 1-3.823.004 1.912 1.912 0 0 1 3.823-.004M9.964 11.618H7.952a.473.473 0 0 0-.473.474v8.435c0 .261.212.473.473.473h2.012a.473.473 0 0 0 .473-.473v-8.435a.473.473 0 0 0-.473-.474M20.954 16.481v4.084a.435.435 0 0 1-.435.435H18.36a.434.434 0 0 1-.434-.435v-3.957c0-.59.17-2.578-1.544-2.578-1.33 0-1.601 1.366-1.658 1.98v4.564a.434.434 0 0 1-.431.426h-2.09a.434.434 0 0 1-.434-.435v-8.51a.434.434 0 0 1 .435-.437h2.089a.44.44 0 0 1 .444.437v.737c.493-.737 1.227-1.312 2.787-1.312 3.45-.002 3.43 3.227 3.43 5.001"
            ></path>
        </g>
        <defs>
            <clipPath id="clip0_9_7600">
                <path fill="#fff" d="M0 0h28v28H0z"></path>
            </clipPath>
        </defs>
    </svg>
);

export default LinkedInIcon;
