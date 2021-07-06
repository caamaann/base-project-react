import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput } from "../../../components/commons/form";
import Beasiswa, { setBeasiswaModal } from "../../../store/actions/beasiswa";
import LabelInputVerticalComponent from "../../../components/global-components/LabelInputVertical";

let Edit = ({
  onSetBeasiswaModal,
  handleSubmit,
  detailData,
  handleRefresh,
  pending,
}) => {
  const dispatch = useDispatch();

  const onSubmit = ({ nama }) => {
    const param = {
      id: detailData.id,
      nama,
    };
    const callback = () => {
      onSetBeasiswaModal("", false);
      handleRefresh();
    };
    dispatch(Beasiswa.put(param, callback));
  };
  return (
    <>
      <ModalHeader>Edit Beasiswa</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInputVerticalComponent label="Nama Beasiswa">
            <Field
              name="nama"
              placeholder="Nama Beasiswa"
              component={formInput}
            />
          </LabelInputVerticalComponent>

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
    errors.nama = "Nama beasiswa harus diisi";
  }

  return errors;
};

Edit = reduxForm({
  form: "beasiswaEdit",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Edit);

const mapStateToProps = ({ beasiswa: { detailData, pending } }) => {
  let initialValues = {};
  if (detailData) {
    initialValues = {
      code: detailData.code,
      nama: detailData.nama,
    };
  }
  return {
    detailData,
    initialValues,
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetBeasiswaModal: (modalType, isOpen) =>
      dispatch(setBeasiswaModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
