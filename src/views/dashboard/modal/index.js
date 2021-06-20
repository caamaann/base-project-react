import React from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import { setBeasiswaModal } from "../../../store/actions/beasiswa";
import Detail from "./detail";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";

const index = ({
  isOpenModal,
  modalType,
  onSetBeasiswaModal,
  handleRefresh,
}) => {
  const toggle = () => onSetBeasiswaModal("", !isOpenModal);
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
      className="modal-small"
      isOpen={isOpenModal}
      toggle={toggle}
      centered
    >
      {child(modalType)}
    </Modal>
  );
};

const mapStateToProps = ({ beasiswa: { isOpenModal, modalType } }) => {
  return { isOpenModal, modalType };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetBeasiswaModal: (type, isOpen) =>
      dispatch(setBeasiswaModal(type, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
