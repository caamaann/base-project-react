import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field, FieldArray } from "redux-form";
import Beasiswa, {
  setBeasiswaData,
  setBeasiswaModal,
  setBeasiswaStep,
  setAddBeasiswaData,
} from "../../../store/actions/beasiswa";
import { Row } from "simple-flexbox";
import { Button, Stepper, Step, StepLabel } from "@material-ui/core";
import {
  formInput,
  formTextArea,
  formCheckbox,
  formInputNumber,
  formDatePicker,
  normalizeDates,
  formatDates,
} from "../../../components/commons/form";
import LabelInputVerticalComponent from "../../../components/global-components/LabelInputVertical";
import Container from "../../../components/container";
import BobotKriteria from "../../../components/content/bobot-kriteria";
import debounce from "lodash.debounce";
import { history } from "../../../utils";
import moment from "moment";
import { k_combinations } from "../../../utils/combination";

let Index = ({
  onSetBeasiswaStep,
  onSetBeasiswaData,
  onSetAddBeasiswaData,
  step,
  handleSubmit,
  data,
  dataPerbandingan,
}) => {
  const dispatch = useDispatch();
  const steps = ["Data Beasiswa", "Pembobotan Kriteria"];

  const handleNext = () => {
    onSetBeasiswaStep(step + 1);
  };

  const handleBack = () => {
    onSetBeasiswaStep(step - 1);
  };

  const onSubmit = (values) => {
    let param = {};
    if (step === steps.length - 1) {
      let pembobotan = [];
      dataPerbandingan.map((item, index) => {
        let bobot_1 = 1;
        let bobot_2 = 1;
        if (values["perbandingan_" + index] > 1) {
          bobot_2 = values["perbandingan_" + index];
        } else if (values["perbandingan_" + index] < 1) {
          bobot_1 = 2 - values["perbandingan_" + index];
        }

        pembobotan.push({
          kriteria_1: item[0],
          bobot_1,
          kriteria_2: item[1],
          bobot_2,
        });
      });

      param = {
        nama: values.nama,
        deskripsi: values.deskripsi,
        awal_pendaftaran: moment(values.awal_pendaftaran).format("yyyy-MM-DD"),
        akhir_pendaftaran: moment(values.akhir_pendaftaran).format(
          "yyyy-MM-DD"
        ),
        awal_penerimaan: moment(values.awal_penerimaan).format("yyyy-MM-DD"),
        akhir_penerimaan: moment(values.akhir_penerimaan).format("yyyy-MM-DD"),
        ipk_minimal: values.ipk_minimal,
        penghasilan_orang_tua_maksimal: values.penghasilan_orang_tua_maksimal
          ? values.penghasilan_orang_tua_maksimal.toString().replace(/\D/g, "")
          : null,
        biaya_pendidikan: values.biaya_pendidikan
          ? values.biaya_pendidikan.toString().replace(/\D/g, "")
          : null,
        biaya_hidup: values.biaya_hidup
          ? values.biaya_hidup.toString().replace(/\D/g, "")
          : null,
        prestasi: values.prestasi ? 1 : 0,
        organisasi: values.organisasi ? 1 : 0,
        sikap: values.sikap ? 1 : 0,
        nilai_sma: values.nilai_sma ? 1 : 0,
        pembobotan,
      };
      console.log(param);
    }
    onSetAddBeasiswaData(values);
    if (step < steps.length - 1) {
      handleNext();
    } else {
      const callback = () => {
        history.push("/beasiswa");
        onSetAddBeasiswaData(null);
        onSetBeasiswaStep(0);
      };
      // dispatch(Beasiswa.post(param, callback));
    }
  };

  const StepFirst = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-6 border-right">
          <LabelInputVerticalComponent label="Nama">
            <Field
              name="nama"
              placeholder="Nama Beasiswa"
              component={formInput}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Deskripsi">
            <Field
              name="deskripsi"
              placeholder="Deskripsi Beasiswa"
              component={formTextArea}
              rows={5}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Awal Pendaftaran">
            <Field
              name="awal_pendaftaran"
              placeholder="Awal Pendaftaran"
              fullWidth
              component={formDatePicker}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Akhir Pendaftaran">
            <Field
              name="akhir_pendaftaran"
              placeholder="Akhir Pendaftaran"
              fullWidth
              component={formDatePicker}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Awal Penerimaan">
            <Field
              name="awal_penerimaan"
              placeholder="Awal Penerimaan"
              fullWidth
              component={formDatePicker}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Akhir Penerimaan">
            <Field
              name="akhir_penerimaan"
              placeholder="Akhir Penerimaan"
              fullWidth
              component={formDatePicker}
            />
          </LabelInputVerticalComponent>
        </div>
        <div className="col-6">
          <LabelInputVerticalComponent label="IPK Minimal">
            <Field
              name="ipk_minimal"
              placeholder="IPK Minimal"
              component={formInputNumber}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Penghasilan Orang Tua Maksimal">
            <Field
              name="penghasilan_orang_tua_maksimal"
              placeholder="Penghasilan Orang Tua Maksimal"
              thousandSeparator
              component={formInputNumber}
            />
          </LabelInputVerticalComponent>          
          <LabelInputVerticalComponent label="Nominal Bantuan Pendidikan">
            <Field
              name="biaya_pendidikan"
              placeholder="Nominal Bantuan Pendidikan"
              thousandSeparator
              component={formInputNumber}
            />
          </LabelInputVerticalComponent>          
          <LabelInputVerticalComponent label="Nominal Bantuan Biaya Hidup">
            <Field
              name="biaya_hidup"
              placeholder="Nominal Bantuan Biaya Hidup"
              thousandSeparator
              component={formInputNumber}
            />
          </LabelInputVerticalComponent>

          <LabelInputVerticalComponent label="Kriteria Lainnya">
            <Field
              name="prestasi"
              component={formCheckbox}
              label="Prestasi &#38; Ekstra Kurikuler"
            />
            <Field
              name="organisasi"
              component={formCheckbox}
              label="Organisasi"
            />
            <Field name="sikap" component={formCheckbox} label="Sikap" />
            <Field
              name="nilai_sma"
              component={formCheckbox}
              label="Nilai Rapot SMA"
            />
          </LabelInputVerticalComponent>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <Button variant="outlined" disabled={step === 0} onClick={handleBack}>
          Kembali
        </Button>
        <Button variant="contained" color="primary" type="submit">
          {step < steps.length - 1 ? "Selanjutnya" : "Submit"}
        </Button>
      </div>
    </form>
  );

  const StepSecond = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row-12">
        <BobotKriteria data={data} />
      </div>
      <div className="d-flex justify-content-between">
        <Button variant="outlined" disabled={step === 0} onClick={handleBack}>
          Kembali
        </Button>
        <Button variant="contained" color="primary" type="submit">
          {step < steps.length - 1 ? "Selanjutnya" : "Submit"}
        </Button>
      </div>
    </form>
  );

  return (
    <Container>
      <div className="p-4">
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>{step === 0 ? StepFirst : StepSecond}</div>
      </div>
    </Container>
  );
};

const validate = (values, allProps) => {
  const {
    step,
    nama,
    deskripsi,
    awal_pendaftaran,
    akhir_pendaftaran,
    awal_penerimaan,
    akhir_penerimaan,
    ipk_minimal,
    penghasilan_orang_tua_maksimal,
    biaya_pendidikan,
    biaya_hidup,
    prestasi,
    organisasi,
    sikap,
    nilai_sma,
  } = values;
  const errors = {};
  if (!nama) {
    errors.nama = "Nama beasiswa harus diisi";
  }
  if (!awal_pendaftaran) {
    errors.awal_pendaftaran = "Awal Pendaftaran Beasiswa harus diisi";
  }
  if (!akhir_pendaftaran) {
    errors.akhir_pendaftaran = "Awal Pendaftaran Beasiswa harus diisi";
  }
  if (!awal_penerimaan) {
    errors.awal_penerimaan = "Awal Pendaftaran Beasiswa harus diisi";
  }
  if (!akhir_penerimaan) {
    errors.akhir_penerimaan = "Awal Pendaftaran Beasiswa harus diisi";
  }
  if (!ipk_minimal) {
    errors.ipk_minimal = "IPK Minimal harus diisi";
  } else if (ipk_minimal < 0 || ipk_minimal > 4) {
    errors.ipk_minimal = "IPK Minimal harus diisi antara 0 - 4";
  }
  if (!penghasilan_orang_tua_maksimal) {
    errors.penghasilan_orang_tua_maksimal =
      "Penghasilan Orangtua Maksimal harus diisi";
  }
  if (!biaya_hidup) {
    errors.biaya_hidup =
      "Nominal Bantuan Biaya Hidup harus diisi";
  }
  if (!biaya_pendidikan) {
    errors.biaya_pendidikan =
      "Nominal Bantuan Biaya Pendidikan harus diisi";
  }

  for (let i = 0; i < allProps.total; i++) {
    if (!values["perbandingan_" + i] && values["perbandingan_" + i] !== 0) {
      errors["perbandingan_" + i] = "Perbandingan harus diisi";
    }
  }

  return errors;
};

Index = reduxForm({
  form: "beasiswaAdd",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Index);

const mapStateToProps = ({ beasiswa: { step, data } }) => {
  const initialValues = {
    step: step,
    nama: data?.nama,
    deskripsi: data?.deskripsi,
    awal_pendaftaran: data?.awal_pendaftaran,
    akhir_pendaftaran: data?.akhir_pendaftaran,
    awal_penerimaan: data?.awal_penerimaan,
    akhir_penerimaan: data?.akhir_penerimaan,
    ipk_minimal: data?.ipk_minimal,
    penghasilan_orang_tua_maksimal: data?.penghasilan_orang_tua_maksimal,
    biaya_pendidikan: data?.biaya_pendidikan,
    biaya_hidup: data?.biaya_hidup,
    prestasi: data?.prestasi,
    organisasi: data?.organisasi,
    sikap: data?.sikap,
    nilai_sma: data?.nilai_sma,
  };

  let dataKriteria = Object.keys(data).filter((key) => data[key] === true);
  dataKriteria.unshift("ipk_minimal", "penghasilan_orang_tua_maksimal");
  let dataPerbandingan = k_combinations(dataKriteria, 2);
  let total = dataPerbandingan.length;

  if (data) {
    for (let i = 0; i < total; i++) {
      initialValues["perbandingan_" + i] = data["perbandingan_" + i];
    }
  }

  return { step, initialValues, data, total, dataPerbandingan };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetBeasiswaModal: (modalType, isOpen) =>
      dispatch(setBeasiswaModal(modalType, isOpen)),
    onSetBeasiswaData: (data) => dispatch(setBeasiswaData(data)),
    onSetAddBeasiswaData: (data) => dispatch(setAddBeasiswaData(data)),
    onSetBeasiswaStep: (step) => dispatch(setBeasiswaStep(step)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
