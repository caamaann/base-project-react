import * as React from "react";
import { Field } from "redux-form";

export const Radio = (props) => {
  if (props && props.input && props.options) {
    const renderRadioButtons = (key, index) => {
      return (
        <label
          key={`${index}`}
          // htmlFor={`${props.input.name}-${index}`}
          className={`custom-radio ${
            props.disabled && "custom-radio-disabled"
          }`}
        >
          {props.options[key]}
          <Field
            id={props.input.name}
            component="input"
            name={props.input.name}
            type="radio"
            value={key}
            className="mr-2"
            onChange={(event, value) => {
              props.input.onChange(value);
              if (props.onChange) {
                props.onChange(value);
              }
            }}
            disabled={props.disabled}
          />
          <span
            className={`checkmark-radio ${
              props.disabled && "checkmark-radio-disabled"
            }`}
          ></span>
        </label>
      );
    };
    return (
      <div className="mb-1 mt-2">
        <div className="d-flex flex-column">
          {props.options && Object.keys(props.options).map(renderRadioButtons)}
        </div>
        <span className="form-validation">
          {props.meta.touched && props.meta.error}
        </span>
      </div>
    );
  }
  return <div></div>;
};

export default Radio;
