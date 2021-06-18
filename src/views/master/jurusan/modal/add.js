import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput } from "../../../../components/commons/form";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";
import Jurusan, {
  setJurusanModal,
} from "../../../../store/actions/master/jurusan";

let Add = ({ onSetJurusanModal, handleSubmit, handleRefresh, pending }) => {
  const dispatch = useDispatch();

  const onSubmit = ({ nama }) => {
    const param = {
      nama,
    };
    const callback = () => {
      onSetJurusanModal("", false);
      handleRefresh();
    };
    dispatch(Jurusan.post(param, callback));
  };
  return (
    <>
      <ModalHeader>Tambah Jurusan</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInputVerticalComponent label="Nama Jurusan">
            <Field
              name="nama"
              placeholder="Nama Jurusan"
              component={formInput}
            />
          </LabelInputVerticalComponent>
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
              className="mt-3"
              disabled={pending}
              variant="contained"
              color="primary"
            >
              Simpan
            </Button>
          </div>
        </form>
      </ModalBody>
    </>
  );
};

const validate = ({ nama }) => {
  const errors = {};
  if (!nama) {
    errors.nama = "Nama jurusan harus diisi";
  }

  return errors;
};

Add = reduxForm({
  form: "jurusanAdd",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Add);

const mapStateToProps = ({ jurusan: { pending } }) => {
  return { pending };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetJurusanModal: (modalType, isOpen) =>
      dispatch(setJurusanModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
