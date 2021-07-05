import React from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import Beasiswa, { setBeasiswaModal } from "../../../store/actions/beasiswa";

let Delete = ({
  onSetBeasiswaModal,
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
      onSetBeasiswaModal("", false);
      handleRefresh();
    };
    dispatch(Beasiswa.deleted(param, callback));
  };
  return (
    <>
      <ModalHeader>Hapus Beasiswa</ModalHeader>
      <ModalBody>
        Apakah anda yakin untuk menghapus beasiswa {detailData.nama} ?
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetBeasiswaModal("", false)}
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
  form: "beasiswaDelete",
})(Delete);

const mapStateToProps = ({ beasiswa: { detailData, pending } }) => {
  return {
    detailData,
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetBeasiswaModal: (modalType, isOpen) =>
      dispatch(setBeasiswaModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
