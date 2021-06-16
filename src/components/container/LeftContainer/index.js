import React from "react";
import { StyleSheet, css } from "aphrodite";
import { Column } from "simple-flexbox";

const ContainerComponent = (props) => (
  <Column horizontal="start" className={css(styles.container)}>
    {props.children}
  </Column>
);
const styles = StyleSheet.create({
  container: {
    width: "30%",
    background: "#f8f9fb",
    borderRight: "2px solid #EDEDEE",
    padding: "30px",
    minHeight: 500,
  },
});

export default ContainerComponent;
