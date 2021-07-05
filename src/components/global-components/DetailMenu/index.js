import React from "react";
import { string } from "prop-types";
import { Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";

const DetailMenuComponent = ({ menuName, isActive, onClick, isInvalid }) => {
  return (
    <Row onClick={onClick} className={css(styles.menuRow)}>
      <span
        className={css(
          styles.menuName,
          isActive === true && styles.menuNameActive,
          isInvalid === true && styles.menuNameInvalid
        )}
      >
        {menuName}
      </span>
    </Row>
  );
};

const styles = StyleSheet.create({
  menuName: {
    textAlign: "left",
    fontSize: 16,
    color: "#495057",
  },
  menuNameActive: {
    color: "#49aee2",
  },
  menuNameInvalid: {
    color: "#e35279",
  },
  menuRow: {
    borderBottom: "2px solid #EDEDEE",
    padding: "20px 0px",
    width: "100%",
    ":hover": {
      cursor: "pointer",
    },
  },
});

export default DetailMenuComponent;
