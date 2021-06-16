import React from "react";
import { string } from "prop-types";
import { Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";

function FormContainer(props) {
  const { label, children } = props;
  return (
    <Row
      horizontal="space-between"
      vertical="center"
      className={css(styles.menuRow)}
    >
      <Row vertical="center" className={css(styles.contentLabel)}>
        {label}
      </Row>
      <div style={props.contentValueStyle} className={css(styles.contentValue)}>
        {children}
      </div>
    </Row>
  );
}

FormContainer.propTypes = {
  label: string,
};

const styles = StyleSheet.create({
  contentLabel: {
    textAlign: "left",
    fontSize: 14,
    color: "#495057",
    width: "30%",
    opacity: 0.7,
    height: 58,
  },
  contentValue: {
    width: "70%",
  },
  menuRow: {
    borderBottom: "2px solid #EDEDEE",
    // height: 58,
    // minheight: 58,
    width: "100%",
  },
});

export default FormContainer;
