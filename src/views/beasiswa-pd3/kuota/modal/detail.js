import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput } from "../../../../components/commons/form";
import { setKuotaModal } from "../../../../store/actions/kuota";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";

let detail = ({ onSetKuotaModal, pending }) => {
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
          onClick={() => onSetKuotaModal("", false)}
        >
          Kembali
        </Button>
      </ModalBody>
    </>
  );
};

detail = reduxForm({
  form: "kuotaDetail",
})(detail);

const mapStateToProps = ({ kuota: { detailData, pending } }) => {
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
    onSetKuotaModal: (modalType, isOpen) =>
      dispatch(setKuotaModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(detail);
