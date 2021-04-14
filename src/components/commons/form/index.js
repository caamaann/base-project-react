import React, { useState } from "react";
import Input from "./input";

export const formInput = ({
  isDetail,
  input,
  type,
  disabled,
  placeholder,
  rightPlaceholder,
  startIcon,
  endIcon,
  meta,
  defaultValue,
  isVisible,
  isTypePassword,
  setIsVisible,
  maxLength,
}) => {
  return isDetail ? (
    <label>{defaultValue || input.value}</label>
  ) : (
    <div>
      <Input
        {...input}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        startIcon={startIcon}
        endIcon={endIcon}
        rightPlaceholder={rightPlaceholder}
        isError={meta.error}
        isValid={meta.valid}
        isDirty={meta.dirty}
        defaultValue={defaultValue}
        isVisible={isVisible}
        isTypePassword={isTypePassword}
        setIsVisible={setIsVisible}
        maxLength={maxLength}
      />
      <span className="form-validation">{meta.touched && meta.error}</span>
      <div className="mb-3"></div>
    </div>
  );
};
