import React from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import SertifikatPrestasi, {
  setSertifikatPrestasiModal,
} from "../../../../store/actions/sertifikat/prestasi";

let Delete = ({
  onSetSertifikatPrestasiModal,
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
      onSetSertifikatPrestasiModal("", false);
      handleRefresh();
    };
    dispatch(SertifikatPrestasi.deleted(param, callback));
  };
  return (
    <>
      <ModalHeader>Hapus Sertifikat Prestasi</ModalHeader>
      <ModalBody>
        Apakah anda yakin untuk menghapus sertifikat Prestasi ?
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetSertifikatPrestasiModal("", false)}
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
  form: "sertifikatPrestasiDelete",
})(Delete);

const mapStateToProps = ({ sertifikatPrestasi: { detailData, pending } }) => {
  return {
    detailData,
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSertifikatPrestasiModal: (modalType, isOpen) =>
      dispatch(setSertifikatPrestasiModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
