import { StyleSheet, css } from "aphrodite";
import { Column, Row } from "simple-flexbox";
import { connect } from "react-redux";
import Avatar from "../../components/profile/avatar";
import Mahasiswa, {
  setMahasiswaData,
  setMahasiswaModal,
} from "../../store/actions/user/mahasiswa";

const Profile = ({ onSetMahasiswaModal, img_profile, name, prodi }) => {
  const path = window.location.pathname.split("/");

  let names = name ? name : "-";
  let program_studi = prodi ? prodi : "-";
  return (
    <Column style={{ width: "100%" }} horizontal="center">
      <div
        style={{
          width: 100,
          height: 100,
          position: "relative",
          marginBottom: 20,
        }}
      >
        <Avatar image={img_profile} />
      </div>
      <h5 style={{ textAlign: "center", marginBottom: 20 }}>{names}</h5>
      <h6 style={{ textAlign: "center" }}>{program_studi}</h6>
    </Column>
  );
};

const styles = StyleSheet.create({
  clickableIcon: {
    ":hover": {
      cursor: "pointer",
    },
  },
});

const mapStateToProps = ({ userMahasiswa: { data, detailData } }) => {
  return { data, detailData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMahasiswaModal: (modalType, isOpen) =>
      dispatch(setMahasiswaModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
