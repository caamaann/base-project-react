import React from "react";

export default (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 2 24 24"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity={props.opacity || ""}
      d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"
      fill={props.fill || "#FFFFFF"}
    />
  </svg>
);
