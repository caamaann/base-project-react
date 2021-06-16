import React from "react";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import Button from "@material-ui/core/Button";
import IconPhoto from "../../../../assets/icon/icon-photo";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";

export default ({ title, value, message, error, fileType, ...resProps }) => {
  const handleOpen = () => {
    let file = value;
    let fr = new FileReader();
    fr.readAsDataURL(file);

    var blob = new Blob([file], { type: "application/pdf" });
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = value.name;
    link.click();
  };
  return (
    <Row horizontal="space-between" vertical="center">
      <Button
        variant="contained"
        component="label"
        color="primary"
        className={css(styles.uploadButton)}
        startIcon={
          fileType === "image" ? (
            <IconPhoto />
          ) : fileType === "pdf" || fileType === "pdf/image" ? (
            <PictureAsPdfIcon />
          ) : null
        }
      >
        {title}
        <input
          accept={
            fileType === "image"
              ? "image/jpg, image/jpeg, image/png"
              : fileType === "pdf"
              ? ".pdf"
              : fileType === "pdf/image"
              ? ".pdf, image/jpg, image/jpeg, image/png"
              : fileType === "support"
              ? ".pdf, .xls, .xlsx, .doc, .docx, image/jpg, image/jpeg, image/png"
              : fileType === "excel"
              ? ".xls, .xlsx"
              : "FILE"
          }
          {...resProps}
          style={{ display: "none" }}
        />
      </Button>
      <Column className={css(styles.uploadInformation)}>
        <Row vertical="center" className={css(styles.uploadFilename)}>
          {value ? (
            <span onClick={handleOpen} className={css(styles.filename)}>
              {value.name}
            </span>
          ) : (
            <span></span>
          )}
        </Row>
        <div>{error ? error : message}</div>
      </Column>
    </Row>
  );
};

const styles = StyleSheet.create({
  uploadButton: {
    background: "#00008B 0% 0% no-repeat padding-box",
    boxShadow: "none",
  },
  // uploadInformation: {
  //   textAlign: "right",
  // },
  uploadFilename: {
    fontWeight: "Bold",
    height: 20,
    color: "#7F8388",
  },
  filename: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "190px",
    textOverflow: "ellipsis",
    ":hover": {
      cursor: "pointer",
      color: "#00008B",
    },
  },
});
