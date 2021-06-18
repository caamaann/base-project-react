import React from "react";
import { StyleSheet, css } from "aphrodite";

const index = ({
  value,
  placeholder,
  disabled,
  onChange,
  checked,
  onClick,
  startIcon,
  endIcon,
  hasBorder,
  label,
  className,
}) => {
  const StartIcon = startIcon;
  const EndIcon = endIcon;
  return (
    <div style={{ position: "relative" }}>
      <input
        type="checkbox"
        value={value}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        placeholder={placeholder}
        className={css(
          styles.input,
          value && styles.hasValue,
          startIcon && styles.startContainer,
          endIcon && styles.endContainer,
          disabled && styles.disabled,
          className
        )}
      />
      <label>{label}</label>
      {startIcon && (
        <StartIcon
          onClick={onClick}
          className={css(styles.icon, styles.start)}
        />
      )}
      {endIcon && (
        <EndIcon onClick={onClick} className={css(styles.icon, styles.end)} />
      )}
    </div>
  );
};

const styles = StyleSheet.create({
  input: {
    // color: "#00008B",
    padding: 10,
    borderRadius: 4,
    zIndex: 30,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "solid",
    boxShadow: "none",
    display: "inline-block",
    boxSizing: "border-box",
    width: "100%",
    outline: "none",
    fontSize: "14px",
    fontFamily: [
      "Circular Std Book",
      "Roboto",
      "Segoe UI",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      "sans-serif",
    ],
    // backgroundColor: "#EFF0F2",
    ":hover": {
      // Overwrittes the different states of border
      borderColor: "#00008B",
    },
    ":focus": {
      // Overwrittes the different states of border
      borderColor: "#00008B",
      backgroundColor: "#EDEDED",
    },
    "::placeholder": {
      color: "#495057",
      opacity: 0.68,
    },
  },
  hasValue: {
    borderColor: "#00008B",
    backgroundColor: "#EDEDED",
  },
  disabled: {
    ":hover": {
      // cursor: "not-allowed",
      borderColor: "#EFF0F2",
    },
  },
  icon: {
    position: "absolute",
    top: 10,
    height: 20,
    color: "#495057",
    width: 20,
  },
  start: {
    left: 10,
  },
  startContainer: { paddingLeft: 35 },
  end: {
    right: 10,
  },
  endContainer: { paddingRight: 35 },
});
export default index;