import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput } from "../../../../components/commons/form";
import { setProgramStudiModal } from "../../../../store/actions/master/program-studi";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";

let detail = ({ onSetProgramStudiModal, pending }) => {
  return (
    <>
      <ModalHeader>Lihat Program Studi</ModalHeader>
      <ModalBody>
        <form>
          <LabelInputVerticalComponent label="Nama Program Studi">
            <Field
              name="nama"
              placeholder="Nama Program Studi"
              component={formInput}
              disabled
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Nama Jurusan">
            <Field
              name="jurusan"
              placeholder="Nama Jurusan"
              component={formInput}
              disabled
            />
          </LabelInputVerticalComponent>
        </form>
        <Button
          variant="outlined"
          disabled={pending}
          className="mt-3"
          color="primary"
          onClick={() => onSetProgramStudiModal("", false)}
        >
          Kembali
        </Button>
      </ModalBody>
    </>
  );
};

detail = reduxForm({
  form: "programStudiDetail",
})(detail);

const mapStateToProps = ({ programStudi: { detailData, pending } }) => {
  let initialValues = {};
  if (detailData) {
    initialValues = {
      jurusan: detailData.jurusan_nama,
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
    onSetProgramStudiModal: (modalType, isOpen) =>
      dispatch(setProgramStudiModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(detail);
