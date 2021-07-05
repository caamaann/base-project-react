import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput } from "../../../../components/commons/form";
import { setKetuaJurusanModal } from "../../../../store/actions/user/ketua-jurusan";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";

let detail = ({ onSetKetuaJurusanModal, pending }) => {
  return (
    <>
      <ModalHeader>Lihat Ketua Jurusan</ModalHeader>
      <ModalBody>
        <form>
          <LabelInputVerticalComponent label="NIP">
            <Field
              name="nip"
              placeholder="NamaNIP Ketua Jurusan"
              component={formInput}
              disabled
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Nama">
            <Field
              name="nama"
              placeholder="Nama Ketua Jurusan"
              component={formInput}
              disabled
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Jurusan">
            <Field
              name="jurusan"
              placeholder="Nama Jurusan"
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
          onClick={() => onSetKetuaJurusanModal("", false)}
        >
          Kembali
        </Button>
      </ModalBody>
    </>
  );
};

detail = reduxForm({
  form: "userKetuaJurusanDetail",
})(detail);

const mapStateToProps = ({ userKetuaJurusan: { detailData, pending } }) => {
  let initialValues = {};
  if (detailData) {
    initialValues = {
      nip: detailData.nip,
      jurusan: detailData.jurusan.nama,
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
    onSetKetuaJurusanModal: (modalType, isOpen) =>
      dispatch(setKetuaJurusanModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(detail);
