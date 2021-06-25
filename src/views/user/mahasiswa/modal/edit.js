import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import {
  formInput,
  formSelect,
  formInputNumber,
} from "../../../../components/commons/form";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";
import Mahasiswa, {
  setMahasiswaModal,
} from "../../../../store/actions/user/mahasiswa";
import Jurusan from "../../../../store/actions/master/jurusan";
import ProgramStudi from "../../../../store/actions/master/program-studi";
import WaliKelas from "../../../../store/actions/user/wali-kelas";
import { yearOptions } from "../../../../utils/date";
import { regexEmail } from "../../../../utils/constant";

let Edit = ({
  onSetMahasiswaModal,
  handleSubmit,
  detailData,
  handleRefresh,
  pending,
  jurusan,
  programStudi,
  userWaliKelas,
}) => {
  const dispatch = useDispatch();
  const [jurusanId, setJurusanId] = useState(detailData.jurusan_id);

  const onSubmit = ({
    nim,
    nama,
    email,
    program_studi,
    wali_kelas,
    semester,
    angkatan,
    ipk,
  }) => {
    const param = {
      id: detailData.id,
      nim,
      nama,
      email,
      program_studi_id: program_studi.value,
      wali_kelas_id: wali_kelas.value,
      semester,
      angkatan: angkatan.value,
      ipk,
    };
    const callback = () => {
      onSetMahasiswaModal("", false);
      handleRefresh();
    };
    dispatch(Mahasiswa.put(param, callback));
  };

  let jurusanOptions, programStudiOptions, waliKelasOptions;
  if (jurusan.data) {
    jurusanOptions = jurusan.data.data.data.map((item) => {
      return {
        label: item.nama,
        value: item.id,
      };
    });
  }
  if (programStudi.data) {
    programStudiOptions = programStudi.data.data.data.map((item) => {
      return {
        label: item.nama,
        value: item.id,
      };
    });
  }
  if (userWaliKelas.data) {
    waliKelasOptions = userWaliKelas.data.data.data.map((item) => {
      return {
        label: item.nama,
        value: item.id,
      };
    });
  }

  useEffect(() => {
    getJurusan();
  }, []);

  useEffect(() => {
    dispatch(ProgramStudi.get({ jurusan_id: jurusanId }));
    dispatch(WaliKelas.get({ jurusan_id: jurusanId }));
  }, [jurusanId]);

  const getJurusan = () => dispatch(Jurusan.get());
  return (
    <>
      <ModalHeader>Edit Mahasiswa</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-6 border-right">
              <LabelInputVerticalComponent label="NIM">
                <Field
                  name="nim"
                  placeholder="Nim Mahasiswa"
                  component={formInputNumber}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="Nama Mahasiswa">
                <Field
                  name="nama"
                  placeholder="Nama Mahasiswa"
                  component={formInput}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="Email">
                <Field
                  name="email"
                  placeholder="Email Mahasiswa"
                  component={formInput}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="Jurusan">
                <Field
                  name="jurusan"
                  placeholder="Jurusan"
                  component={formSelect}
                  options={jurusanOptions}
                  onChange={(e) => {
                    if (e) {
                      setJurusanId(e.value);
                    } else {
                      setJurusanId("");
                    }
                  }}
                  isAsync
                  asyncUrl="/jurusan"
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="Program Studi">
                <Field
                  name="program_studi"
                  placeholder="Program Studi"
                  component={formSelect}
                  options={programStudiOptions}
                  isAsync
                  param={{ jurusan_id: jurusanId }}
                  asyncUrl="/program_studi"
                />
              </LabelInputVerticalComponent>
            </div>
            <div className="col-6">
              <LabelInputVerticalComponent label="Wali Kelas">
                <Field
                  name="wali_kelas"
                  placeholder="Wali Kelas"
                  component={formSelect}
                  options={waliKelasOptions}
                  isAsync
                  param={{ jurusan_id: jurusanId }}
                  asyncUrl="/user/wali_kelas"
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="Semester">
                <Field
                  name="semester"
                  placeholder="Semester"
                  component={formInputNumber}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="Angkatan">
                <Field
                  name="angkatan"
                  placeholder="Angkatan"
                  component={formSelect}
                  options={yearOptions(5)}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="IPK">
                <Field
                  name="ipk"
                  placeholder="ipk"
                  component={formInputNumber}
                />
              </LabelInputVerticalComponent>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetMahasiswaModal("", false)}
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

const validate = ({
  nim,
  nama,
  email,
  jurusan,
  program_studi,
  wali_kelas,
  semester,
  angkatan,
  ipk,
}) => {
  const errors = {};
  if (!nim) {
    errors.nim = "NIM harus diisi";
  }
  if (!nama) {
    errors.nama = "Nama harus diisi";
  }
  if (!email) {
    errors.email = "Email harus diisi";
  } else if (!regexEmail.test(email)) {
    errors.email = "Email tidak valid";
  }
  if (!jurusan) {
    errors.jurusan = "Jurusan harus diisi";
  }
  if (!program_studi) {
    errors.program_studi = "Program studi harus diisi";
  }
  if (!wali_kelas) {
    errors.wali_kelas = "Nama wali kelas harus diisi";
  }
  if (!semester) {
    errors.semester = "Semester harus diisi";
  } else if (semester < 1 || semester > 8) {
    errors.semester = "Semester harus diisi antara 1 - 8";
  }
  if (!angkatan) {
    errors.angkatan = "Angkatan harus diisi";
  }
  if (!ipk) {
    errors.ipk = "IPK harus diisi";
  } else if (ipk < 0 || ipk > 4) {
    errors.ipk = "IPK harus diisi antara 0-4";
  }

  return errors;
};

Edit = reduxForm({
  form: "userMahasiswaEdit",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Edit);

const mapStateToProps = ({
  userMahasiswa: { detailData, pending },
  jurusan,
  programStudi,
  userWaliKelas,
}) => {
  let initialValues = {};
  if (detailData) {
    initialValues = {
      nim: detailData.nim,
      nama: detailData.nama,
      email: detailData.email,
      jurusan: { label: detailData.jurusan.nama, value: detailData.jurusan.id },
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
    detailData,
    initialValues,
    pending,
    jurusan,
    programStudi,
    userWaliKelas,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMahasiswaModal: (modalType, isOpen) =>
      dispatch(setMahasiswaModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
