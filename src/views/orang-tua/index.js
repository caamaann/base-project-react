import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Container from "../../components/container";
import LeftContainer from "../../components/container/LeftContainer";
import RightContainer from "../../components/container/RightContainer";
import DetailMenu from "../../components/global-components/DetailMenu";
import DetailStatus from "../../components/global-components/DetailStatus";
import OrangTua, {
  setOrangTuaData,
  setOrangTuaModal,
} from "../../store/actions/orang-tua";
import { Row, Column } from "simple-flexbox";
import DataAyah from "./data-ayah";
import DataIbu from "./data-ibu";
import { getUser } from "../../utils/user";
import { StyleSheet, css } from "aphrodite";
import CircularProgress from "@material-ui/core/CircularProgress";

let Index = ({ detailData, pending }) => {
  const [selectedMenu, setSelectedMenu] = useState("data-ayah");
  const dispatch = useDispatch();
  const user = getUser();

  useEffect(() => {
    getDetailOrangTua();
  }, []);

  const getDetailOrangTua = () => dispatch(OrangTua.get());

  return (
    <Container>
      <Row>
        <LeftContainer horizontal="center">
          <DetailMenu
            onClick={() => setSelectedMenu("data-ayah")}
            menuName="Ayah"
            isActive={selectedMenu === "data-ayah"}
          />
          <DetailMenu
            onClick={() => setSelectedMenu("data-ibu")}
            menuName="Ibu"
            isActive={selectedMenu === "data-ibu"}
          />
        </LeftContainer>
        <RightContainer>
          {
            // pending ? (
            //   <CircularProgress color="primary" />
            // ) :
            selectedMenu === "data-ayah" ? (
              <DataAyah />
            ) : selectedMenu === "data-ibu" ? (
              <DataIbu />
            ) : (
              <div></div>
            )
          }
        </RightContainer>
      </Row>
    </Container>
  );
};

const mapStateToProps = ({ orangTua: { detailData, pending } }) => {
  return { detailData, pending };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetOrangTuaModal: (modalType, isOpen) =>
      dispatch(setOrangTuaModal(modalType, isOpen)),
    onSetOrangTuaData: (data) => dispatch(setOrangTuaData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
