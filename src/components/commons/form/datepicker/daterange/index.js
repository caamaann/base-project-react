import React, { PureComponent, useState } from "react";
import momentPropTypes from "react-moment-proptypes";
import { DateRangePicker } from "react-dates";
import PropTypes, { func } from "prop-types";

const FieldDatePicker = ({
  format,
  start,
  end,
  onDatesChange,
  small,
  noBorder,
  startDatePlaceholder,
  endDatePlaceholder,
  focusedInputProps,
  onFocusChange,
}) => {
  const [focusedInput, setFocusedInput] = useState();
  return (
    <>
      <DateRangePicker
        startDateId="start_date"
        startDatePlaceholderText={startDatePlaceholder}
        startDate={start}
        endDateId="end_date"
        endDatePlaceholderText={endDatePlaceholder}
        endDate={end}
        onDatesChange={onDatesChange}
        focusedInput={focusedInputProps ? focusedInputProps : focusedInput}
        onFocusChange={
          onFocusChange
            ? onFocusChange
            : (focusedInput) => setFocusedInput(focusedInput)
        }
        showDefaultInputIcon
        showClearDates
        isOutsideRange={() => false}
        inputIconPosition="after"
        displayFormat={format ? format : "DD MMM YYYY"}
        small={small}
        noBorder={noBorder}
      />
    </>
  );
};

FieldDatePicker.propTypes = {
  onDatesChange: PropTypes.func.isRequired,
  start: momentPropTypes.momentObj || null,
  end: momentPropTypes.momentObj || null,
};

export default FieldDatePicker;
