import React from "react";
import { string } from "prop-types";
import { Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";

function DetailContentComponent(props) {
  const { label, value, alignItems } = props;
  return (
    <Row
      horizontal="space-between"
      className={css(styles.menuRow)}
      style={{ alignItems: alignItems ? alignItems : "center" }}
    >
      <span className={css(styles.contentLabel)}> {label} </span>
      <span
        className={css(styles.contentValue)}
        style={{ color: "#495057", ...props.style }}
      >
        {value}
      </span>
    </Row>
  );
}

DetailContentComponent.propTypes = {
  label: string,
};

const styles = StyleSheet.create({
  contentLabel: {
    textAlign: "left",
    fontSize: 14,
    color: "#495057",
    width: "30%",
    opacity: 0.7,
    paddingRight: 20,
  },
  contentValue: {
    textAlign: "left",
    fontSize: 14,
    width: "70%",
  },
  menuRow: {
    borderBottom: "2px solid #EDEDEE",
    padding: "20px 0px",
    width: "100%",
  },
});

export default DetailContentComponent;
