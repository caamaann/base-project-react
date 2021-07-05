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
import Mahasiswa, {
  setMahasiswaData,
  setMahasiswaModal,
} from "../../store/actions/mahasiswa";
import UserMahasiswa from "../../store/actions/user/mahasiswa";
import ProgramStudi from "../../store/actions/master/program-studi";
import Jurusan from "../../store/actions/master/jurusan";
import { Row, Column } from "simple-flexbox";
import { Button } from "@material-ui/core";
import { regexEmail } from "../../utils/constant";
import { getUser } from "../../utils/user";
import { StyleSheet, css } from "aphrodite";
import moment from "moment";

let Index = ({
  onSetMahasiswaData,
  change,
  handleSubmit,
  detailData,
  programStudi,
  pending,
  reset,
  branchMahasiswa,
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
    nama,
    // nik,
    tempat_lahir,
    tanggal_lahir,
    gender,
    nama_bank,
    nomor_rekening,
    alamat,
    kota,
    kode_pos,
    nomor_hp,
  }) => {
    const param = {
      id: user.profile.id,
      nama,
      // nik,
      tempat_lahir,
      tanggal_lahir: moment(tanggal_lahir).format("yyyy-MM-DD"),
      gender,
      nama_bank,
      nomor_rekening,
      alamat,
      kota,
      kode_pos,
      nomor_hp,
    };

    const callback = () => {
      notEdit();
      dispatch(UserMahasiswa.getDetail({ id: user.profile.id }));
    };

    dispatch(Mahasiswa.put(param, callback));
  };

  let programStudiOptions;
  if (programStudi.data) {
    programStudiOptions = programStudi.data.data.data.map((item) => {
      return {
        label: item.nama,
        value: item.id,
      };
    });
  }

  useEffect(() => {
    getProgramStudi();
  }, []);

  const getProgramStudi = () => dispatch(ProgramStudi.get());

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Row
        vertical="center"
        horizontal="space-between"
        style={{ width: "100%", marginBottom: 20 }}
      >
        <div>
          <h5>Data Mahasiswa</h5>
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
          name="nama"
          placeholder="Nama"
          component={formInput}
        />
      </FormContainer>
      {/* <FormContainer label="No Induk Kependudukan (NIK)">
        <Field
          isDetail={!isEdit}
          name="nik"
          placeholder="NIK"
          component={formInputNumber}
        />
      </FormContainer> */}
      {/* <FormContainer label="Program Studi">
        <Field
          isDetail
          placeholder="Program Studi"
          name="program_studi_name"
          options={programStudiOptions}
          isAsync
          asyncUrl="/program_studi"
          component={formSelect}
        />
      </FormContainer> */}
      <FormContainer label="Tempat Lahir">
        <Field
          isDetail={!isEdit}
          name="tempat_lahir"
          placeholder="Tempat Lahir"
          component={formInput}
        />
      </FormContainer>
      <FormContainer label="Tanggal Lahir">
        <Field
          name="tanggal_lahir"
          isDetail={!isEdit}
          placeholder="Tanggal Lahir"
          fullWidth
          component={formDatePicker}
        />
      </FormContainer>
      <FormContainer label="Jenis Kelamin">
        {isEdit ? (
          <Field
            name="gender"
            options={{
              "Laki-laki": "Laki-laki",
              Perempuan: "Perempuan",
            }}
            component={Radio}
          />
        ) : (
          <Field
            isDetail
            name="gender"
            placeholder="Jenis Kelamin"
            component={formInput}
          />
        )}
      </FormContainer>
      <FormContainer label="Nama Bank">
        <Field
          isDetail={!isEdit}
          name="nama_bank"
          placeholder="Nama Bank"
          component={formInput}
        />
      </FormContainer>
      <FormContainer label="No Rekening">
        <Field
          isDetail={!isEdit}
          name="nomor_rekening"
          placeholder="No Rekening"
          component={formInputNumber}
        />
      </FormContainer>
      <FormContainer label="Alamat">
        <Field
          isDetail={!isEdit}
          name="alamat"
          placeholder="Alamat"
          rows={5}
          component={formTextArea}
        />
      </FormContainer>
      <FormContainer label="Kota">
        <Field
          isDetail={!isEdit}
          name="kota"
          placeholder="Kota"
          component={formInput}
        />
      </FormContainer>
      <FormContainer label="Kode Pos">
        <Field
          isDetail={!isEdit}
          name="kode_pos"
          placeholder="Kode Pos"
          component={formInputNumber}
        />
      </FormContainer>
      <FormContainer label="No Handphone">
        <Field
          isDetail={!isEdit}
          name="nomor_hp"
          placeholder="No Handphone"
          component={formInputNumber}
        />
      </FormContainer>
    </form>
  );
};

const validate = ({
  nama,
  // nik,
  tempat_lahir,
  tanggal_lahir,
  gender,
  nama_bank,
  nomor_rekening,
  alamat,
  kota,
  kode_pos,
  nomor_hp,
}) => {
  const errors = {};

  if (!nama) {
    errors.nama = "Field harus diisi";
  }
  // if (!nik) {
  //   errors.nik = "Field harus diisi";
  // }
  if (!tempat_lahir) {
    errors.tempat_lahir = "Field harus diisi";
  }
  if (!tanggal_lahir) {
    errors.tanggal_lahir = "Field harus diisi";
  }
  if (!gender) {
    errors.gender = "Field harus diisi";
  }
  if (!nama_bank) {
    errors.nama_bank = "Field harus diisi";
  }
  if (!nomor_rekening) {
    errors.nomor_rekening = "Field harus diisi";
  }
  if (!alamat) {
    errors.alamat = "Field harus diisi";
  }
  if (!kota) {
    errors.kota = "Field harus diisi";
  }
  if (!kode_pos) {
    errors.kode_pos = "Field harus diisi";
  }
  if (!nomor_hp) {
    errors.nomor_hp = "Field harus diisi";
  }

  return errors;
};

Index = reduxForm({
  form: "mahasiswaEditData",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Index);

const mapStateToProps = ({
  userMahasiswa,
  programStudi,
  mahasiswa: { pending },
}) => {
  const { data, detailData } = userMahasiswa;
  const path = window.location.pathname.split("/");
  let initialValues = {};
  if (detailData) {
    initialValues = {
      nama: detailData.nama,
      // nik: detailData.nik,
      tempat_lahir: detailData.tempat_lahir,
      tanggal_lahir: detailData.tanggal_lahir,
      program_studi_name: detailData.program_studi
        ? {
            label: detailData.program_studi.nama,
            value: detailData.program_studi.id,
          }
        : null,
      gender: detailData.gender,
      nama_bank: detailData.nama_bank,
      nomor_rekening: detailData.nomor_rekening,
      alamat: detailData.alamat,
      kota: detailData.kota,
      kode_pos: detailData.kode_pos,
      nomor_hp: detailData.nomor_hp,
    };
  }
  return {
    data,
    detailData,
    pending,
    initialValues,
    programStudi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMahasiswaModal: (modalType, isOpen) =>
      dispatch(setMahasiswaModal(modalType, isOpen)),
    onSetMahasiswaData: (data) => dispatch(setMahasiswaData(data)),
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
