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
  className,
  label,
}) => {
  return (
    <div style={{ position: "relative" }}>
      <label className="custom-check">
        {label}
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
        <span className="checkmark-check"></span>
      </label>
    </div>
  );
};

const styles = StyleSheet.create({
  input: {
    // color: "#2CB96A",
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
      borderColor: "#2CB96A",
    },
    ":focus": {
      // Overwrittes the different states of border
      borderColor: "#2CB96A",
      backgroundColor: "#2CB96A1A",
    },
    "::placeholder": {
      color: "#495057",
      opacity: 0.68,
    },
  },
  hasValue: {
    borderColor: "#2CB96A1A",
    backgroundColor: "#2CB96A1A",
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
