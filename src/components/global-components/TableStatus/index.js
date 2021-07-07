import React from "react";
import { string } from "prop-types";
import { StyleSheet, css } from "aphrodite";

const bgColor = {
  "Belum mendaftar": "#fef2ea",
  "Belum mendaftarLabel": "#f58337",
  "Sudah mendaftar": "#E9F8F0",
  "Sudah mendaftarLabel": "#3f00ff",
  "Menerima beasiswa": "#E9F8F0",
  "Menerima beasiswaLabel": "#2CB96A",
};

function TableStatusComponent(props) {
  const { status, style } = props;

  return (
    <div
      style={{
        backgroundColor: bgColor[status],
        color: bgColor[status + "Label"],
        ...style,
      }}
      className={css(styles.status)}
    >
      <span>{status}</span>
    </div>
  );
}

TableStatusComponent.propTypes = {
  name: string,
};

const styles = StyleSheet.create({
  status: {
    padding: 5,
    borderRadius: 30,
    whiteSpace: "nowrap",
    textAlign: "center",
    width: "100%",
  },
});

export default TableStatusComponent;
