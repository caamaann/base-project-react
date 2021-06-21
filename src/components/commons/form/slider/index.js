import * as React from "react";
import { Field } from "redux-form";
import Slider from "@material-ui/core/Slider";

export const Index = ({
  input: { onDragStart, onChange, name, value },
  onChange: onChangeFromField,
  defaultValue,
  meta,
  min,
  max,
  ...props
}) => {
  const length = max && min ? max - min + 1 : 10;
  const marks = Array.from(Array(length), (_, index) =>
    min ? index + min : index + 1
  ).map((item) => {
    return { value: item, label: item };
  });
  return (
    <div>
      <Slider
        name={name}
        value={value}
        min={min ? min : 1}
        max={max ? max : 10}
        marks={marks}
        aria-labelledby="discrete-slider"
        onChange={(event, value) => {
          onChange(value);
          if (onChangeFromField) {
            onChangeFromField(value);
          }
        }}
        {...props}
      />
      <div className="mb-1"></div>
      <span className="form-validation">{meta.touched && meta.error}</span>
      <div className="mb-1"></div>
    </div>
  );
};

export default Index;
