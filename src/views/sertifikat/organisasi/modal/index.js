import React from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import { setSertifikatOrganisasiModal } from "../../../../store/actions/sertifikat/organisasi";
import Detail from "./detail";
import Add from "./add";
import Edit from "./edit";
import Delete from "./delete";
import ShowDocument from "./show-document";

const index = ({
  isOpenModal,
  modalType,
  onSetSertifikatOrganisasiModal,
  handleRefresh,
  title,
  fileName,
  folderName,
}) => {
  const toggle = () => onSetSertifikatOrganisasiModal("", !isOpenModal);
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
  sertifikatOrganisasi: { isOpenModal, modalType, title, folderName, fileName },
}) => {
  return { isOpenModal, modalType, title, folderName, fileName };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSertifikatOrganisasiModal: (type, isOpen) =>
      dispatch(setSertifikatOrganisasiModal(type, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
