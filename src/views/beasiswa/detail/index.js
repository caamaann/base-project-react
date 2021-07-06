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
import Mahasiswa from "../../../store/actions/mahasiswa";
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
import { getUser } from "../../../utils/user";
import { compareTime } from "../../../utils/date";

let Index = ({
  onSetBeasiswaStep,
  onSetBeasiswaData,
  onSetAddBeasiswaData,
  step,
  handleSubmit,
  data,
  dataPerbandingan,
  mahasiswa,
}) => {
  const dispatch = useDispatch();
  const user = getUser();
  const path = window.location.pathname;
  const id = path.split("/").pop();
  const steps =
    user.role_code === "pd3"
      ? ["Data Beasiswa", "Pembobotan Kriteria"]
      : ["Data Beasiswa"];

  const handleNext = () => {
    onSetBeasiswaStep(step + 1);
  };

  const handleBack = () => {
    onSetBeasiswaStep(step - 1);
  };

  const onSubmit = (values) => {
    let param = {};
    if (step === steps.length - 1) {
      param = {
        beasiswa_id: id,
      };
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
      if (user.role_code === "mahasiswa") {
        dispatch(Mahasiswa.post(param, callback));
      } else {
        dispatch(Beasiswa.post(param, callback));
      }
    }
  };

  const StepFirst = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-6 border-right">
          <LabelInputVerticalComponent label="Nama">
            <Field
              name="nama"
              disabled
              placeholder="Nama Beasiswa"
              component={formInput}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Deskripsi">
            <Field
              name="deskripsi"
              disabled
              placeholder="Deskripsi Beasiswa"
              component={formTextArea}
              rows={5}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Awal Pendaftaran">
            <Field
              name="awal_pendaftaran"
              disabled
              placeholder="Awal Pendaftaran"
              fullWidth
              component={formDatePicker}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Akhir Pendaftaran">
            <Field
              name="akhir_pendaftaran"
              disabled
              placeholder="Akhir Pendaftaran"
              fullWidth
              component={formDatePicker}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Awal Penerimaan">
            <Field
              name="awal_penerimaan"
              disabled
              placeholder="Awal Penerimaan"
              fullWidth
              component={formDatePicker}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Akhir Penerimaan">
            <Field
              name="akhir_penerimaan"
              disabled
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
              disabled
              placeholder="IPK Minimal"
              component={formInputNumber}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Penghasilan Orang Tua Maksimal">
            <Field
              name="penghasilan_orang_tua_maksimal"
              disabled
              placeholder="Penghasilan Orang Tua Maksimal"
              thousandSeparator
              component={formInputNumber}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Nominal Bantuan Pendidikan">
            <Field
              name="biaya_pendidikan"
              disabled
              placeholder="Nominal Bantuan Pendidikan"
              thousandSeparator
              component={formInputNumber}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Nominal Bantuan Biaya Hidup">
            <Field
              name="biaya_hidup"
              disabled
              placeholder="Nominal Bantuan Biaya Hidup"
              thousandSeparator
              component={formInputNumber}
            />
          </LabelInputVerticalComponent>

          <LabelInputVerticalComponent label="Kriteria Lainnya">
            <Field
              name="prestasi"
              disabled
              component={formCheckbox}
              label="Prestasi &#38; Ekstra Kurikuler"
            />
            <Field
              name="organisasi"
              disabled
              component={formCheckbox}
              label="Organisasi"
            />
            <Field
              name="sikap"
              disabled
              component={formCheckbox}
              label="Sikap"
            />
            <Field
              name="nilai_sma"
              disabled
              component={formCheckbox}
              label="Nilai Rapot SMA"
            />
          </LabelInputVerticalComponent>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        {steps.length > 1 ? (
          <Button variant="outlined" disabled={step === 0} onClick={handleBack}>
            Kembali
          </Button>
        ) : (
          <div></div>
        )}
        <Button
          disabled={mahasiswa.pending}
          variant="contained"
          color="primary"
          type="submit"
        >
          {step < steps.length - 1
            ? "Selanjutnya"
            : user.role_code === "mahasiswa"
            ? "Daftar Beasiswa"
            : "Submit"}
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

Index = reduxForm({
  form: "beasiswaAdd",
  shouldError: () => true,
  enableReinitialize: true,
})(Index);

const mapStateToProps = ({ beasiswa: { step, data }, mahasiswa }) => {
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
    biaya_pendidikan: data?.biaya_pendidikan ? data.biaya_pendidikan : 0,
    biaya_hidup: data?.biaya_hidup ? data.biaya_hidup : 0,
    prestasi: data?.prestasi == 1 ? true : false,
    organisasi: data?.organisasi == 1 ? true : false,
    sikap: data?.sikap == 1 ? true : false,
    nilai_sma: data?.nilai_sma == 1 ? true : false,
  };

  let dataKriteria = [];
  let dataPerbandingan = [];
  let total = 0;

  if (data) {
    dataKriteria = Object.keys(data).filter((key) => data[key] === true);
    dataKriteria.unshift("ipk_minimal", "penghasilan_orang_tua_maksimal");
    dataPerbandingan = k_combinations(dataKriteria, 2);
    total = dataPerbandingan.length;
    for (let i = 0; i < total; i++) {
      initialValues["perbandingan_" + i] = data["perbandingan_" + i];
    }
  }

  console.log(initialValues);
  return { step, initialValues, data, total, dataPerbandingan, mahasiswa };
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
