import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput } from "../../../../components/commons/form";
import { setMahasiswaModal } from "../../../../store/actions/user/mahasiswa";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";

let detail = ({ onSetMahasiswaModal, pending }) => {
  return (
    <>
      <ModalHeader>Lihat Mahasiswa</ModalHeader>
      <ModalBody>
        <form>
          <LabelInputVerticalComponent label="Nama Mahasiswa">
            <Field
              name="nama"
              placeholder="Nama Mahasiswa"
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
          onClick={() => onSetMahasiswaModal("", false)}
        >
          Kembali
        </Button>
      </ModalBody>
    </>
  );
};

detail = reduxForm({
  form: "userMahasiswaDetail",
})(detail);

const mapStateToProps = ({ userMahasiswa: { detailData, pending } }) => {
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
    onSetMahasiswaModal: (modalType, isOpen) =>
      dispatch(setMahasiswaModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(detail);
