import * as React from "react";

const DeleteIcon: React.FC<React.SVGProps<SVGElement>> = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 20 20"
  >
    <path
      fill={color || "#000"}
      d="M12.188 14.844a.625.625 0 0 0 .624-.625v-6.25a.625.625 0 1 0-1.25 0v6.25a.625.625 0 0 0 .626.625m-4.376 0a.625.625 0 0 0 .625-.625v-6.25a.625.625 0 0 0-1.25 0v6.25a.625.625 0 0 0 .625.625M12.5 2.656a.625.625 0 1 0 0-1.25h-5a.625.625 0 0 0 0 1.25z"
    ></path>
    <path
      fill={color || "#000"}
      d="M3.125 3.281a.625.625 0 0 0 0 1.25h.625v11.5a2.566 2.566 0 0 0 2.563 2.563h7.375a2.566 2.566 0 0 0 2.562-2.563v-11.5h.625a.625.625 0 1 0 0-1.25H3.125M15 4.531v11.5a1.313 1.313 0 0 1-1.312 1.313H6.312A1.31 1.31 0 0 1 5 16.03v-11.5z"
    ></path>
  </svg>
);

export default DeleteIcon;
