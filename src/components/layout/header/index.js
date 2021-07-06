import React, { useEffect, useState } from "react";
import { string } from "prop-types";
import { Row, Column } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import { getUser } from "../../../utils/user";
import DetailButtonComponent from "../../global-components/DetailButton";
import ArrowLeft from "../../../assets/icon/icon-arrow-left";
import { history } from "../../../utils";
import { setHeaderModal } from "../../../store/actions/header";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import AvatarComponent from "./avatar";
import { useDispatch, connect } from "react-redux";
import Hidden from "@material-ui/core/Hidden";
import Modal from "./modal";

const HeaderComponent = ({
  title,
  header,
  linkHeader,
  isBackButton,
  onSetHeaderModal,
}) => {
  const dispatch = useDispatch();
  const head = header;
  const link = linkHeader;
  const backButton = isBackButton;

  let img_profile;
  let user = getUser();

  const setModal = (modalType, isOpen, data) => {
    onSetHeaderModal(modalType, isOpen);
  };

  let titleComponent = head.map((item, i) => {
    if (i === head.length - 1) {
      return null;
    }

    return (
      <Row key={i}>
        <span
          className={css(styles.breadcrumb)}
          onClick={() => {
            history.push(link[i]);
          }}
        >
          {item}
        </span>
        <span className={css(styles.breadcrumbSeparator)}>&gt;</span>
      </Row>
    );
  });

  let titleBig = head[head.length - 1];
  const windowWidth = window.innerWidth;
  return (
    <Row
      className={css(styles.container)}
      vertical="center"
      horizontal={windowWidth > 959 ? "space-between" : "flex-end"}
    >
      <Modal />
      <Hidden only={["xs", "sm"]}>
        <Column vertical="center" style={{ marginTop: 30 }}>
          <div style={{ display: "flex" }}>{titleComponent}</div>
          <div style={{ display: "flex" }} className={css(styles.title)}>
            {titleBig}
            {backButton && (
              <div
                className={css(styles.goBack)}
                onClick={() => {
                  history.goBack();
                  dispatch({
                    type: "RESET_ALL_REDUX",
                  });
                }}
              >
                <ArrowLeft fill="#676d73" /> Kembali
              </div>
            )}
          </div>
        </Column>
      </Hidden>

      <Row vertical="center">
        <Column>
          <span className={css(styles.name, styles.cursorPointer)}>
            {getUser() && getUser().profile.nama}
          </span>
          <span className={css(styles.role, styles.cursorPointer)}>
            {getUser() && getUser().role_name}
          </span>
        </Column>
        <div className={css(styles.separator)}></div>
        <DetailButtonComponent
          button={(props) => (
            <Row
              onClick={props.onClick}
              style={{ width: 50, height: 50 }}
              style={{ cursor: "pointer" }}
            >
              <AvatarComponent image={img_profile} />
            </Row>
          )}
          horizontal="center"
          className={css(styles.cursorPointer)}
        >
          <MenuItem
            className={css(styles.dropdownProfile)}
            onClick={() => setModal("change-password", true, null)}
          >
            <span className={css(styles.menuList)}>Ubah Password</span>
          </MenuItem>
          <MenuItem
            className={css(styles.dropdownProfile)}
            onClick={() => history.push("/notification")}
          >
            <span className={css(styles.menuList)}>Notifikasi</span>
          </MenuItem>
          <MenuItem
            className={css(styles.dropdownProfile)}
            onClick={() => {
              history.push("/login");
            }}
          >
            <span style={{ color: "red" }} className={css(styles.menuList)}>
              Logout
            </span>
          </MenuItem>
        </DetailButtonComponent>
      </Row>
    </Row>
  );
};

HeaderComponent.propTypes = {
  title: string,
};

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
    border: "1px solid #DFE0EB",
  },
  container: {
    height: 40,
  },
  cursorPointer: {
    cursor: "pointer",
  },
  name: {
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 16,
    lineHeight: "20px",
    textAlign: "right",
    letterSpacing: 0.2,
    position: "relative",
    color: "#6A6A6A",
  },
  role: {
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: "20px",
    textAlign: "right",
    letterSpacing: 0.2,
    color: "#495057",
    opacity: 0.55,
    position: "relative",
    marginTop: 5,
  },
  separator: {
    borderLeft: "1px solid #DFE0EB",
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    width: 2,
  },
  title: {
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 30,
    lineHeight: "30px",
    letterSpacing: 0.3,
    marginTop: 10,
    color: "#495057",
  },
  breadcrumb: {
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 14,
    cursor: "pointer",
    color: "#495057",
    opacity: 0.7,
    "@media (max-width: 768px)": {
      marginLeft: 36,
    },
    "@media (max-width: 468px)": {
      fontSize: 10,
    },
  },
  breadcrumbSeparator: {
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 14,
    color: "#495057",
    opacity: 0.7,
    marginLeft: 20,
    marginRight: 20,
    "@media (max-width: 768px)": {
      marginLeft: 36,
    },
    "@media (max-width: 468px)": {
      fontSize: 10,
    },
  },
  iconStyles: {
    cursor: "pointer",
    marginLeft: 25,
    "@media (max-width: 768px)": {
      marginLeft: 12,
    },
  },
  navLink: {
    textDecoration: "none",
  },
  dropdownProfile: {
    color: "#495057",
    ":hover": {
      textDecoration: "none",
    },
  },
  menuList: {
    marginLeft: 5,
  },
  menuNotificationBadge: {
    position: "absolute",
    right: 15,
  },
  goBack: {
    borderRadius: 30,
    fontSize: 14,
    padding: "0px 20px 0px 10px",
    marginLeft: 20,
    backgroundColor: "#e8eaec",
    ":hover": {
      cursor: "pointer",
    },
  },
});

const mapStateToProps = ({ header, linkHeader, isBackButton }) => {
  return { header, linkHeader, isBackButton };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetHeaderModal: (modalType, isOpen) =>
      dispatch(setHeaderModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
