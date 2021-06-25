import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput } from "../../../components/commons/form";
import { setBeasiswaModal } from "../../../store/actions/beasiswa";
import LabelInputVerticalComponent from "../../../components/global-components/LabelInputVertical";

let detail = ({ onSetBeasiswaModal, pending }) => {
  return (
    <>
      <ModalHeader>Lihat Beasiswa</ModalHeader>
      <ModalBody>
        <form>
          <LabelInputVerticalComponent label="Nama Beasiswa">
            <Field
              name="nama"
              placeholder="Nama Beasiswa"
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
          onClick={() => onSetBeasiswaModal("", false)}
        >
          Kembali
        </Button>
      </ModalBody>
    </>
  );
};

detail = reduxForm({
  form: "beasiswaDetail",
})(detail);

const mapStateToProps = ({ beasiswa: { detailData, pending } }) => {
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
    onSetBeasiswaModal: (modalType, isOpen) =>
      dispatch(setBeasiswaModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(detail);
