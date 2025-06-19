import type { JSX } from "solid-js";

const CouponIcon = (
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
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...rest}
    >
      <g id="Layer_2" data-name="Layer 2">
        <g id="invisible_box" data-name="invisible box">
          <rect width="48" height="48" fill="none" />
        </g>
        <g id="Layer_7" data-name="Layer 7">
          <g>
            <path
              fill={fill}
              d="M28.5,6.7a2,2,0,0,0-2.8-.2l-7,5.9-3-2.6A5.2,5.2,0,0,0,16,8a6,6,0,1,0-6,6,6.4,6.4,0,0,0,3.3-1l2.3,2-2.3,2A6.4,6.4,0,0,0,10,16a6,6,0,1,0,6,6,5.2,5.2,0,0,0-.3-1.8l3-2.6,7,5.9A2.1,2.1,0,0,0,27,24a1.8,1.8,0,0,0,1.5-.7,2,2,0,0,0-.2-2.8L21.8,15l6.5-5.5A2,2,0,0,0,28.5,6.7ZM10,10a2,2,0,1,1,2-2A2,2,0,0,1,10,10Zm0,14a2,2,0,1,1,2-2A2,2,0,0,1,10,24Z"
            />
            <path
              fill={fill}
              d="M44,38a2,2,0,0,0-2,2,2,2,0,0,0,0,4h4V40A2,2,0,0,0,44,38Z"
            />
            <path fill={fill} d="M26,40H22a2,2,0,0,0,0,4h4a2,2,0,0,0,0-4Z" />
            <path fill={fill} d="M16,40H12a2,2,0,0,0,0,4h4a2,2,0,0,0,0-4Z" />
            <path fill={fill} d="M36,40H32a2,2,0,0,0,0,4h4a2,2,0,0,0,0-4Z" />
            <path fill={fill} d="M6,40a2,2,0,0,0-4,0v4H6a2,2,0,0,0,0-4Z" />
            <path
              fill={fill}
              d="M4,36.7a2,2,0,0,0,2-2V31.2a1.9,1.9,0,0,0-2-2,1.9,1.9,0,0,0-2,2v3.5A2,2,0,0,0,4,36.7Z"
            />
            <path fill={fill} d="M36,13H32a2,2,0,0,0,0,4h4a2,2,0,0,0,0-4Z" />
            <path fill={fill} d="M42,13a2,2,0,0,0,0,4,2,2,0,0,0,4,0V13Z" />
            <path
              fill={fill}
              d="M44,20.3a2,2,0,0,0-2,2v3.5a2,2,0,0,0,4,0V22.3A2,2,0,0,0,44,20.3Z"
            />
            <path
              fill={fill}
              d="M44,29.2a1.9,1.9,0,0,0-2,2v3.5a2,2,0,0,0,4,0V31.2A1.9,1.9,0,0,0,44,29.2Z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default CouponIcon;
