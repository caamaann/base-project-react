import * as React from "react";
import { Field } from "redux-form";
import Slider from "@material-ui/core/Slider";
import { optionsAHP } from "../../../../utils/constant";

export const Index = ({
  input: { onDragStart, onChange, name, value },
  onChange: onChangeFromField,
  defaultValue,
  meta,
  min,
  max,
  ...props
}) => {
  return (
    <div>
      <Slider
        name={name}
        value={value !== "" ? value : 1}
        min={-7}
        max={9}
        step={null}
        track={false}
        marks={optionsAHP}
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
