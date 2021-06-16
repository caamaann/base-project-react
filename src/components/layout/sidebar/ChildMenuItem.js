import React from "react";
import { Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import { NavLink } from "react-router-dom";

export default (props) => {
  const { link, title, icon } = props;
  const Icon = icon;

  return (
    <NavLink to={link} exact className={css(styles.navlink)}>
      <Row vertical="center" style={{ height: 40 }}>
        <Icon fontSize="small" />
        <span className={css(styles.title)}>{title}</span>
      </Row>
    </NavLink>
  );
};

const styles = StyleSheet.create({
  navlink: {
    textDecoration: "none",
  },
  title: {
    color: "#FFFFFF",
    marginLeft: 20,
  },
});
