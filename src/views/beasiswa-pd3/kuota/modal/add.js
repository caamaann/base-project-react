import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import {
  formInputNumber,
  formSelect,
} from "../../../../components/commons/form";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";
import Kuota, { setKuotaModal } from "../../../../store/actions/kuota";
import ProgramStudi from "../../../../store/actions/master/program-studi";
import { yearOptions } from "../../../../utils/date";

let Add = ({
  onSetKuotaModal,
  handleSubmit,
  handleRefresh,
  pending,
  programStudi,
}) => {
  const dispatch = useDispatch();
  const path = window.location.pathname.split("/");
  const id = path.pop();

  const onSubmit = ({ program_studi, kuota, angkatan }) => {
    const param = {
      beasiswa_id: id,
      program_studi_id: program_studi.value,
      kuota: kuota,
      angkatan: angkatan.value,
    };
    const callback = () => {
      onSetKuotaModal("", false);
      handleRefresh();
    };
    dispatch(Kuota.post(param, callback));
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
    <>
      <ModalHeader>Tambah Kuota Beasiswa</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInputVerticalComponent label="Program Studi">
            <Field
              name="program_studi"
              placeholder="Program Studi"
              component={formSelect}
              options={programStudiOptions}
              isAsync
              asyncUrl="/program_studi"
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Angkatan">
            <Field
              name="angkatan"
              placeholder="Angkatan"
              component={formSelect}
              options={yearOptions()}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Kuota">
            <Field
              name="kuota"
              placeholder="Kuota"
              component={formInputNumber}
            />
          </LabelInputVerticalComponent>
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetKuotaModal("", false)}
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

const validate = ({ program_studi, kuota, angkatan }) => {
  const errors = {};
  if (!program_studi) {
    errors.program_studi = "Program studi harus diisi";
  }
  if (!kuota) {
    errors.kuota = "Kuota harus diisi";
  }
  if (!angkatan) {
    errors.angkatan = "Angkatan harus diisi";
  }

  return errors;
};

Add = reduxForm({
  form: "kuotaAdd",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Add);

const mapStateToProps = ({ kuota: { pending }, programStudi }) => {
  return { pending, programStudi };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetKuotaModal: (modalType, isOpen) =>
      dispatch(setKuotaModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
