import React from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import KetuaProgramStudi, {
  setKetuaProgramStudiModal,
} from "../../../../store/actions/user/ketua-program-studi";

let Delete = ({
  onSetKetuaProgramStudiModal,
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
      onSetKetuaProgramStudiModal("", false);
      handleRefresh();
    };
    dispatch(KetuaProgramStudi.deleted(param, callback));
  };
  return (
    <>
      <ModalHeader>Hapus Ketua Program Studi</ModalHeader>
      <ModalBody>
        Apakah anda yakin untuk menghapus ketua program studi {detailData.nama}{" "}
        ?
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetKetuaProgramStudiModal("", false)}
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
  form: "userKetuaProgramStudiDelete",
})(Delete);

const mapStateToProps = ({
  userKetuaProgramStudi: { detailData, pending },
}) => {
  return {
    detailData,
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetKetuaProgramStudiModal: (modalType, isOpen) =>
      dispatch(setKetuaProgramStudiModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
