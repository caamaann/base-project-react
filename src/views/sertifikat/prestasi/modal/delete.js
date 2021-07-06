import React from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import Jurusan, {
  setJurusanModal,
} from "../../../../store/actions/master/jurusan";

let Delete = ({
  onSetJurusanModal,
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
      onSetJurusanModal("", false);
      handleRefresh();
    };
    dispatch(Jurusan.deleted(param, callback));
  };
  return (
    <>
      <ModalHeader>Hapus Jurusan</ModalHeader>
      <ModalBody>
        Apakah anda yakin untuk menghapus jurusan {detailData.nama} ?
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetJurusanModal("", false)}
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
  form: "jurusanDelete",
})(Delete);

const mapStateToProps = ({ jurusan: { detailData, pending } }) => {
  return {
    detailData,
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetJurusanModal: (modalType, isOpen) =>
      dispatch(setJurusanModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
