import React, { useState, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field, FieldArray } from "redux-form";
import Beasiswa from "../../../store/actions/beasiswa";
import AHP from "../../../store/actions/ahp";
import WaliKelas, {
  setWaliKelasData,
  setWaliKelasModal,
  setWaliKelasStep,
  setAddWaliKelasData,
} from "../../../store/actions/wali-kelas";
import Mahasiswa from "../../../store/actions/mahasiswa";
import { Row } from "simple-flexbox";
import { Button, Stepper, Step, StepLabel } from "@material-ui/core";
import Container from "../../../components/container";
import BobotAlternatif from "../../../components/content/bobot-alternatif";
import debounce from "lodash.debounce";
import { history } from "../../../utils";
import moment from "moment";
import { k_combinations } from "../../../utils/combination";
import { getUser } from "../../../utils/user";
import CircularProgress from "@material-ui/core/CircularProgress";

let Index = ({
  onSetWaliKelasStep,
  onSetWaliKelasData,
  onSetAddWaliKelasData,
  step,
  handleSubmit,
  data,
  dataPerbandingan,
  mahasiswa,
  pending,
  detailData,
  dataNamaKriteria,
  dataKriteria,
  ahp,
}) => {
  const dispatch = useDispatch();
  const user = getUser();
  const path = window.location.pathname;
  const id = path.split("/").pop();
  const steps = dataNamaKriteria;

  const handleNext = () => {
    onSetWaliKelasStep(step + 1);
  };

  const handleBack = () => {
    onSetWaliKelasStep(step - 1);
  };

  useEffect(() => {
    getPendaftarBeasiswa();
    getDetailBeasiswa();
  }, []);

  const getDetailBeasiswa = () => dispatch(Beasiswa.getDetail({ id: id }));
  const getPendaftarBeasiswa = () =>
    dispatch(WaliKelas.get({ beasiswa_id: id }));

  const onSubmit = (values) => {
    let param = {};
    if (step === steps.length - 1) {
      let pembobotan = [];
      for (let i = 0; i < steps.length; i++) {
        let tempBobot = [];
        dataPerbandingan.map((item, index) => {
          let bobot_1 = 1;
          let bobot_2 = 1;
          if (values[i]["perbandingan_" + index] > 1) {
            bobot_2 = values[i]["perbandingan_" + index];
          } else if (values[i]["perbandingan_" + index] < 1) {
            bobot_1 = 2 - values[i]["perbandingan_" + index];
          }

          tempBobot.push({
            mahasiswa_id_1: item[0].id,
            bobot_1,
            mahasiswa_id_2: item[1].id,
            bobot_2,
          });
        });
        pembobotan.push(tempBobot);
      }
      let mahasiswa_ids = data?.data?.data.map((item) => item.id);
      param = {
        beasiswa_id: id,
        pembobotan,
        kriteria: dataKriteria,
        mahasiswa_ids,
      };
    }
    onSetAddWaliKelasData(values);
    if (step < steps.length - 1) {
      let tempBobot = [];
      dataPerbandingan.map((item, index) => {
        let bobot_1 = 1;
        let bobot_2 = 1;
        if (values[step]["perbandingan_" + index] > 1) {
          bobot_2 = values[step]["perbandingan_" + index];
        } else if (values[step]["perbandingan_" + index] < 1) {
          bobot_1 = 2 - values[step]["perbandingan_" + index];
        }

        tempBobot.push({
          mahasiswa_id_1: item[0].id,
          bobot_1,
          mahasiswa_id_2: item[1].id,
          bobot_2,
        });
      });
      let tempParam = {
        pembobotan: tempBobot,
        total: data?.data?.data?.length,
      };
      const callback = () => {
        handleNext();
      };
      dispatch(AHP.post(tempParam, callback));
    } else {
      const callback = () => {
        history.push("/wali-kelas/beasiswa");
        onSetAddWaliKelasData(null);
        onSetWaliKelasStep(0);
      };
      dispatch(WaliKelas.put(param, callback));
    }
  };

  const StepForm = (kriteria) => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row-12">
        <BobotAlternatif
          data={data?.data?.data}
          kriteria={kriteria}
          validate={validateItem}
        />
      </div>
      <div className="d-flex justify-content-between">
        <Button variant="outlined" disabled={step === 0} onClick={handleBack}>
          Kembali
        </Button>
        <Button
          disabled={pending || ahp.pending}
          variant="contained"
          color="primary"
          type="submit"
        >
          {step < steps.length - 1 ? "Selanjutnya" : "Submit"}
        </Button>
      </div>
    </form>
  );

  const getStepContent = (stepIndex) => {
    return StepForm(stepIndex);
  };

  return (
    <Container>
      <div className="p-4">
        {/* {pending ? (
          <CircularProgress color="primary" />
        ) : (
          <> */}
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>{getStepContent(step)}</div>
        {/* </>
        )} */}
      </div>
    </Container>
  );
};

const validateItem = (value, allValues, name) => {
  const isRequired = allValues[name] === undefined;
  if (isRequired && !value && value !== 0) return "Perbandingan harus diisi";
};

// const validate = (values, allProps) => {
//   const { step } = values;
//   const errors = {};

//   console.log(values);
//   for (let i = 0; i < allProps.dataKriteria.length; i++) {
//     for (let j = 0; j < allProps.total; j++) {
//       // if (
//       //   values[i] &&
//       //   !values[i]["perbandingan_" + j] &&
//       //   values[i]["perbandingan_" + j] !== 0
//       // ) {
//       //   errors[i]["perbandingan_" + j] = "Perbandingan harus diisi";
//       // }
//     }
//   }

//   return errors;
// };

Index = reduxForm({
  form: "waliKelasAdd",
  // validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Index);

const mapStateToProps = ({
  waliKelas: { data, step, detailData, pending },
  mahasiswa,
  beasiswa: { detailData: detailBeasiswa },
  ahp,
}) => {
  let dataKriteria = [];
  let dataNamaKriteria = [];
  let dataPerbandingan = [];
  let total = 0;
  let initialValues = {
    // step: step,
  };
  if (detailBeasiswa) {
    if (detailBeasiswa.prestasi === true || detailBeasiswa.prestasi == "1") {
      dataKriteria.push("prestasi");
    }
    if (
      detailBeasiswa.organisasi === true ||
      detailBeasiswa.organisasi == "1"
    ) {
      dataKriteria.push("organisasi");
    }
    if (detailBeasiswa.sikap === true || detailBeasiswa.sikap == "1") {
      dataKriteria.push("sikap");
    }
    if (detailBeasiswa.nilai_sma === true || detailBeasiswa.nilai_sma == "1") {
      dataKriteria.push("nilai_sma");
    }
    dataKriteria.unshift("ipk_minimal", "penghasilan_orang_tua_maksimal");

    dataNamaKriteria = dataKriteria.map((item) => {
      switch (item) {
        case "ipk_minimal":
          return "IPK";
        case "penghasilan_orang_tua_maksimal":
          return "Penghasilan Orang Tua";
        case "prestasi":
          return "Prestasi";
        case "organisasi":
          return "Organisasi";
        case "sikap":
          return "Sikap";
        case "nilai_sma":
          return "Nilai Rapot SMA";
        default:
          return null;
      }
    });
  }
  if (data?.data?.data) {
    let temp = data.data.data?.map((item) => {
      return {
        nama: item.nama,
        id: item.id,
      };
    });

    if (temp) {
      dataPerbandingan = k_combinations(temp, 2);
    }
  }

  return {
    data,
    step,
    detailData,
    total,
    dataPerbandingan,
    pending,
    mahasiswa,
    dataKriteria,
    dataNamaKriteria,
    initialValues,
    ahp,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetWaliKelasModal: (modalType, isOpen) =>
      dispatch(setWaliKelasModal(modalType, isOpen)),
    onSetWaliKelasData: (data) => dispatch(setWaliKelasData(data)),
    onSetAddWaliKelasData: (data) => dispatch(setAddWaliKelasData(data)),
    onSetWaliKelasStep: (step) => dispatch(setWaliKelasStep(step)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));
