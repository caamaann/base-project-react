import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import React from "react";
import { StyleSheet, css } from "aphrodite";
import { func } from "prop-types";

const index = ({
  value,
  type,
  placeholder,
  disabled,
  onChange,
  onClick,
  startIcon,
  endIcon,
  isTextarea,
  className,
  isError,
  rightPlaceholder,
  isValid,
  hasBorder,
  defaultValue,
  width,
  isVisible,
  isTypePassword,
  setIsVisible,
  maxLength,
  isDirty,
}) => {
  const StartIcon = startIcon;
  const EndIcon = endIcon;
  return (
    <div style={{ position: "relative" }}>
      {isTextarea === true ? (
        <textarea
          className={css(
            styles.input,
            value && styles.hasValue,
            startIcon && styles.startContainer,
            endIcon && styles.endContainer,
            disabled && styles.disabled,
            className
          )}
          rows={5}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      ) : (
        <input
          className={css(
            styles.input,
            value && styles.hasValue,
            startIcon && styles.startContainer,
            endIcon && styles.endContainer,
            disabled && styles.disabled,
            className
          )}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          disabled={disabled}
        />
      )}
      {startIcon && (
        <StartIcon
          onClick={onClick}
          className={css(styles.icon, styles.start)}
        />
      )}
      {endIcon && (
        <EndIcon onClick={onClick} className={css(styles.icon, styles.end)} />
      )}
      {isTypePassword ? (
        isVisible ? (
          <VisibilityOffOutlinedIcon
            onClick={setIsVisible}
            className={css(styles.icon, styles.end, styles.passToggle)}
          />
        ) : (
          <VisibilityOutlinedIcon
            onClick={setIsVisible}
            className={css(styles.icon, styles.end, styles.passToggle)}
          />
        )
      ) : (
        <></>
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
  passToggle: {
    ":hover": {
      cursor: "pointer",
    },
  },
});

export default index;
