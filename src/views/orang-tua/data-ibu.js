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
    nama_ibu,
    tempat_lahir_ibu,
    tanggal_lahir_ibu,
    alamat_ibu,
    nomor_hp_ibu,
    pekerjaan_ibu,
    penghasilan_ibu,
    pekerjaan_sambilan_ibu,
    penghasilan_sambilan_ibu,
  }) => {
    const param = {
      nama_ibu,
      tempat_lahir_ibu,
      tanggal_lahir_ibu: moment(tanggal_lahir_ibu).format("yyyy-MM-DD"),
      alamat_ibu,
      nomor_hp_ibu,
      pekerjaan_ibu,
      penghasilan_ibu: penghasilan_ibu
        ? penghasilan_ibu.toString().replace(/\D/g, "")
        : 0,
      pekerjaan_sambilan_ibu,
      penghasilan_sambilan_ibu: penghasilan_sambilan_ibu
        ? penghasilan_sambilan_ibu.toString().replace(/\D/g, "")
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
          <h5>Data Ibu</h5>
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
          name="nama_ibu"
          placeholder="Nama"
          component={formInput}
        />
      </FormContainer>
      <FormContainer label="Tempat Lahir">
        <Field
          isDetail={!isEdit}
          name="tempat_lahir_ibu"
          placeholder="Tempat Lahir"
          component={formInput}
        />
      </FormContainer>
      <FormContainer label="Tanggal Lahir">
        <Field
          name="tanggal_lahir_ibu"
          isDetail={!isEdit}
          placeholder="Tanggal Lahir"
          fullWidth
          component={formDatePicker}
        />
      </FormContainer>
      <FormContainer label="Alamat">
        <Field
          isDetail={!isEdit}
          name="alamat_ibu"
          placeholder="Alamat"
          rows={5}
          component={formTextArea}
        />
      </FormContainer>
      <FormContainer label="No Handphone">
        <Field
          isDetail={!isEdit}
          name="nomor_hp_ibu"
          placeholder="No Handphone"
          component={formInputNumber}
        />
      </FormContainer>
      <FormContainer label="Pekerjaan">
        <Field
          isDetail={!isEdit}
          name="pekerjaan_ibu"
          placeholder="Pekerjaan"
          component={formInput}
        />
      </FormContainer>
      <FormContainer label="Penghasilan">
        <Field
          isDetail={!isEdit}
          name="penghasilan_ibu"
          thousandSeparator
          placeholder="No Handphone"
          component={formInputNumber}
        />
      </FormContainer>
      <FormContainer label="Pekerjaan Sambilan">
        <Field
          isDetail={!isEdit}
          name="pekerjaan_sambilan_ibu"
          placeholder="Pekerjaan Sambilan"
          component={formInput}
        />
      </FormContainer>
      <FormContainer label="Penghasilan Sambilan">
        <Field
          isDetail={!isEdit}
          name="penghasilan_sambilan_ibu"
          thousandSeparator
          placeholder="No Handphone"
          component={formInputNumber}
        />
      </FormContainer>
    </form>
  );
};

const validate = ({
  nama_ibu,
  tempat_lahir_ibu,
  tanggal_lahir_ibu,
  alamat_ibu,
  nomor_hp_ibu,
  pekerjaan_ibu,
  penghasilan_ibu,
  pekerjaan_sambilan_ibu,
  penghasilan_sambilan_ibu,
}) => {
  const errors = {};

  if (!nama_ibu) {
    errors.nama_ibu = "Field harus diisi";
  }
  if (!tempat_lahir_ibu) {
    errors.tempat_lahir_ibu = "Field harus diisi";
  }
  if (!tanggal_lahir_ibu) {
    errors.tanggal_lahir_ibu = "Field harus diisi";
  }
  if (!alamat_ibu) {
    errors.alamat_ibu = "Field harus diisi";
  }
  if (!nomor_hp_ibu) {
    errors.nomor_hp_ibu = "Field harus diisi";
  }
  if (!pekerjaan_ibu) {
    errors.pekerjaan_ibu = "Field harus diisi";
  }
  if (!penghasilan_ibu && penghasilan_ibu != 0) {
    errors.penghasilan_ibu = "Field harus diisi";
  }

  return errors;
};

Index = reduxForm({
  form: "orangTuaIbuEditData",
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
      nama_ibu: detailData.nama_ibu,
      tempat_lahir_ibu: detailData.tempat_lahir_ibu,
      tanggal_lahir_ibu: detailData.tanggal_lahir_ibu,
      alamat_ibu: detailData.alamat_ibu,
      nomor_hp_ibu: detailData.nomor_hp_ibu,
      pekerjaan_ibu: detailData.pekerjaan_ibu,
      penghasilan_ibu: detailData.penghasilan_ibu,
      pekerjaan_sambilan_ibu: detailData.pekerjaan_sambilan_ibu,
      penghasilan_sambilan_ibu: detailData.penghasilan_sambilan_ibu,
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
