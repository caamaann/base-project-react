import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput } from "../../../../components/commons/form";
import { setJurusanModal } from "../../../../store/actions/master/jurusan";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";

let detail = ({ onSetJurusanModal, pending }) => {
  return (
    <>
      <ModalHeader>Lihat Jurusan</ModalHeader>
      <ModalBody>
        <form>
          <LabelInputVerticalComponent label="Nama Jurusan">
            <Field
              name="nama"
              placeholder="Nama Jurusan"
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
          onClick={() => onSetJurusanModal("", false)}
        >
          Kembali
        </Button>
      </ModalBody>
    </>
  );
};

detail = reduxForm({
  form: "jurusanDetail",
})(detail);

const mapStateToProps = ({ jurusan: { detailData, pending } }) => {
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
    onSetJurusanModal: (modalType, isOpen) =>
      dispatch(setJurusanModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(detail);
