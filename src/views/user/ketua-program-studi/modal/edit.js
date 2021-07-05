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
import KetuaProgramStudi, {
  setKetuaProgramStudiModal,
} from "../../../../store/actions/user/ketua-program-studi";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";
import ProgramStudi from "../../../../store/actions/master/program-studi";

let Edit = ({
  onSetKetuaProgramStudiModal,
  handleSubmit,
  detailData,
  handleRefresh,
  pending,
  programStudi,
}) => {
  const dispatch = useDispatch();

  const onSubmit = ({ nip, program_studi, nama }) => {
    const param = {
      id: detailData.id,
      nip,
      program_studi_id: program_studi.value,
      nama,
    };
    const callback = () => {
      onSetKetuaProgramStudiModal("", false);
      handleRefresh();
    };
    dispatch(KetuaProgramStudi.put(param, callback));
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
      <ModalHeader>Edit Ketua Program Studi</ModalHeader>
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

Edit = reduxForm({
  form: "userKetuaProgramStudiEdit",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Edit);

const mapStateToProps = ({
  userKetuaProgramStudi: { detailData, pending },
  programStudi,
}) => {
  let initialValues = {};
  if (detailData) {
    initialValues = {
      nip: detailData.nip,
      program_studi: {
        value: detailData.program_studi.id,
        label: detailData.program_studi.nama,
      },
      nama: detailData.nama,
    };
  }
  return {
    detailData,
    initialValues,
    pending,
    programStudi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetKetuaProgramStudiModal: (modalType, isOpen) =>
      dispatch(setKetuaProgramStudiModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
