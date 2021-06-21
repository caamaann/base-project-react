import React, { PureComponent, useState } from "react";
import momentPropTypes from "react-moment-proptypes";
import { SingleDatePicker } from "react-dates";
import PropTypes, { func } from "prop-types";

const FieldDatePicker = ({
  format,
  disabled,
  date,
  focused,
  onFocusChange,
  onDateChange,
  small,
  block,
  noBorder,
  placeholder,
  id,
}) => {
  return (
    <>
      <div className="datepicker-container">
        <SingleDatePicker
          showClearDate
          displayFormat={format}
          numberOfMonths={1}
          disabled={disabled}
          placeholder={placeholder}
          date={date}
          onDateChange={onDateChange}
          focused={focused}
          onFocusChange={onFocusChange}
          id={id}
          small={small}
          block={block}
          isOutsideRange={() => false}
        />
      </div>
    </>
  );
};

FieldDatePicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  date: momentPropTypes.momentObj || null,
};

FieldDatePicker.defaultProps = {
  format: "DD MMMM YYYY",
  placeholder: "Tanggal",
};
export default FieldDatePicker;
