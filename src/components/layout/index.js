import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row } from "simple-flexbox";
import SidebarComponent from "./sidebar";
import HeaderComponent from "./header";
import { setActiveMenu, setToastModal } from "../../store/actions";
import { StyleSheet, css } from "aphrodite";

const Index = ({ children, global, onSetActiveMenu, onSetToastModal }) => {
  const windowWidth = window.innerWidth;
  return (
    <div>
      <Row
        horizontal="center"
        style={{
          width: "100%",
          backgroundColor: "#f8f9fb",
        }}
      >
        <div className={css(styles.container)}>
          <SidebarComponent
            selectedItem={global.activeMenu}
            onChange={(menu) => onSetActiveMenu(menu)}
          />
          <div
            className={css(styles.mainBlock)}
            // style={{ width: windowWidth > 768 ? "calc(100% - 220px)" : "100%" }}
            style={{ width: "100%" }}
          >
            <HeaderComponent title={global.activeMenu} key={1} />
            <div className={css(styles.content)}>{children}</div>
          </div>
        </div>
      </Row>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    maxWidth: 1400,
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "12px 0 40px -15px #ddd, -12px 0 30px -15px #0B7535",
  },
  content: {
    marginTop: 100,
    overflow: true,
    width: "100%",
    "@media (max-width: 768px)": {
      marginTop: 20,
    },
  },
  mainBlock: {
    backgroundColor: "#F7F8FC",
    padding: 30,
  },
});

const mapStateToProps = ({ global }) => {
  return { global };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetActiveMenu: (menu) => dispatch(setActiveMenu(menu)),
    onSetToastModal: (isOpen, isSuccess, modalBody) =>
      dispatch(setToastModal(isOpen, isSuccess, modalBody)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
