import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formSelect, formFile } from "../../../../components/commons/form";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";
import SertifikatOrganisasi, {
  setSertifikatOrganisasiModal,
} from "../../../../store/actions/sertifikat/organisasi";
import { optionsSertifikatOrganisasi } from "../../../../utils/constant";

let Add = ({
  onSetSertifikatOrganisasiModal,
  handleSubmit,
  handleRefresh,
  pending,
}) => {
  const dispatch = useDispatch();

  const onSubmit = ({ file_sertifikat, jenis }) => {
    let formData = new FormData();
    formData.append("file_sertifikat", file_sertifikat);
    formData.append("jenis", jenis.value);

    const callback = () => {
      onSetSertifikatOrganisasiModal("", false);
      handleRefresh();
    };
    dispatch(SertifikatOrganisasi.post(formData, callback));
  };
  return (
    <>
      <ModalHeader>Tambah Sertifikat Organisasi</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInputVerticalComponent label="Jenis">
            <Field
              name="jenis"
              placeholder="Jenis"
              options={optionsSertifikatOrganisasi}
              component={formSelect}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="File Sertifikat">
            <Field
              name="file_sertifikat"
              type="file"
              fileType="pdf/image"
              title="Masukkan Berkas"
              message="PDF / JPG"
              component={formFile}
            />
          </LabelInputVerticalComponent>
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetSertifikatOrganisasiModal("", false)}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="mt-3"
              disabled={pending}
              variant="contained"
              color="primary"
            >
              Simpan
            </Button>
          </div>
        </form>
      </ModalBody>
    </>
  );
};

const validate = ({ file_sertifikat, jenis }) => {
  const errors = {};
  if (!file_sertifikat) {
    errors.file_sertifikat = "Sertifikat organisasi harus diisi";
  }
  if (!jenis) {
    errors.jenis = "Tingkat organisasi harus diisi";
  }

  return errors;
};

Add = reduxForm({
  form: "sertifikatOrganisasiAdd",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Add);

const mapStateToProps = ({ sertifikatOrganisasi: { pending } }) => {
  return { pending };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSertifikatOrganisasiModal: (modalType, isOpen) =>
      dispatch(setSertifikatOrganisasiModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
