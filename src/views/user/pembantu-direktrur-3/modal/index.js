import React from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import { setPembantuDirektur3Modal } from "../../../../store/actions/user/pembantu-direktur-3";
import Detail from "./detail";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";

const index = ({
  isOpenModal,
  modalType,
  onSetPembantuDirektur3Modal,
  handleRefresh,
}) => {
  const toggle = () => onSetPembantuDirektur3Modal("", !isOpenModal);
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

const mapStateToProps = ({
  userPembantuDirektur3: { isOpenModal, modalType },
}) => {
  return { isOpenModal, modalType };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetPembantuDirektur3Modal: (type, isOpen) =>
      dispatch(setPembantuDirektur3Modal(type, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
