import type { JSX } from "solid-js";

const UptrendArrowIcon = (
    props: JSX.SvgSVGAttributes<SVGSVGElement> & {
        width?: number | string;
        height?: number | string;
        fill?: string;
    },
) => {
    const { width = 16, height = 16, fill = "currentColor", ...rest } = props;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 230.453 230.453"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            {...rest}
        >
            <polygon
                points="177.169,43.534 177.169,58.534 204.845,58.534 135.896,127.479 92.36,83.947 0,176.312 10.606,186.918 92.361,105.16 135.896,148.691 215.453,69.14 215.453,96.784 230.453,96.784 230.453,43.534"
                fill={fill}
            />
        </svg>
    );
};

export default UptrendArrowIcon;
