import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput } from "../../../components/commons/form";
import { setSaudaraModal } from "../../../store/actions/saudara";
import LabelInputVerticalComponent from "../../../components/global-components/LabelInputVertical";

let detail = ({ onSetSaudaraModal, pending }) => {
  return (
    <>
      <ModalHeader>Lihat Saudara</ModalHeader>
      <ModalBody>
        <form>
          <LabelInputVerticalComponent label="Nama">
            <Field
              name="nama"
              placeholder="Nama"
              component={formInput}
              disabled
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Usia">
            <Field
              name="usia"
              placeholder="Usia"
              component={formInput}
              disabled
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Status Pernikahan">
            <Field
              name="status_pernikahan"
              placeholder="Status Pernikahan"
              disabled
              component={formInput}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Status Saudara">
            <Field
              name="status_saudara"
              placeholder="Status Saudara"
              disabled
              component={formInput}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Status Pekerjaan">
            <Field
              name="status_pekerjaan"
              placeholder="Status Pekerjaan"
              disabled
              component={formInput}
            />
          </LabelInputVerticalComponent>
        </form>
        <Button
          variant="outlined"
          className="mt-3"
          disabled={pending}
          color="primary"
          onClick={() => onSetSaudaraModal("", false)}
        >
          Kembali
        </Button>
      </ModalBody>
    </>
  );
};

detail = reduxForm({
  form: "saudaraDetail",
})(detail);

const mapStateToProps = ({ saudara: { detailData, pending } }) => {
  let initialValues = {};
  if (detailData) {
    initialValues = {
      nama: detailData.nama,
      usia: detailData.usia,
      status_pernikahan: detailData.status_pernikahan,
      status_saudara: detailData.status_saudara,
      status_pekerjaan: detailData.status_pekerjaan,
    };
  }
  return {
    initialValues,
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSaudaraModal: (modalType, isOpen) =>
      dispatch(setSaudaraModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(detail);
