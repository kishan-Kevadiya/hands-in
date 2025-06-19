import type { JSX } from "solid-js";

const InfoIcon = (props: JSX.SvgSVGAttributes<SVGSVGElement>) => {
  const { width = 24, height = 24, fill = "currentColor", ...rest } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <rect x="15" y="14" width="2" height="8" fill={fill} />
      <rect x="15" y="10" width="2" height="2" fill={fill} />
      <circle
        cx="16"
        cy="16"
        r="12"
        fill="none"
        stroke={fill}
        stroke-width="2"
        stroke-miterlimit="10"
      />
    </svg>
  );
};

export default InfoIcon;
