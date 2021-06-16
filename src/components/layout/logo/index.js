import React from "react";
import { Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import logoImage from "../../../assets/img/logo-polban.png";

function LogoComponent() {
  return (
    <Row
      className={css(styles.container)}
      horizontal="center"
      vertical="center"
    >
      <img src={logoImage} className={css(styles.logo)} alt="logo-polban" />
      <span className={css(styles.title)}>WEB PENGAJUAN BEASISWA POLBAN</span>
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    marginRight: 32,
  },
  title: {
    fontWeight: "bold",
    fontSize: 10,
    lineHeight: "16px",
    color: "#FFFFFF",
    marginLeft: 10,
  },
  logo: {
    height: 60,
    width: 60,
  },
});

export default LogoComponent;
