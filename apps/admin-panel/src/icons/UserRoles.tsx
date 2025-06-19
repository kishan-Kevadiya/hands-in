import type { JSX } from "solid-js";

const UserRoles = (
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
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      {...rest}
    >
      <polygon points="28.07 21 22 15 28.07 9 29.5 10.41 24.86 15 29.5 19.59 28.07 21" />
      <path d="M22,30H20V25a5,5,0,0,0-5-5H9a5,5,0,0,0-5,5v5H2V25a7,7,0,0,1,7-7h6a7,7,0,0,1,7,7Z" />
      <path d="M12,4A5,5,0,1,1,7,9a5,5,0,0,1,5-5m0-2a7,7,0,1,0,7,7A7,7,0,0,0,12,2Z" />
      <rect class="cls-1" width="32" height="32" fill="none" />
    </svg>
  );
};

export default UserRoles;
