import React from "react";
import { StyleSheet, css } from "aphrodite";
import { Column } from "simple-flexbox";

const ContainerComponent = (props) => (
  <Column className={css(styles.container)}>{props.children}</Column>
);
const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height: "100%",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 10px 40px #00000014",
    borderRadius: "5px",
    position: "relative",
    overflow: "auto",
  },
});

export default ContainerComponent;
