import React from "react";
import { StyleSheet, css } from "aphrodite";
import { Row } from "simple-flexbox";

function DetailMemberStatusComponent(props) {
  return (
    <Row
      onClick={props.onClick}
      className={css(styles.detailMemberStatusContainer)}
    >
      {props.children}
    </Row>
  );
}

const styles = StyleSheet.create({
  detailMemberStatusContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default DetailMemberStatusComponent;
