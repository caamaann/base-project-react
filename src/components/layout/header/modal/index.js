import React from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import { setHeaderModal } from "../../../../store/actions/header";
import ChangePassword from "./change-password";

const index = ({ isOpenModal, modalType, onSetHeaderModal, handleRefresh }) => {
  const toggle = () => onSetHeaderModal("", !isOpenModal);
  const child = (modalType) => {
    switch (modalType) {
      case "change-password":
        return <ChangePassword handleRefresh={handleRefresh} />;
    }
  };
  return (
    <Modal
      className="modal-small"
      isOpen={isOpenModal}
      toggle={toggle}
      centered
    >
      {child(modalType)}
    </Modal>
  );
};

const mapStateToProps = ({ headerModal: { isOpenModal, modalType } }) => {
  return { isOpenModal, modalType };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetHeaderModal: (type, isOpen) => dispatch(setHeaderModal(type, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
