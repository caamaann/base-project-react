import React from "react";

export default (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill={props.fill || "#FFFFFF"}
      opacity={props.opacity || ""}
      transform="translate(-1 -8)"
    >
      <path d="M23.569,8H9.146a5.889,5.889,0,0,1,.821,3,5.471,5.471,0,0,1-5.321,5.656A5.136,5.136,0,0,1,1,15.12v5.875a.684.684,0,0,0,.684.684H23.569a.684.684,0,0,0,.684-.684V8.684A.684.684,0,0,0,23.569,8ZM21.518,18.259H13.995V16.891h7.523Zm0-3.42H11.259V13.471H21.518Z" />
      <path
        d="M13.452,9.726A3.726,3.726,0,1,1,9.726,6,3.726,3.726,0,0,1,13.452,9.726Zm-1.481-.671a.439.439,0,0,0-.621-.621l-2.1,2.1L8.174,9.465a.439.439,0,0,0-.621.621l1.692,1.692Z"
        transform="translate(-5 2)"
      />
    </g>
  </svg>
);
