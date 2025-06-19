import type { JSX } from "solid-js";

type SidebarArrowProps = JSX.SvgSVGAttributes<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  fill?: string;
};

const SidebarArrow = (props: SidebarArrowProps) => {
  const { width = 24, height = 24, fill = "#000000", ...rest } = props;
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
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.293 7.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L15.586 12l-3.293-3.293a1 1 0 0 1 0-1.414Z"
        fill={fill}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.293 7.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L9.586 12 6.293 8.707a1 1 0 0 1 0-1.414Z"
        fill={fill}
      />
    </svg>
  );
};

export default SidebarArrow;
