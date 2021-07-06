import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput } from "../../../../components/commons/form";
import { setSertifikatOrganisasiModal } from "../../../../store/actions/sertifikat/organisasi";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";

let detail = ({ onSetSertifikatOrganisasiModal, pending }) => {
  return (
    <>
      <ModalHeader>Lihat SertifikatOrganisasi</ModalHeader>
      <ModalBody>
        <form>
          <LabelInputVerticalComponent label="Nama SertifikatOrganisasi">
            <Field
              name="nama"
              placeholder="Nama SertifikatOrganisasi"
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
          onClick={() => onSetSertifikatOrganisasiModal("", false)}
        >
          Kembali
        </Button>
      </ModalBody>
    </>
  );
};

detail = reduxForm({
  form: "sertifikatOrganisasiDetail",
})(detail);

const mapStateToProps = ({ sertifikatOrganisasi: { detailData, pending } }) => {
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
    onSetSertifikatOrganisasiModal: (modalType, isOpen) =>
      dispatch(setSertifikatOrganisasiModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(detail);
