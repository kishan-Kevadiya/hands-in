import type { JSX } from "solid-js";

const LoaderSpinner = (
  props: {
    width?: number | string;
    height?: number | string;
    fill?: string;
  } & JSX.SvgSVGAttributes<SVGSVGElement>,
) => {
  const { width = 60, height = 60, fill = "none", ...rest } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      {...rest}
    >
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#6A0DAD"
        stroke-width="10"
        stroke-dasharray="188.49555921538757"
        stroke-dashoffset="150"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="1s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default LoaderSpinner;
