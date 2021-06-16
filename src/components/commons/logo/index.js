import React from "react";
import { Row, Col } from "reactstrap";
import Logo from "../../../assets/icon/icon-default-profil";

const Index = () => {
  return (
    <img
      src={Logo}
      alt="cpi-logo"
      style={{ width: 300, height: 40, alignSelf: "center" }}
    ></img>
  );
};

export default Index;
