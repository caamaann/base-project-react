import React, { useState } from "react";
import { string } from "prop-types";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import ErrorIcon from "@material-ui/icons/Error";

const StatusSquareComponent = (props) => {
  const { icon, status, statusTitle, statusLabel } = props;
  const statusColor = ["#F57C2B", "#2CB96A", "#ED2A2A"];
  const Icon = icon;
  return (
    <>
      <Row
        className={css(styles.statusContainer)}
        vertical="center"
        style={{ backgroundColor: statusColor[status] }}
      >
        <Row className={css(styles.iconContainer)}>
          <Icon fontSize="large" style={{ color: "white" }} />
        </Row>
        <Column className={css(styles.descContainer)}>
          <div className={css(styles.statusTitle)}>{statusTitle}</div>
          <div className={css(styles.statusLabel)}>{statusLabel}</div>
        </Column>
      </Row>
    </>
  );
};

StatusSquareComponent.propTypes = {
  title: string,
  desc: string,
  statusLabel: string,
};

StatusSquareComponent.defaultProps = {
  icon: ErrorIcon,
  statusTitle: "Baru",
  statusLabel: "Status",
  status: 0,
};

const styles = StyleSheet.create({
  statusContainer: {
    width: "100%",
    // background: "#2CB96A",
    borderRadius: 5,
    padding: 15,
    marginTop: 30,
    marginBottom: 30,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFFFFF",
    letterSpacing: 1,
  },
  statusLabel: {
    fontSize: 14,
    color: "#FFFFFF",
  },
  descContainer: {
    marginLeft: 10,
  },
  errorLink: {
    marginTop: 5,
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.7,
    textDecoration: "underline",
    ":hover": {
      opacity: 1,
      cursor: "pointer",
    },
  },
});

export default StatusSquareComponent;
