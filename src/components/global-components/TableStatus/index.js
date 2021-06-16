import React from "react";
import { string } from "prop-types";
import { StyleSheet, css } from "aphrodite";

const bgColor = {
  Aktif: "#E9F8F0",
  AktifLabel: "#2CB96A",
  Nonaktif: "#FDE9E9",
  NonaktifLabel: "#ED2A2A",
  Baru: "#f58337",
  BaruLabel: "#fef2ea",
  Diterima: "#E9F8F0",
  DiterimaLabel: "#2CB96A",
  Ditolak: "#FDE9E9",
  DitolakLabel: "#ED2A2A",
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
