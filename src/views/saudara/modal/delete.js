import React from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import Saudara, { setSaudaraModal } from "../../../store/actions/saudara";

let Delete = ({
  onSetSaudaraModal,
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
      onSetSaudaraModal("", false);
      handleRefresh();
    };
    dispatch(Saudara.deleted(param, callback));
  };
  return (
    <>
      <ModalHeader>Hapus Saudara</ModalHeader>
      <ModalBody>
        Apakah anda yakin untuk menghapus saudara {detailData.nama} ?
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetSaudaraModal("", false)}
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
  form: "saudaraDelete",
})(Delete);

const mapStateToProps = ({ saudara: { detailData, pending } }) => {
  return {
    detailData,
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSaudaraModal: (modalType, isOpen) =>
      dispatch(setSaudaraModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
