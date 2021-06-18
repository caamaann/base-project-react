import React from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import { setProgramStudiModal } from "../../../../store/actions/master/program-studi";
import Detail from "./detail";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";

const index = ({
  isOpenModal,
  modalType,
  onSetProgramStudiModal,
  handleRefresh,
}) => {
  const toggle = () => onSetProgramStudiModal("", !isOpenModal);
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

const mapStateToProps = ({ programStudi: { isOpenModal, modalType } }) => {
  return { isOpenModal, modalType };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetProgramStudiModal: (type, isOpen) =>
      dispatch(setProgramStudiModal(type, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
