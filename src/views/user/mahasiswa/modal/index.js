import React from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import { setMahasiswaModal } from "../../../../store/actions/user/mahasiswa";
import Detail from "./detail";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";

const index = ({
  isOpenModal,
  modalType,
  onSetMahasiswaModal,
  handleRefresh,
}) => {
  const toggle = () => onSetMahasiswaModal("", !isOpenModal);
  const child = (modalType) => {
    switch (modalType) {
      case "add":
        return <Add handleRefresh={handleRefresh} />;
      case "detail":
        return <Detail />;
      case "edit":
        return <Edit handleRefresh={handleRefresh} />;
      case "delete":
        return <Delete handleRefresh={handleRefresh} />;
    }
  };
  return (
    <Modal
      className={modalType === "delete" ? "modal-small" : "modal-large"}
      isOpen={isOpenModal}
      toggle={toggle}
      centered
    >
      {child(modalType)}
    </Modal>
  );
};

const mapStateToProps = ({ userMahasiswa: { isOpenModal, modalType } }) => {
  return { isOpenModal, modalType };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMahasiswaModal: (type, isOpen) =>
      dispatch(setMahasiswaModal(type, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
