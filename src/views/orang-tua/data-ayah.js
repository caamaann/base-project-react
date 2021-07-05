import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { reduxForm, Field, formValueSelector } from "redux-form";
import FormContainer from "../../components/container/Form";
import {
  formInput,
  formSelect,
  formInputNumber,
  formTextArea,
  formDatePicker,
} from "../../components/commons/form";
import Radio from "../../components/commons/form/radio";
import OrangTua, {
  setOrangTuaData,
  setOrangTuaModal,
} from "../../store/actions/orang-tua";
import { Row, Column } from "simple-flexbox";
import { Button } from "@material-ui/core";
import { regexEmail } from "../../utils/constant";
import { getUser } from "../../utils/user";
import { StyleSheet, css } from "aphrodite";
import moment from "moment";

let Index = ({
  onSetOrangTuaData,
  handleSubmit,
  detailData,
  pending,
  reset,
  initialValues,
}) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const notEdit = () => {
    setIsEdit(!isEdit);
    reset();
  };
  const user = getUser();

  const onSubmit = ({
    nama_ayah,
    tempat_lahir_ayah,
    tanggal_lahir_ayah,
    alamat_ayah,
    nomor_hp_ayah,
    pekerjaan_ayah,
    penghasilan_ayah,
    pekerjaan_sambilan_ayah,
    penghasilan_sambilan_ayah,
  }) => {
    const param = {
      nama_ayah,
      tempat_lahir_ayah,
      tanggal_lahir_ayah: moment(tanggal_lahir_ayah).format("yyyy-MM-DD"),
      alamat_ayah,
      nomor_hp_ayah,
      pekerjaan_ayah,
      penghasilan_ayah: penghasilan_ayah
        ? penghasilan_ayah.toString().replace(/\D/g, "")
        : 0,
      pekerjaan_sambilan_ayah,
      penghasilan_sambilan_ayah: penghasilan_sambilan_ayah
        ? penghasilan_sambilan_ayah.toString().replace(/\D/g, "")
        : 0,
    };

    const callback = () => {
      notEdit();
      dispatch(OrangTua.get());
    };

    dispatch(OrangTua.put(param, callback));
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Row
        vertical="center"
        horizontal="space-between"
        style={{ width: "100%", marginBottom: 20 }}
      >
        <div>
          <h5>Data Ayah</h5>
        </div>
        <div className="d-flex justify-content-between">
          {isEdit ? (
            <>
              <Button
                variant="outlined"
                color="primary"
                disabled={pending}
                style={{ marginRight: 20 }}
                onClick={notEdit}
              >
                Batal
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={pending}
                type="submit"
              >
                Submit
              </Button>
            </>
          ) : (
            <Button
              variant="contained"
              color="primary"
              disabled={pending}
              onClick={notEdit}
            >
              Edit
            </Button>
          )}
        </div>
      </Row>
      <FormContainer label="Nama">
        <Field
          isDetail={!isEdit}
          name="nama_ayah"
          placeholder="Nama"
          component={formInput}
        />
      </FormContainer>
      <FormContainer label="Tempat Lahir">
        <Field
          isDetail={!isEdit}
          name="tempat_lahir_ayah"
          placeholder="Tempat Lahir"
          component={formInput}
        />
      </FormContainer>
      <FormContainer label="Tanggal Lahir">
        <Field
          name="tanggal_lahir_ayah"
          isDetail={!isEdit}
          placeholder="Tanggal Lahir"
          fullWidth
          component={formDatePicker}
        />
      </FormContainer>
      <FormContainer label="Alamat">
        <Field
          isDetail={!isEdit}
          name="alamat_ayah"
          placeholder="Alamat"
          rows={5}
          component={formTextArea}
        />
      </FormContainer>
      <FormContainer label="No Handphone">
        <Field
          isDetail={!isEdit}
          name="nomor_hp_ayah"
          placeholder="No Handphone"
          component={formInputNumber}
        />
      </FormContainer>
      <FormContainer label="Pekerjaan">
        <Field
          isDetail={!isEdit}
          name="pekerjaan_ayah"
          placeholder="Pekerjaan"
          component={formInput}
        />
      </FormContainer>
      <FormContainer label="Penghasilan">
        <Field
          isDetail={!isEdit}
          name="penghasilan_ayah"
          thousandSeparator
          placeholder="No Handphone"
          component={formInputNumber}
        />
      </FormContainer>
      <FormContainer label="Pekerjaan Sambilan">
        <Field
          isDetail={!isEdit}
          name="pekerjaan_sambilan_ayah"
          placeholder="Pekerjaan Sambilan"
          component={formInput}
        />
      </FormContainer>
      <FormContainer label="Penghasilan Sambilan">
        <Field
          isDetail={!isEdit}
          name="penghasilan_sambilan_ayah"
          thousandSeparator
          placeholder="No Handphone"
          component={formInputNumber}
        />
      </FormContainer>
    </form>
  );
};

const validate = ({
  nama_ayah,
  tempat_lahir_ayah,
  tanggal_lahir_ayah,
  alamat_ayah,
  nomor_hp_ayah,
  pekerjaan_ayah,
  penghasilan_ayah,
  pekerjaan_sambilan_ayah,
  penghasilan_sambilan_ayah,
}) => {
  const errors = {};

  if (!nama_ayah) {
    errors.nama_ayah = "Field harus diisi";
  }
  if (!tempat_lahir_ayah) {
    errors.tempat_lahir_ayah = "Field harus diisi";
  }
  if (!tanggal_lahir_ayah) {
    errors.tanggal_lahir_ayah = "Field harus diisi";
  }
  if (!alamat_ayah) {
    errors.alamat_ayah = "Field harus diisi";
  }
  if (!nomor_hp_ayah) {
    errors.nomor_hp_ayah = "Field harus diisi";
  }
  if (!pekerjaan_ayah) {
    errors.pekerjaan_ayah = "Field harus diisi";
  }
  if (!penghasilan_ayah && penghasilan_ayah != 0) {
    errors.penghasilan_ayah = "Field harus diisi";
  }

  return errors;
};

Index = reduxForm({
  form: "orangTuaAyahEditData",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Index);

const mapStateToProps = ({ orangTua }) => {
  const { data, detailData, pending } = orangTua;
  const path = window.location.pathname.split("/");
  let initialValues = {};
  if (detailData) {
    initialValues = {
      nama_ayah: detailData.nama_ayah,
      tempat_lahir_ayah: detailData.tempat_lahir_ayah,
      tanggal_lahir_ayah: detailData.tanggal_lahir_ayah,
      alamat_ayah: detailData.alamat_ayah,
      nomor_hp_ayah: detailData.nomor_hp_ayah,
      pekerjaan_ayah: detailData.pekerjaan_ayah,
      penghasilan_ayah: detailData.penghasilan_ayah,
      pekerjaan_sambilan_ayah: detailData.pekerjaan_sambilan_ayah,
      penghasilan_sambilan_ayah: detailData.penghasilan_sambilan_ayah,
    };
  }
  return {
    detailData,
    pending,
    initialValues,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetOrangTuaModal: (modalType, isOpen) =>
      dispatch(setOrangTuaModal(modalType, isOpen)),
    onSetOrangTuaData: (data) => dispatch(setOrangTuaData(data)),
  };
};

const styles = StyleSheet.create({
  imgDocument: {
    maxHeight: 200,
    maxWidth: 200,
    objectFit: "contain",
    marginRight: "auto",
    marginLeft: "auto",
  },
  logo: {
    maxHeight: 200,
    maxWidth: 200,
    objectFit: "contain",
    marginRight: "auto",
    marginLeft: "auto",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
