import React from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import SertifikatOrganisasi, {
  setSertifikatOrganisasiModal,
} from "../../../../store/actions/sertifikat/organisasi";

let Delete = ({
  onSetSertifikatOrganisasiModal,
  handleSubmit,
  detailData,
  handleRefresh,
  pending,
}) => {
  const dispatch = useDispatch();

  const onSubmit = () => {
    const param = {
      id: detailData.id,
    };
    const callback = () => {
      onSetSertifikatOrganisasiModal("", false);
      handleRefresh();
    };
    dispatch(SertifikatOrganisasi.deleted(param, callback));
  };
  return (
    <>
      <ModalHeader>Hapus Sertifikat Organisasi</ModalHeader>
      <ModalBody>
        Apakah anda yakin untuk menghapus sertifikat Organisasi ?
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetSertifikatOrganisasiModal("", false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={pending}
              className="mt-3"
              variant="contained"
              color="primary"
            >
              Hapus
            </Button>
          </div>
        </form>
      </ModalBody>
    </>
  );
};

Delete = reduxForm({
  form: "sertifikatOrganisasiDelete",
})(Delete);

const mapStateToProps = ({ sertifikatOrganisasi: { detailData, pending } }) => {
  return {
    detailData,
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSertifikatOrganisasiModal: (modalType, isOpen) =>
      dispatch(setSertifikatOrganisasiModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
