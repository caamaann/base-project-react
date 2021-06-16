import React from "react";
import { StyleSheet, css } from "aphrodite";
import { Column } from "simple-flexbox";

const RightContainerComponent = (props) => (
  <Column horizontal="start" className={css(styles.container)}>
    {props.children}
  </Column>
);
const styles = StyleSheet.create({
  container: {
    width: "70%",
    padding: "30px",
  },
});

export default RightContainerComponent;
