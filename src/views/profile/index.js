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
import Profile from "./profile";
import { Row, Column } from "simple-flexbox";
import DataMahasiswa from "./data-mahasiswa";
import { getUser } from "../../utils/user";
import { StyleSheet, css } from "aphrodite";
import CircularProgress from "@material-ui/core/CircularProgress";
import avatarImage from "../../assets/img/avatar.png";

let Index = ({ detailData, pending }) => {
  const dispatch = useDispatch();
  const user = getUser();

  useEffect(() => {
    getDetailMahasiswa();
  }, []);

  const getDetailMahasiswa = () =>
    dispatch(Mahasiswa.getDetail({ id: user.profile.id }));

  return (
    <Container>
      <Row>
        <LeftContainer horizontal="center">
          {/* {pending ? (
            <CircularProgress color="primary" />
          ) : (
            <> */}
          <Profile
            img_profile={avatarImage}
            name={detailData?.nama}
            prodi={detailData?.program_studi?.nama}
          />
          <DetailStatus>
            <Row className={css(styles.detailMahasiswaStatusID)}>
              <span className={css(styles.detailMahasiswaStatusIDFont)}>
                NIM {detailData?.nim ? detailData.nim : "-"}
              </span>
            </Row>
            <Row className={css(styles.detailMemberStatusButton)}>
              <span className={css(styles.detailMemberStatusButtonFont)}>
                IPK {detailData?.ipk ? detailData.ipk : "-"}
              </span>
            </Row>
          </DetailStatus>
          {/* </>
          )} */}
        </LeftContainer>
        <RightContainer>
          {pending ? <CircularProgress color="primary" /> : <DataMahasiswa />}
        </RightContainer>
      </Row>
    </Container>
  );
};

const mapStateToProps = ({
  userMahasiswa: { data, detailData, pending },
  region,
}) => {
  return { data, detailData, pending, region };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMahasiswaModal: (modalType, isOpen) =>
      dispatch(setMahasiswaModal(modalType, isOpen)),
    onSetMahasiswaData: (data) => dispatch(setMahasiswaData(data)),
  };
};

const styles = StyleSheet.create({
  detailMahasiswaStatusID: {
    padding: "10px 20px",
    border: "2px solid #49aee2",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  detailMahasiswaStatusIDFont: {
    color: "#49aee2",
  },
  detailMemberStatusButton: {
    padding: "10px",
    backgroundColor: "#49aee2",
    border: "2px solid #49aee2",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    height: "100%",
    alignItems: "center",
  },
  detailMemberStatusButtonFont: {
    color: "#FFFFFF",
    marginRight: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
