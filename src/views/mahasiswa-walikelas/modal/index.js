import React from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import { setWaliKelasModal } from "../../../store/actions/wali-kelas";
import Detail from "./detail";

const index = ({
  isOpenModal,
  modalType,
  onSetWaliKelasModal,
  handleRefresh,
}) => {
  const toggle = () => onSetWaliKelasModal("", !isOpenModal);
  const child = (modalType) => {
    switch (modalType) {
      case "detail":
        return <Detail />;
      default:
        return <div></div>;
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

const mapStateToProps = ({ waliKelas: { isOpenModal, modalType } }) => {
  return { isOpenModal, modalType };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetWaliKelasModal: (type, isOpen) =>
      dispatch(setWaliKelasModal(type, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
