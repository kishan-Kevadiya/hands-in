import type { JSX } from "solid-js";

const SearchIcon = (
  props: {
    width?: number | string;
    height?: number | string;
    fill?: string;
  } & JSX.SvgSVGAttributes<SVGSVGElement>,
) => {
  const { width = 24, height = 24, fill = "currentColor", ...rest } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <circle cx="5" cy="5" r="4.3" stroke={fill} stroke-width="1.8" />
      <line
        x1="10.0101"
        y1="11"
        x2="8"
        y2="8.98995"
        stroke={fill}
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default SearchIcon;
