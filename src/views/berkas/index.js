import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Container from "../../components/container";
import LeftContainer from "../../components/container/LeftContainer";
import RightContainer from "../../components/container/RightContainer";
import DetailMenu from "../../components/global-components/DetailMenu";
import DetailStatus from "../../components/global-components/DetailStatus";
import Mahasiswa, {
  setMahasiswaData,
  setMahasiswaModal,
} from "../../store/actions/user/mahasiswa";
import { Row, Column } from "simple-flexbox";
import BerkasWajib from "./berkas-wajib";
import SertifikatWajib from "./sertifikat-wajib";
import { getUser } from "../../utils/user";
import Modal from "./modal";
import { StyleSheet, css } from "aphrodite";
import CircularProgress from "@material-ui/core/CircularProgress";

let Index = ({ detailData, pending }) => {
  const [selectedMenu, setSelectedMenu] = useState("berkas-wajib");
  const dispatch = useDispatch();
  const user = getUser();

  useEffect(() => {
    getDetailMahasiswa();
  }, []);

  const getDetailMahasiswa = () =>
    dispatch(Mahasiswa.getDetail({ id: user.profile.id }));

  return (
    <Container>
      <Modal />
      <Row>
        <LeftContainer horizontal="center">
          <DetailMenu
            onClick={() => setSelectedMenu("berkas-wajib")}
            menuName="Berkas Wajib"
            isActive={selectedMenu === "berkas-wajib"}
          />
          <DetailMenu
            onClick={() => setSelectedMenu("sertifikat-wajib")}
            menuName="Sertifikat Wajib"
            isActive={selectedMenu === "sertifikat-wajib"}
          />
        </LeftContainer>
        <RightContainer>
          {selectedMenu === "berkas-wajib" ? (
            <BerkasWajib />
          ) : selectedMenu === "sertifikat-wajib" ? (
            <SertifikatWajib />
          ) : (
            <div></div>
          )}
        </RightContainer>
      </Row>
    </Container>
  );
};

const mapStateToProps = ({ userMahasiswa: { detailData, pending } }) => {
  return { detailData, pending };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMahasiswaModal: (modalType, isOpen, title, folderName, fileName) =>
      dispatch(
        setMahasiswaModal(modalType, isOpen, title, folderName, fileName)
      ),
    onSetMahasiswaData: (data) => dispatch(setMahasiswaData(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
