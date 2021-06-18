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
      d="M9.05469 12.5703C10.625 12.2656 11.4102 11.4805 11.4102 10.2148C11.4102 8.78516 10.3555 7.80078 8.24609 7.26172C6.93359 6.93359 6.27734 6.45312 6.27734 5.82031C6.27734 5.46875 6.42969 5.17578 6.73438 4.94141C7.0625 4.70703 7.50781 4.58984 8.07031 4.58984C9.125 4.58984 9.67578 5.05859 9.72266 5.99609H11.1992C11.1523 4.66016 10.4375 3.81641 9.05469 3.46484V1.98828H7.05078V3.46484C6.37109 3.60547 5.80859 3.88672 5.36328 4.30859C4.94141 4.70703 4.73047 5.22266 4.73047 5.85547C4.73047 7.16797 5.77344 8.08203 7.85938 8.59766C9.19531 8.90234 9.86328 9.44141 9.86328 10.2148C9.86328 10.5195 9.72266 10.8008 9.44141 11.0586C9.18359 11.293 8.72656 11.4102 8.07031 11.4102C6.82812 11.4102 6.16016 10.9414 6.06641 10.0039H4.58984C4.66016 11.3398 5.48047 12.1836 7.05078 12.5352V14.0117H9.05469V12.5703ZM2.69141 2.72656C4.16797 1.25 5.9375 0.511719 8 0.511719C10.0625 0.511719 11.8203 1.25 13.2734 2.72656C14.75 4.17969 15.4883 5.9375 15.4883 8C15.4883 10.0625 14.75 11.832 13.2734 13.3086C11.8203 14.7617 10.0625 15.4883 8 15.4883C5.9375 15.4883 4.16797 14.7617 2.69141 13.3086C1.23828 11.832 0.511719 10.0625 0.511719 8C0.511719 5.9375 1.23828 4.17969 2.69141 2.72656Z"
      fill={props.fill || "#FFFFFF"}
    />
  </svg>
);