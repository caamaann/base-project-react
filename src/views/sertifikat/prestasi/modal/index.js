import React from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import { setSertifikatPrestasiModal } from "../../../../store/actions/sertifikat/prestasi";
import Detail from "./detail";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";
import ShowDocument from "./show-document";

const index = ({
  isOpenModal,
  modalType,
  onSetSertifikatPrestasiModal,
  handleRefresh,
  title,
  fileName,
  folderName,
}) => {
  const toggle = () => onSetSertifikatPrestasiModal("", !isOpenModal);
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
  sertifikatPrestasi: { isOpenModal, modalType, title, folderName, fileName },
}) => {
  return { isOpenModal, modalType, title, folderName, fileName };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSertifikatPrestasiModal: (type, isOpen) =>
      dispatch(setSertifikatPrestasiModal(type, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
