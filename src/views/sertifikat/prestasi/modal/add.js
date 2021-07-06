import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formSelect, formFile } from "../../../../components/commons/form";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";
import SertifikatPrestasi, {
  setSertifikatPrestasiModal,
} from "../../../../store/actions/sertifikat/prestasi";
import { optionsSertifikatPrestasi } from "../../../../utils/constant";

let Add = ({
  onSetSertifikatPrestasiModal,
  handleSubmit,
  handleRefresh,
  pending,
}) => {
  const dispatch = useDispatch();

  const onSubmit = ({ file_sertifikat, tingkat_prestasi }) => {
    let formData = new FormData();
    formData.append("file_sertifikat", file_sertifikat);
    formData.append("tingkat_prestasi", tingkat_prestasi.value);

    const callback = () => {
      onSetSertifikatPrestasiModal("", false);
      handleRefresh();
    };
    dispatch(SertifikatPrestasi.post(formData, callback));
  };
  return (
    <>
      <ModalHeader>Tambah Sertifikat Prestasi</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInputVerticalComponent label="Tingkat Prestasi">
            <Field
              name="tingkat_prestasi"
              placeholder="Tingkat Prestasi"
              options={optionsSertifikatPrestasi}
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
              onClick={() => onSetSertifikatPrestasiModal("", false)}
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

const validate = ({ file_sertifikat, tingkat_prestasi }) => {
  const errors = {};
  if (!file_sertifikat) {
    errors.file_sertifikat = "Sertifikat prestasi harus diisi";
  }
  if (!tingkat_prestasi) {
    errors.tingkat_prestasi = "Tingkat prestasi harus diisi";
  }

  return errors;
};

Add = reduxForm({
  form: "sertifikatPrestasiAdd",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Add);

const mapStateToProps = ({ sertifikatPrestasi: { pending } }) => {
  return { pending };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetSertifikatPrestasiModal: (modalType, isOpen) =>
      dispatch(setSertifikatPrestasiModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
