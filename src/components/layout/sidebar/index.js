import React, { useState } from "react";
import { Column, Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import { NavLink } from "react-router-dom";
import Logo from "../logo";
import { getUser } from "../../../utils/user";
import MenuItemComponent from "./MenuItem";

import AdminIcon from "../../../assets/icon/icon-admin";
import IconBurger from "../../../assets/icon/icon-burger";
import BenefitIcon from "../../../assets/icon/icon-benefit";
import BerkasIcon from "../../../assets/icon/icon-berkas";
import Berkas2Icon from "../../../assets/icon/icon-berkas-2";
import IconDashboard from "../../../assets/icon/icon-dashboard";
import EventIcon from "../../../assets/icon/icon-event";
import FinanceIcon from "../../../assets/icon/icon-finance";
import HealthyIcon from "../../../assets/icon/icon-healthy";
import IuranIcon from "../../../assets/icon/icon-iuran";
import MasterIcon from "../../../assets/icon/icon-master";
import MemberIcon from "../../../assets/icon/icon-member";
import MessageBlastIcon from "../../../assets/icon/icon-message-blast";
import NotificationIcon from "../../../assets/icon/icon-notification";
import PollingIcon from "../../../assets/icon/icon-polling";
import PositionIcon from "../../../assets/icon/icon-position";
import RequestIcon from "../../../assets/icon/icon-request";
import SystemIcon from "../../../assets/icon/icon-system";
import UserIcon from "../../../assets/icon/icon-user";

const Index = ({ onChange, selectedItem }) => {
  let user = getUser();
  const [role, setRole] = useState(user?.role_code);
  const [expanded, setExpanded] = useState(false);
  const onItemClicked = (item) => onChange(item);

  const isMobile = () => window.innerWidth <= 768;
  const toggleMenu = () =>
    setExpanded((prevState) => ({ expanded: !prevState.expanded }));
  const renderBurger = () => {
    return (
      <div onClick={toggleMenu} className={css(styles.burgerIcon)}>
        <IconBurger />
      </div>
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <Row
        className={css(styles.mainContainer)}
        breakpoints={{ 768: css(styles.mainContainerMobile) }}
      >
        {isMobile && !expanded && renderBurger}
        <Column
          className={css(styles.container)}
          breakpoints={{
            768: css(
              styles.containerMobile,
              expanded ? styles.show : styles.hide
            ),
          }}
        >
          <Logo />
          <Column className={css(styles.menuItemList)}>
            {role === "admin" && (
              <>
                <NavLink to="/dashboard" exact className={css(styles.navlink)}>
                  <MenuItemComponent
                    title="Dashboard"
                    icon={IconDashboard}
                    onClick={() => onItemClicked("Dashboard", "dashboard")}
                    active={selectedItem === "Dashboard"}
                  />
                </NavLink>
                <MenuItemComponent
                  title="Data Master"
                  icon={MasterIcon}
                  onClick={() => onItemClicked("Data Master")}
                  active={selectedItem === "Data Master"}
                  child={[
                    {
                      icon: HealthyIcon,
                      title: "Program Studi",
                      link: "/program-studi",
                    },
                    {
                      icon: BenefitIcon,
                      title: "Jurusan",
                      link: "/jurusan",
                    },
                  ]}
                />
                <MenuItemComponent
                  title="User"
                  icon={SystemIcon}
                  onClick={() => onItemClicked("User")}
                  active={selectedItem === "User"}
                  child={[
                    {
                      icon: AdminIcon,
                      title: "Mahasiswa",
                      link: "/user/mahasiswa",
                    },
                    {
                      icon: AdminIcon,
                      title: "Wali Kelas",
                      link: "/user/wali-kelas",
                    },
                    {
                      icon: AdminIcon,
                      title: "Ketua Program Studi",
                      link: "/user/ketua-program-studi",
                    },
                    {
                      icon: AdminIcon,
                      title: "Ketua Jurusan",
                      link: "/user/ketua-jurusan",
                    },
                    {
                      icon: AdminIcon,
                      title: "Pembantu Direktur III",
                      link: "/user/pembantu-direktur-3",
                    },
                  ]}
                />
              </>
            )}
            {role === "mahasiswa" && (
              <>
                <NavLink to="/profile" exact className={css(styles.navlink)}>
                  <MenuItemComponent
                    title="Profil"
                    icon={AdminIcon}
                    onClick={() => onItemClicked("Profil")}
                    active={selectedItem === "Profil"}
                  />
                </NavLink>
                <NavLink
                  to="/mahasiswa/beasiswa"
                  exact
                  className={css(styles.navlink)}
                >
                  <MenuItemComponent
                    title="Beasiswa"
                    icon={FinanceIcon}
                    onClick={() => onItemClicked("Beasiswa")}
                    active={selectedItem === "Beasiswa"}
                  />
                </NavLink>
                <NavLink to="/orang-tua" exact className={css(styles.navlink)}>
                  <MenuItemComponent
                    title="Orang Tua"
                    icon={MemberIcon}
                    onClick={() => onItemClicked("Orang Tua")}
                    active={selectedItem === "Orang Tua"}
                  />
                </NavLink>
                <NavLink to="/saudara" exact className={css(styles.navlink)}>
                  <MenuItemComponent
                    title="Saudara"
                    icon={AdminIcon}
                    onClick={() => onItemClicked("Saudara")}
                    active={selectedItem === "Saudara"}
                  />
                </NavLink>
                <NavLink
                  to="/data-berkas"
                  exact
                  className={css(styles.navlink)}
                >
                  <MenuItemComponent
                    title="Data Berkas"
                    icon={BerkasIcon}
                    onClick={() => onItemClicked("Data Berkas")}
                    active={selectedItem === "Data Berkas"}
                  />
                </NavLink>
                <MenuItemComponent
                  title="Sertifikat"
                  icon={BerkasIcon}
                  onClick={() => onItemClicked("Sertifikat")}
                  active={selectedItem === "Sertifikat"}
                  child={[
                    {
                      icon: Berkas2Icon,
                      title: "Prestasi",
                      link: "/sertifikat/prestasi",
                    },
                    {
                      icon: Berkas2Icon,
                      title: "Organisasi",
                      link: "/sertifikat/organisasi",
                    },
                  ]}
                />
              </>
            )}
            {role === "waliKelas" && (
              <>
                <NavLink
                  to="/wali-kelas/beasiswa"
                  exact
                  className={css(styles.navlink)}
                >
                  <MenuItemComponent
                    title="Beasiswa"
                    icon={FinanceIcon}
                    onClick={() => onItemClicked("Beasiswa")}
                    active={selectedItem === "Beasiswa"}
                  />
                </NavLink>
              </>
            )}
            {role === "ketuaProdi" && (
              <>
                <NavLink
                  to="/ketua-prodi/beasiswa"
                  exact
                  className={css(styles.navlink)}
                >
                  <MenuItemComponent
                    title="Beasiswa"
                    icon={FinanceIcon}
                    onClick={() => onItemClicked("Beasiswa")}
                    active={selectedItem === "Beasiswa"}
                  />
                </NavLink>
              </>
            )}
            {role === "ketuaJurusan" && (
              <>
                <NavLink
                  to="/ketua-jurusan/beasiswa"
                  exact
                  className={css(styles.navlink)}
                >
                  <MenuItemComponent
                    title="Beasiswa"
                    icon={FinanceIcon}
                    onClick={() => onItemClicked("Beasiswa")}
                    active={selectedItem === "Beasiswa"}
                  />
                </NavLink>
              </>
            )}
            {role === "pd3" && (
              <>
                {/* <NavLink to="/dashboard" exact className={css(styles.navlink)}>
                  <MenuItemComponent
                    title="Dashboard"
                    icon={AdminIcon}
                    onClick={() => onItemClicked("Dashboard")}
                    active={selectedItem === "Dashboard"}
                  />
                </NavLink> */}
                <NavLink
                  to="/pd-3/beasiswa"
                  exact
                  className={css(styles.navlink)}
                >
                  <MenuItemComponent
                    title="Beasiswa"
                    icon={FinanceIcon}
                    onClick={() => onItemClicked("Beasiswa")}
                    active={selectedItem === "Beasiswa"}
                  />
                </NavLink>
              </>
            )}
          </Column>
        </Column>
        {isMobile && expanded && (
          <div className={css(styles.outsideLayer)} onClick={toggleMenu}></div>
        )}
      </Row>
    </div>
  );
};

const styles = StyleSheet.create({
  burgerIcon: {
    cursor: "pointer",
    position: "absolute",
    left: 24,
    top: 34,
  },
  container: {
    width: 220,
    paddingTop: 32,
    height: "calc(100% - 32px)",
  },
  containerMobile: {
    transition: "left 0.5s, right 0.5s",
    position: "absolute",
    width: 220,
    height: "100%",
    zIndex: 901,
  },
  mainContainer: {
    height: "100%",
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, rgba(54,139,223,1) 0%, rgba(93,213,229,1) 100%);",
  },
  mainContainerMobile: {
    backgroundColor: "transparent",
    position: "absolute",
    minWidth: "100%",
    top: 0,
    left: 0,
  },
  menuItemList: {
    marginTop: 52,
  },
  outsideLayer: {
    position: "absolute",
    width: "100vw",
    minWidth: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,.50)",
    zIndex: 900,
  },
  separator: {
    borderTop: "1px solid #DFE0EB",
    marginTop: 16,
    marginBottom: 16,
    opacity: 0.06,
  },
  hide: {
    left: -220,
    backgroundColor: "#495057",
  },
  show: {
    left: 0,
    backgroundColor: "#495057",
  },
  navlink: {
    textDecoration: "none",
  },
});

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default Index;
