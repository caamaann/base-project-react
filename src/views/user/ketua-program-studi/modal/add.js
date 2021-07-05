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
import KetuaProgramStudi, {
  setKetuaProgramStudiModal,
} from "../../../../store/actions/user/ketua-program-studi";
import ProgramStudi from "../../../../store/actions/master/program-studi";

let Add = ({
  onSetKetuaProgramStudiModal,
  handleSubmit,
  handleRefresh,
  pending,
  programStudi,
}) => {
  const dispatch = useDispatch();

  const onSubmit = ({ nip, nama, program_studi }) => {
    const param = {
      nip,
      program_studi_id: program_studi.value,
      nama,
    };
    const callback = () => {
      onSetKetuaProgramStudiModal("", false);
      handleRefresh();
    };
    dispatch(KetuaProgramStudi.post(param, callback));
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
      <ModalHeader>Tambah Ketua Program Studi</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInputVerticalComponent label="NIP">
            <Field
              name="nip"
              placeholder="NIP Ketua Program Studi"
              component={formInputNumber}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Nama">
            <Field
              name="nama"
              placeholder="Nama Ketua Program Studi"
              component={formInput}
            />
          </LabelInputVerticalComponent>
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
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetKetuaProgramStudiModal("", false)}
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

const validate = ({ nip, program_studi, nama }) => {
  const errors = {};
  if (!nip) {
    errors.nip = "NIP harus diisi";
  }
  if (!nama) {
    errors.nama = "Nama harus diisi";
  }
  if (!program_studi) {
    errors.program_studi = "Program Studi harus diisi";
  }

  return errors;
};

Add = reduxForm({
  form: "userKetuaProgramStudiAdd",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Add);

const mapStateToProps = ({
  userKetuaProgramStudi: { pending },
  programStudi,
}) => {
  return { pending, programStudi };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetKetuaProgramStudiModal: (modalType, isOpen) =>
      dispatch(setKetuaProgramStudiModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
