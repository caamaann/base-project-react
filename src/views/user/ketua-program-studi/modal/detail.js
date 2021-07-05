import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput } from "../../../../components/commons/form";
import { setKetuaProgramStudiModal } from "../../../../store/actions/user/ketua-program-studi";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";

let detail = ({ onSetKetuaProgramStudiModal, pending }) => {
  return (
    <>
      <ModalHeader>Lihat Ketua Program Studi</ModalHeader>
      <ModalBody>
        <form>
          <LabelInputVerticalComponent label="NIP">
            <Field
              name="nip"
              placeholder="NIP Ketua Program Studi"
              disabled
              component={formInput}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Nama">
            <Field
              name="nama"
              placeholder="Nama Ketua Program Studi"
              disabled
              component={formInput}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Program Studi">
            <Field
              name="program_studi"
              placeholder="Program Studi"
              component={formInput}
              disabled
            />
          </LabelInputVerticalComponent>
        </form>
        <Button
          variant="outlined"
          disabled={pending}
          className="mt-3"
          color="primary"
          onClick={() => onSetKetuaProgramStudiModal("", false)}
        >
          Kembali
        </Button>
      </ModalBody>
    </>
  );
};

detail = reduxForm({
  form: "userKetuaProgramStudiDetail",
})(detail);

const mapStateToProps = ({
  userKetuaProgramStudi: { detailData, pending },
}) => {
  let initialValues = {};
  if (detailData) {
    initialValues = {
      nip: detailData.nip,
      program_studi: detailData.program_studi.nama,
      nama: detailData.nama,
    };
  }
  return {
    initialValues,
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetKetuaProgramStudiModal: (modalType, isOpen) =>
      dispatch(setKetuaProgramStudiModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(detail);
