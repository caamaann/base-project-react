import React from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import { setJurusanModal } from "../../../../store/actions/master/jurusan";
import Detail from "./detail";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";

const index = ({
  isOpenModal,
  modalType,
  onSetJurusanModal,
  handleRefresh,
}) => {
  const toggle = () => onSetJurusanModal("", !isOpenModal);
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

const mapStateToProps = ({ jurusan: { isOpenModal, modalType } }) => {
  return { isOpenModal, modalType };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetJurusanModal: (type, isOpen) =>
      dispatch(setJurusanModal(type, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
