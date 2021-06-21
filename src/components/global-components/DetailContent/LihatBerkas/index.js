import React from "react";
import { string } from "prop-types";
import { Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import IconLaunch from "../../../../assets/icon/icon-launch";

function DetailLihatBerkasComponent(props) {
  const { display, label, marginTop } = props;
  return (
    <Row
      onClick={props.onClick}
      style={{ display: display ? "inline" : "flex", marginTop: marginTop }}
    >
      <span className={css(styles.detailLihatBerkas)}>
        {" "}
        {label ? label : "Lihat Berkas"} <IconLaunch />
      </span>
    </Row>
  );
}

DetailLihatBerkasComponent.propTypes = {
  name: string,
};

const styles = StyleSheet.create({
  detailLihatBerkas: {
    textAlign: "left",
    textDecoration: "underline",
    fontSize: 14,
    fontWeight: 800,
    color: "#495057",
    ":hover": {
      cursor: "pointer",
    },
  },
});

export default DetailLihatBerkasComponent;
