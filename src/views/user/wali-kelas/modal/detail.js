import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput } from "../../../../components/commons/form";
import { setWaliKelasModal } from "../../../../store/actions/user/wali-kelas";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";

let detail = ({ onSetWaliKelasModal, pending }) => {
  return (
    <>
      <ModalHeader>Lihat Wali Kelas</ModalHeader>
      <ModalBody>
        <form>
          <LabelInputVerticalComponent label="Nama Wali Kelas">
            <Field
              name="nama"
              placeholder="Nama Wali Kelas"
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
          onClick={() => onSetWaliKelasModal("", false)}
        >
          Kembali
        </Button>
      </ModalBody>
    </>
  );
};

detail = reduxForm({
  form: "userWaliKelasDetail",
})(detail);

const mapStateToProps = ({ userWaliKelas: { detailData, pending } }) => {
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
    onSetWaliKelasModal: (modalType, isOpen) =>
      dispatch(setWaliKelasModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(detail);
