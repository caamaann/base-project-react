import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput } from "../../../../components/commons/form";
import { setPembantuDirektur3Modal } from "../../../../store/actions/user/pembantu-direktur-3";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";

let detail = ({ onSetPembantuDirektur3Modal, pending }) => {
  return (
    <>
      <ModalHeader>Lihat Pembantu Direktur 3</ModalHeader>
      <ModalBody>
        <form>
          <LabelInputVerticalComponent label="NIP">
            <Field
              name="nip"
              placeholder="NIP Pembantu Direktur 3"
              component={formInput}
              disabled
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Nama">
            <Field
              name="nama"
              placeholder="Nama Pembantu Direktur 3"
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
          onClick={() => onSetPembantuDirektur3Modal("", false)}
        >
          Kembali
        </Button>
      </ModalBody>
    </>
  );
};

detail = reduxForm({
  form: "userPembantuDirektur3Detail",
})(detail);

const mapStateToProps = ({
  userPembantuDirektur3: { detailData, pending },
}) => {
  let initialValues = {};
  if (detailData) {
    initialValues = {
      nip: detailData.nip,
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
    onSetPembantuDirektur3Modal: (modalType, isOpen) =>
      dispatch(setPembantuDirektur3Modal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(detail);
