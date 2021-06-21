import React from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import ProgramStudi, {
  setProgramStudiModal,
} from "../../../../store/actions/master/program-studi";

let Delete = ({
  onSetProgramStudiModal,
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
      onSetProgramStudiModal("", false);
      handleRefresh();
    };
    dispatch(ProgramStudi.deleted(param, callback));
  };
  return (
    <>
      <ModalHeader>Hapus Program Studi</ModalHeader>
      <ModalBody>
        Apakah anda yakin untuk menghapus program studi {detailData.nama} ?
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetProgramStudiModal("", false)}
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
  form: "programStudiDelete",
})(Delete);

const mapStateToProps = ({ programStudi: { detailData, pending } }) => {
  return {
    detailData,
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetProgramStudiModal: (modalType, isOpen) =>
      dispatch(setProgramStudiModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delete);
