import React from "react";

export default (props) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity={props.opacity || ""}
      d="M16.671,3H4.709A1.714,1.714,0,0,0,3,4.709V16.671A1.714,1.714,0,0,0,4.709,18.38H16.671a1.714,1.714,0,0,0,1.709-1.709V4.709A1.714,1.714,0,0,0,16.671,3ZM8.127,14.962H6.418V8.981H8.127Zm3.418,0H9.836V6.418h1.709Zm3.418,0H13.253V11.544h1.709Z"
      // transform="translate(-3 -3)"
      fill={props.fill || "#FFFFFF"}
    />
  </svg>
);
