import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput } from "../../../../components/commons/form";
import { setSertifikatPrestasiModal } from "../../../../store/actions/sertifikat/prestasi";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";

let detail = ({ onSetSertifikatPrestasiModal, pending }) => {
  return (
    <>
      <ModalHeader>Lihat SertifikatPrestasi</ModalHeader>
      <ModalBody>
        <form>
          <LabelInputVerticalComponent label="Nama SertifikatPrestasi">
            <Field
              name="nama"
              placeholder="Nama SertifikatPrestasi"
              component={formInput}
              disabled
            />
          </LabelInputVerticalComponent>
        </form>
        <Button
          variant="outlined"
          className="mt-3"
          disabled={pending}
          color="primary"
          onClick={() => onSetSertifikatPrestasiModal("", false)}
        >
          Kembali
        </Button>
      </ModalBody>
    </>
  );
};

detail = reduxForm({
  form: "sertifikatPrestasiDetail",
})(detail);

const mapStateToProps = ({ sertifikatPrestasi: { detailData, pending } }) => {
  let initialValues = {};
  if (detailData) {
    initialValues = {
      nama: detailData.nama,
    };
  }
  return {
    initialValues,
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSertifikatPrestasiModal: (modalType, isOpen) =>
      dispatch(setSertifikatPrestasiModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(detail);
