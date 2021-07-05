import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import {
  formInput,
  formInputNumber,
} from "../../../../components/commons/form";
import PembantuDirektur3, {
  setPembantuDirektur3Modal,
} from "../../../../store/actions/user/pembantu-direktur-3";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";

let Edit = ({
  onSetPembantuDirektur3Modal,
  handleSubmit,
  detailData,
  handleRefresh,
  pending,
}) => {
  const dispatch = useDispatch();

  const onSubmit = ({ nip, nama }) => {
    const param = {
      id: detailData.id,
      nip: nip,
      nama,
    };
    const callback = () => {
      onSetPembantuDirektur3Modal("", false);
      handleRefresh();
    };
    dispatch(PembantuDirektur3.put(param, callback));
  };

  return (
    <>
      <ModalHeader>Edit Pembantu Direktur 3</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInputVerticalComponent label="NIP">
            <Field
              name="nip"
              placeholder="NIP Pembantu Direktur 3"
              component={formInputNumber}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Nama">
            <Field
              name="nama"
              placeholder="Nama Pembantu Direktur 3"
              component={formInput}
            />
          </LabelInputVerticalComponent>
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
              Simpan
            </Button>
          </div>
        </form>
      </ModalBody>
    </>
  );
};

const validate = ({ nip, nama }) => {
  const errors = {};
  if (!nip) {
    errors.nip = "NIP harus diisi";
  }
  if (!nama) {
    errors.nama = "Nama Pembantu Direktur 3 harus diisi";
  }

  return errors;
};

Edit = reduxForm({
  form: "userPembantuDirektur3Edit",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Edit);

const mapStateToProps = ({
  userPembantuDirektur3: { detailData, pending },
}) => {
  let initialValues = {};
  if (detailData) {
    initialValues = {
      nama: detailData.nama,
      nip: detailData.nip,
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
    onSetPembantuDirektur3Modal: (modalType, isOpen) =>
      dispatch(setPembantuDirektur3Modal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
