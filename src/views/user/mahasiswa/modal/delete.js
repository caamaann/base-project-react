import React from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import Mahasiswa, {
  setMahasiswaModal,
} from "../../../../store/actions/user/mahasiswa";

let Delete = ({
  onSetMahasiswaModal,
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
      onSetMahasiswaModal("", false);
      handleRefresh();
    };
    dispatch(Mahasiswa.deleted(param, callback));
  };
  return (
    <>
      <ModalHeader>Hapus Mahasiswa</ModalHeader>
      <ModalBody>
        Apakah anda yakin untuk menghapus mahasiswa {detailData.nama} ?
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetMahasiswaModal("", false)}
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
  form: "userMahasiswaDelete",
})(Delete);

const mapStateToProps = ({ userMahasiswa: { detailData, pending } }) => {
  return {
    detailData,
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMahasiswaModal: (modalType, isOpen) =>
      dispatch(setMahasiswaModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
