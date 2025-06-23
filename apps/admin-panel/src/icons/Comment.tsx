import type { JSX } from "solid-js";

type CommentIconProps = JSX.SvgSVGAttributes<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  fill?: string;
};

const CommentIcon = (props: CommentIconProps) => {
  const { width = 24, height = 24, fill = "currentColor", ...rest } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <path d="M14.5 2h-13l-.5.5v9l.5.5H4v2.5l.854.354L7.707 12H14.5l.5-.5v-9l-.5-.5zm-.5 9H7.5l-.354.146L5 13.293V11.5l-.5-.5H2V3h12v8z"/>
    </svg>
  );
};

export default CommentIcon;
