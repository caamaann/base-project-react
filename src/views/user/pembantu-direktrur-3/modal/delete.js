import React from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import PembantuDirektur3, {
  setPembantuDirektur3Modal,
} from "../../../../store/actions/user/pembantu-direktur-3";

let Delete = ({
  onSetPembantuDirektur3Modal,
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
      onSetPembantuDirektur3Modal("", false);
      handleRefresh();
    };
    dispatch(PembantuDirektur3.deleted(param, callback));
  };
  return (
    <>
      <ModalHeader>Hapus Pembantu Direktur 3</ModalHeader>
      <ModalBody>
        Apakah anda yakin untuk menghapus pembantu direktur 3 {detailData.nama}{" "}
        ?
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetPembantuDirektur3Modal("", false)}
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
  form: "userPembantuDirektur3Delete",
})(Delete);

const mapStateToProps = ({
  userPembantuDirektur3: { detailData, pending },
}) => {
  return {
    detailData,
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetPembantuDirektur3Modal: (modalType, isOpen) =>
      dispatch(setPembantuDirektur3Modal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
