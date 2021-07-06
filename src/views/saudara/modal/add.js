import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput, formInputNumber } from "../../../components/commons/form";
import Radio from "../../../components/commons/form/radio";
import LabelInputVerticalComponent from "../../../components/global-components/LabelInputVertical";
import Saudara, { setSaudaraModal } from "../../../store/actions/saudara";

let Add = ({ onSetSaudaraModal, handleSubmit, handleRefresh, pending }) => {
  const dispatch = useDispatch();

  const onSubmit = ({
    nama,
    usia,
    status_pernikahan,
    status_saudara,
    status_pekerjaan,
  }) => {
    const param = {
      nama,
      usia,
      status_pernikahan,
      status_saudara,
      status_pekerjaan,
    };
    const callback = () => {
      onSetSaudaraModal("", false);
      handleRefresh();
    };
    dispatch(Saudara.post(param, callback));
  };
  return (
    <>
      <ModalHeader>Tambah Saudara</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInputVerticalComponent label="Nama">
            <Field name="nama" placeholder="Nama" component={formInput} />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Usia">
            <Field name="usia" placeholder="Usia" component={formInputNumber} />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Status Pernikahan">
            <Field
              name="status_pernikahan"
              placeholder="Status Pernikahan"
              options={{
                "Belum menikah": "Belum menikah",
                Menikah: "Menikah",
              }}
              component={Radio}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Status Saudara">
            <Field
              name="status_saudara"
              placeholder="Status Saudara"
              options={{
                Kakak: "Kakak",
                Adik: "Adik",
              }}
              component={Radio}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Status Pekerjaan">
            <Field
              name="status_pekerjaan"
              placeholder="Status Pekerjaan"
              options={{
                "Belum bekerja": "Belum bekerja",
                Bekerja: "Bekerja",
              }}
              component={Radio}
            />
          </LabelInputVerticalComponent>
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

const validate = ({
  nama,
  usia,
  status_pernikahan,
  status_saudara,
  status_pekerjaan,
}) => {
  const errors = {};
  if (!nama) {
    errors.nama = "Nama saudara harus diisi";
  }
  if (!usia) {
    errors.usia = "Usia harus diisi";
  }
  if (!status_pernikahan) {
    errors.status_pernikahan = "Status pernikahan harus diisi";
  }
  if (!status_saudara) {
    errors.status_saudara = "Status saudara harus diisi";
  }
  if (!status_pekerjaan) {
    errors.status_pekerjaan = "Status pekerjaan harus diisi";
  }

  return errors;
};

Add = reduxForm({
  form: "saudaraAdd",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Add);

const mapStateToProps = ({ saudara: { pending } }) => {
  return { pending };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSaudaraModal: (modalType, isOpen) =>
      dispatch(setSaudaraModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
