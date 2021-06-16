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
      d="M9.818,3.682H6.136V7.363H9.818Zm1.227,6.136v1.227H4.909V9.818Zm0-7.363V8.59H4.909V2.454Zm6.136,7.363v1.227H12.272V9.818Zm0-2.454V8.59H12.272V7.363Zm0-2.454V6.136H12.272V4.909Zm0-2.454V3.682H12.272V2.454Zm-14.726,9.2v-9.2H1.227v9.2a.59.59,0,0,0,.182.431.6.6,0,0,0,.863,0A.59.59,0,0,0,2.454,11.658Zm15.954,0V1.227H3.682V11.658a1.825,1.825,0,0,1-.105.614H17.794a.622.622,0,0,0,.614-.614ZM19.635,0V11.658A1.832,1.832,0,0,1,17.794,13.5H1.841a1.777,1.777,0,0,1-1.3-.537A1.773,1.773,0,0,1,0,11.658V1.227H2.454V0Z"
      fill={props.fill || "#FFFFFF"}
      transform="translate(2, 4)"
    />
  </svg>
);
