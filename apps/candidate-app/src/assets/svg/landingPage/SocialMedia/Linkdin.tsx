import React from 'react'

const Linkdin: React.FC<React.SVGProps<SVGSVGElement>> = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill={color || "#282828"}
      d="M15 15V9.506c0-2.7-.581-4.762-3.731-4.762-1.519 0-2.531.825-2.944 1.612h-.037V4.988H5.305V15H8.42v-4.969c0-1.312.243-2.568 1.856-2.568 1.594 0 1.612 1.48 1.612 2.643v4.875H15zM.244 4.988h3.112V15H.244zM1.8 0A1.8 1.8 0 0 0 0 1.8c0 .994.806 1.819 1.8 1.819S3.6 2.794 3.6 1.8A1.8 1.8 0 0 0 1.8 0"
    ></path>
  </svg>

)

export default Linkdin
