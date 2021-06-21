import React from "react";
import { Column } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";

function LabelInputVerticalComponent(props) {
  const { label, width, marginRight, marginTop } = props;
  return (
    <Column
      style={{ width: width, marginRight: marginRight, marginTop: marginTop }}
      className="mb-2"
    >
      <span className={css(styles.label)}>{label}</span>
      {props.children}
    </Column>
  );
}

const styles = StyleSheet.create({
  label: {
    color: "#495057",
    marginBottom: 10,
  },
});

export default LabelInputVerticalComponent;
