import React from "react";
import { StyleSheet } from "aphrodite";

import { bool } from "prop-types";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import _ from "lodash";
import API from "../../../../store/actions/API";

const styles = StyleSheet.create({
  container: {
    zIndex: 30,
  },
});

const dot = (color) => ({
  alignItems: "center",
  display: "flex",

  ":before": color
    ? {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: "block",
        marginRight: 8,
        height: 10,
        width: 10,
      }
    : undefined,
});

const colourStyles = {
  control: (style, state) => {
    return {
      ...style,
      backgroundColor: state.hasValue && "#EDEDED",
      color: state.hasValue ? "#EDEDED" : styles.color,
      // match with the menu
      borderRadius: 4,
      // Overwrittes the different states  of border
      borderColor: state.isFocused
        ? "#00008B"
        : state.hasValue
        ? "#EDEDED"
        : "#e0e0e0",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: "#00008B",
      },
      fontFamily: "Circular Std Book",
      fontSize: 14,
      width: "100%",
      height: "100%",
    };
  },
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
    fontFamily: "Circular Std Book",
    fontSize: 14,
    zIndex: 9999,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  input: (styles) => {
    return {
      ...styles,
      fontFamily: "Circular Std Book",
      "& input": {
        font: "inherit",
      },
    };
  },
  placeholder: (styles) => ({
    ...styles,
    fontFamily: "Circular Std Book",
    fontSize: 14,
    color: "#495057",
    opacity: 0.68,
  }),
  singleValue: (styles) => ({
    ...styles,
    fontFamily: "Circular Std Book",
    fontSize: 14,
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: "rgba(0,0,139,0.2)",
      borderRadius: "4px",
      height: 30,
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    fontFamily: "Circular Std Book",
    fontSize: 14,
    // color: "#119E74",
    textAlign: "center",
    padding: "7px 5px",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "#119E74",
  }),
};

const SelectComponent = (props) => {
  const {
    asyncUrl,
    isAsync,
    options,
    isClearable,
    placeholder,
    param = {},
  } = props;
  const delayedQuery = _.debounce((inputValue, callback) => {
    param.search_text = inputValue;
    API.get(asyncUrl, { params: param }).then((res) => {
      callback(
        res.data.data.map(({ id, name }) => ({
          label: name,
          value: id,
        }))
      );
    });
  }, 500);

  const loadOptions = (inputValue, callback) => {
    delayedQuery(inputValue, callback);
  };

  return isAsync ? (
    <AsyncSelect
      isClearable={isClearable}
      styles={{ ...colourStyles }}
      loadOptions={loadOptions}
      defaultOptions={options}
      {...props}
    />
  ) : (
    <Select isClearable={isClearable} styles={{ ...colourStyles }} {...props} />
  );
};

SelectComponent.propsTypes = {
  isClearable: bool,
};
SelectComponent.defaultProps = {
  isClearable: true,
};

export default SelectComponent;
