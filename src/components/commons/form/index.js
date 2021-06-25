import React, { useState } from "react";
import NumberFormat from "react-number-format";
import Input from "./input";
import TextArea from "./textarea";
import Select from "./select";
import File from "./file";
import SingleDatePicker from "./datepicker/single-datepicker";
import moment from "moment";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker,
} from "@material-ui/pickers";

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
  isTextArea,
}) => {
  return isDetail ? (
    <label>{defaultValue || input.value || "-"}</label>
  ) : (
    <div>
      <div className="mb-1"></div>
      <Input
        {...input}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        startIcon={startIcon}
        endIcon={endIcon}
        isTextArea={isTextArea}
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
      <div className="mb-1"></div>
      <span className="form-validation">{meta.touched && meta.error}</span>
      <div className="mb-1"></div>
    </div>
  );
};

export const formTextArea = ({
  isDetail,
  input,
  type,
  disabled,
  placeholder,
  startIcon,
  rows,
  endIcon,
  meta,
  defaultValue,
}) => {
  return isDetail ? (
    <label>{defaultValue || input.value || "-"}</label>
  ) : (
    <div>
      <div className="mb-1"></div>
      <TextArea
        {...input}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        startIcon={startIcon}
        endIcon={endIcon}
        rows={rows}
        defaultValue={defaultValue}
      />
      <div className="mb-1"></div>
      <span className="form-validation">{meta.touched && meta.error}</span>
      <div className="mb-1"></div>
    </div>
  );
};
export const formInputNumber = ({
  isDetail,
  input,
  disabled,
  placeholder,
  rightPlaceholder,
  thousandSeparator,
  prefix,
  meta,
}) => {
  return isDetail ? (
    <label>{input.value || "-"}</label>
  ) : (
    <div>
      <div className="mb-1"></div>
      <NumberFormat
        {...input}
        customInput={Input}
        thousandSeparator={thousandSeparator ? "." : false}
        decimalSeparator={thousandSeparator ? "," : "."}
        disabled={disabled}
        placeholder={placeholder}
        rightPlaceholder={rightPlaceholder}
        prefix={prefix}
        isError={meta.error}
        isValid={meta.valid}
      />
      <div className="mb-1"></div>
      <span className="form-validation">{meta.touched && meta.error}</span>
      <div className="mb-1"></div>
    </div>
  );
};

export const formSelect = ({
  isDetail,
  input,
  options,
  disabled,
  placeholder,
  isSearchable,
  isClearable,
  isMulti,
  isAsync,
  asyncUrl,
  meta,
  param,
}) => {
  const handleBlur = () => {
    setTimeout(() => {
      input.onBlur(input.value);
    }, 1);
  };
  return isDetail ? (
    <label>{input.value?.label || "-"}</label>
  ) : (
    <div>
      <div className="mb-1"></div>
      <Select
        {...input}
        onChange={(value) => input.onChange(value)}
        placeholder={input.placeholder}
        onBlur={handleBlur}
        options={options}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isMulti={isMulti}
        isDisabled={disabled}
        isAsync={isAsync}
        asyncUrl={asyncUrl}
        isError={meta.error}
        param={param}
      />
      <div className="mb-1"></div>
      <span className="form-validation">{meta.touched && meta.error}</span>
      <div className="mb-1"></div>
    </div>
  );
};

export const FormDatepicker = ({
  input,
  disabled,
  placeholder,
  meta,
  format,
  isDetail,
}) => {
  const [focused, setFocused] = useState(false);
  const onFocusChange = (value) => {
    setFocused(!focused);
    input.onFocus(value);
  };
  return isDetail ? (
    <label>
      {input.value ? moment(input.value).format("DD MMMM YYYY") : "-"}
    </label>
  ) : (
    <div>
      <div className="mb-1"></div>
      <SingleDatePicker
        format={format}
        disabled={disabled}
        placeholder={placeholder}
        date={input.value}
        onDateChange={input.onChange}
        focused={focused}
        onFocusChange={onFocusChange}
        id={input.name}
        small
        block
        noBorder
      />
      <div className="mb-1"></div>
      <span className="form-validation">{meta.touched && meta.error}</span>
      <div className="mb-1"></div>
    </div>
  );
};

export const formatDates = (value) => (value ? moment(value) : null);

export const normalizeDates = (value) =>
  value ? value.format("YYYY-MM-DD") : null;

export const formFile = ({ input, meta, fileType, message, title }) => {
  const { onChange, value } = input;

  return (
    <div>
      <File
        type="file"
        fileType={fileType}
        onChange={(e) => onChange(e.target.files[0])}
        value={value}
        message={message}
        title={title}
      />
      <div className="mb-1"></div>
      <span className="form-validation">{meta.touched && meta.error}</span>
      <div className="mb-1"></div>
    </div>
  );
};

export function formYearPicker({
  input,
  isDetail,
  placeholder,
  fullWidth,
  inputVariant,
  disabled,
  position,
  meta,
}) {
  let value = input.value;
  if (value) {
    if (
      typeof value == "string" &&
      /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(
        value
      )
    ) {
      value = moment(input.value, "DD/MM/YYYY").format("YYYY-MM-DD");
    } else {
      value = moment(input.value).format("YYYY-MM");
    }
  }
  return (
    <>
      {isDetail ? (
        moment(input.value).format("YYYY")
      ) : (
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              {...input}
              views={["year"]}
              label={placeholder}
              fullWidth={fullWidth}
              inputVariant={inputVariant}
              disabled={disabled}
              InputAdornmentProps={{ position: `${position}` }}
              value={value ? value : null}
              format="yyyy"
              showTodayButton={true}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <div className="mb-1"></div>
          <span className="form-validation">{meta.touched && meta.error}</span>
          <div className="mb-1"></div>
        </div>
      )}
    </>
  );
}

export function formDatePicker({
  input,
  isDetail,
  placeholder,
  fullWidth,
  disabled,
  meta,
}) {
  let value = input.value;
  return (
    <>
      {isDetail ? (
        moment(input.value).format("DD MMMM YYYY")
      ) : (
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              {...input}
              // emptyLabel={placeholder}
              autoOk
              fullWidth={fullWidth}
              variant="inline"
              inputVariant="outlined"
              disabled={disabled}
              // InputAdornmentProps={{ position: `${position}` }}
              value={value ? value : null}
              format="dd MMMM yyyy"
            />
          </MuiPickersUtilsProvider>
          <div className="mb-1"></div>
          <span className="form-validation">{meta.touched && meta.error}</span>
          <div className="mb-1"></div>
        </div>
      )}
    </>
  );
}

export const formCheckbox = (field) => {
  const {
    input: { value },
    meta,
    disabled,
  } = field;
  return (
    <div>
      <div className="mb-1"></div>
      <label className={`custom-check ${disabled && "custom-check-disabled"}`}>
        {field.label}
        <input type="checkbox" {...field.input} checked={value} />
        <span
          className={`checkmark-check ${
            disabled && "checkmark-check-disabled"
          }`}
        ></span>
      </label>
      <div className="mb-1"></div>
      <span className="form-validation">{meta.touched && meta.error}</span>
      <div className="mb-1"></div>
    </div>
  );
};
