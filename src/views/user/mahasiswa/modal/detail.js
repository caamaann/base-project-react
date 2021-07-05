import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import {
  formInput,
  formSelect,
  formInputNumber,
} from "../../../../components/commons/form";
import { setMahasiswaModal } from "../../../../store/actions/user/mahasiswa";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";

let detail = ({ onSetMahasiswaModal, pending }) => {
  return (
    <>
      <ModalHeader>Lihat Mahasiswa</ModalHeader>
      <ModalBody>
        <form>
          <div className="row">
            <div className="col-6 border-right">
              <LabelInputVerticalComponent label="NIM">
                <Field
                  name="nim"
                  disabled
                  placeholder="Nim Mahasiswa"
                  component={formInputNumber}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="Nama Mahasiswa">
                <Field
                  name="nama"
                  disabled
                  placeholder="Nama Mahasiswa"
                  component={formInput}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="Email">
                <Field
                  name="email"
                  disabled
                  placeholder="Email Mahasiswa"
                  component={formInput}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="Jurusan">
                <Field
                  name="jurusan"
                  placeholder="Jurusan"
                  disabled
                  component={formSelect}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="Program Studi">
                <Field
                  name="program_studi"
                  placeholder="Program Studi"
                  disabled
                  component={formSelect}
                />
              </LabelInputVerticalComponent>
            </div>
            <div className="col-6">
              <LabelInputVerticalComponent label="Wali Kelas">
                <Field
                  name="wali_kelas"
                  placeholder="Wali Kelas"
                  disabled
                  component={formSelect}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="Semester">
                <Field
                  name="semester"
                  placeholder="Semester"
                  disabled
                  component={formInputNumber}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="Angkatan">
                <Field
                  name="angkatan"
                  placeholder="Angkatan"
                  disabled
                  component={formSelect}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="IPK">
                <Field
                  name="ipk"
                  placeholder="ipk"
                  disabled
                  component={formInputNumber}
                />
              </LabelInputVerticalComponent>
            </div>
          </div>
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
      nim: detailData.nim,
      nama: detailData.nama,
      email: detailData.email,
      jurusan: {
        label: detailData.jurusan.nama,
        value: detailData.jurusan.id,
      },
      program_studi: {
        label: detailData.program_studi.nama,
        value: detailData.program_studi.id,
      },
      wali_kelas: {
        label: detailData.wali_kelas.nama,
        value: detailData.wali_kelas.id,
      },
      semester: detailData.semester,
      angkatan: { label: detailData.angkatan, value: detailData.angkatan },
      ipk: detailData.ipk,
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
