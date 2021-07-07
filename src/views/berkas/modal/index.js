import React from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import { setMahasiswaModal } from "../../../store/actions/mahasiswa";
import ShowDocument from "./show-document";

const index = ({
  isOpenModal,
  modalType,
  onSetMahasiswaModal,
  handleRefresh,
  title,
  fileName,
  folderName,
}) => {
  const toggle = () => onSetMahasiswaModal("", !isOpenModal);
  const child = (modalType) => {
    switch (modalType) {
      case "show-document":
        return (
          <ShowDocument
            title={title}
            fileName={fileName}
            folderName={folderName}
          />
        );
    }
  };
  return (
    <Modal
      className="modal-medium"
      isOpen={isOpenModal}
      toggle={toggle}
      centered
    >
      {child(modalType)}
    </Modal>
  );
};

const mapStateToProps = ({
  mahasiswa: { isOpenModal, modalType, title, folderName, fileName },
}) => {
  return { isOpenModal, modalType, title, folderName, fileName };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMahasiswaModal: (type, isOpen) =>
      dispatch(setMahasiswaModal(type, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
