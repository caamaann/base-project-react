import React from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import Kuota, { setKuotaModal } from "../../../../store/actions/kuota";

let Delete = ({
  onSetKuotaModal,
  handleSubmit,
  detailData,
  handleRefresh,
  pending,
}) => {
  const dispatch = useDispatch();

  const onSubmit = () => {
    const param = {
      beasiswa_id: detailData.beasiswa_id,
      program_studi_id: detailData.program_studi_id,
      angkatan: detailData.angkatan,
    };
    const callback = () => {
      onSetKuotaModal("", false);
      handleRefresh();
    };
    dispatch(Kuota.deleted(param, callback));
  };
  return (
    <>
      <ModalHeader>Hapus Kuota</ModalHeader>
      <ModalBody>
        Apakah anda yakin untuk menghapus kuota program studi {detailData.nama}{" "}
        ?
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetKuotaModal("", false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="mt-3"
              disabled={pending}
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
  form: "kuotaDelete",
})(Delete);

const mapStateToProps = ({ kuota: { detailData, pending } }) => {
  return {
    detailData,
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetKuotaModal: (modalType, isOpen) =>
      dispatch(setKuotaModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
