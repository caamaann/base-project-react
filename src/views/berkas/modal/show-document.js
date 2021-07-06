import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { ModalBody, ModalHeader } from "reactstrap";
import { Column, Row } from "simple-flexbox";
import IconDownload from "../../../assets/icon/icon-download";
import IconRefresh from "../../../assets/icon/icon-refresh";
import { StyleSheet, css } from "aphrodite";
import Button from "@material-ui/core/Button";

let Index = ({ folderName, fileName, title }) => {
  const [docName, setDocName] = useState(fileName);
  const [rotate, setRotate] = useState(false);
  const [sudut, setSudut] = useState(0);
  // const [imgRef, setImgRef] = useState(false);
  let imgRef;

  const handleDownload = () => {
    window.open(
      `${process.env.REACT_APP_SPK_BEASISWA_URL_FILE}/${folderName}/${fileName}`
    );
  };

  useEffect(() => {
    function rotatingDone() {
      setRotate(false);
      if (sudut === 270) {
        setSudut(0);
      } else {
        setSudut(sudut + 90);
      }
    }
    const elm = imgRef;
    elm.addEventListener("animationend", rotatingDone);

    return function cleanup() {
      elm.removeEventListener("animationend", rotatingDone);
    };
  });

  let extention = fileName.split(".");

  const styles = StyleSheet.create({
    approveButton: {
      background: "#00008b 0% 0% no-repeat padding-box",
      boxShadow: "none",
    },
    rejectButton: {
      background: "#EAEBED 0% 0% no-repeat padding-box",
      marginRight: 10,
      color: "#00008b",
      boxShadow: "none",
    },
    footerModal: {
      marginTop: 20,
      backgroundColor: "#FBFBFD",
      height: 80,
      paddingLeft: 40,
      paddingRight: 40,
    },
    bodyModal: {
      padding: "0px 40px",
    },
    labelMargin: {
      marginTop: 10,
      marginBottom: 10,
    },
    imgDocument: {
      maxHeight: 450,
      maxWidth: 450,
      objectFit: "contain",
      marginRight: "auto",
      marginLeft: "auto",
    },
    rotate: {
      animationName: {
        from: {
          transform: `rotate(${sudut}deg)`,
        },
        to: {
          transform: `rotate(${sudut + 90}deg)`,
        },
      },
      animationDuration: "1s",
    },
    sudut0: {
      transform: `rotate(0deg)`,
    },
    sudut90: {
      transform: `rotate(90deg)`,
    },
    sudut180: {
      transform: `rotate(180deg)`,
    },
    sudut270: {
      transform: `rotate(270deg)`,
    },
  });

  return (
    <>
      <ModalHeader>{title ? title : "Berkas"}</ModalHeader>
      <ModalBody>
        {extention[1] === "pdf" ? (
          <>
            <Column className={css(styles.bodyModal)}>
              <iframe
                src={`https://docs.google.com/gview?url=${process.env.REACT_APP_SPK_BEASISWA_URL_FILE}/${folderName}/${fileName}&embedded=true`}
                width="100%"
                height="500px"
                title="pdf"
              ></iframe>
            </Column>
            <Row
              horizontal="flex-end"
              vertical="center"
              className={css(styles.footerModal)}
            >
              <Button
                variant="contained"
                color="primary"
                className={css(styles.rejectButton)}
                startIcon={<IconRefresh />}
                onClick={() => setDocName(fileName)}
              >
                Refresh
              </Button>
              <Button
                onClick={handleDownload}
                variant="contained"
                color="primary"
                className={css(styles.approveButton)}
                startIcon={<IconDownload />}
              >
                Download
              </Button>
            </Row>
          </>
        ) : (
          <>
            <div className="d-flex justify-content-center p-3">
              <img
                src={`${process.env.REACT_APP_SPK_BEASISWA_URL_FILE}/${folderName}/${fileName}`}
                alt="foto"
                ref={(elm) => {
                  imgRef = elm;
                }}
                className={css(
                  rotate && styles.rotate,
                  styles.imgDocument,
                  sudut === 0
                    ? styles.sudut0
                    : sudut === 90
                    ? styles.sudut90
                    : sudut === 180
                    ? styles.sudut180
                    : sudut === 270
                    ? styles.sudut270
                    : styles.sudut0
                )}
              />
            </div>
            <Row
              horizontal="flex-end"
              vertical="center"
              className={css(styles.footerModal)}
            >
              <Button
                onClick={() => setRotate(true)}
                variant="contained"
                color="primary"
                className={css(styles.approveButton)}
              >
                Putar
              </Button>
            </Row>
          </>
        )}
      </ModalBody>
    </>
  );
};

const mapStateToProps = ({}) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
