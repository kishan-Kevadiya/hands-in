import type { Component, JSX } from "solid-js";

const UserCircleIcon: Component<
  JSX.SvgSVGAttributes<SVGSVGElement> & {
    width?: number | string;
    height?: number | string;
    fill?: string;
  }
> = (props) => {
  const { width = 24, height = 24, fill= "currentColor", ...rest } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <circle cx="12" cy="6" r="4" fill={fill} />
      <ellipse cx="12" cy="17" rx="7" ry="4" fill={fill} />
    </svg>
  );
};

export default UserCircleIcon;
