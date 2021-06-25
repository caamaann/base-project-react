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
import KetuaJurusan, {
  setKetuaJurusanModal,
} from "../../../../store/actions/user/ketua-jurusan";
import Jurusan from "../../../../store/actions/master/jurusan";

let Add = ({
  onSetKetuaJurusanModal,
  handleSubmit,
  handleRefresh,
  pending,
  jurusan,
}) => {
  const dispatch = useDispatch();

  const onSubmit = ({ nip, nama, jurusan }) => {
    const param = {
      nip,
      jurusan_id: jurusan.value,
      nama,
    };
    const callback = () => {
      onSetKetuaJurusanModal("", false);
      handleRefresh();
    };
    dispatch(KetuaJurusan.post(param, callback));
  };

  let jurusanOptions;
  if (jurusan.data) {
    jurusanOptions = jurusan.data.data.data.map((item) => {
      return {
        label: item.nama,
        value: item.id,
      };
    });
  }

  useEffect(() => {
    getJurusan();
  }, []);

  const getJurusan = () => dispatch(Jurusan.get());
  return (
    <>
      <ModalHeader>Tambah Ketua Jurusan</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInputVerticalComponent label="NIP">
            <Field
              name="nip"
              placeholder="NIP Ketua Jurusan"
              component={formInputNumber}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Nama">
            <Field
              name="nama"
              placeholder="Nama Ketua Jurusan"
              component={formInput}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Jurusan">
            <Field
              name="jurusan"
              placeholder="Jurusan"
              component={formSelect}
              options={jurusanOptions}
              isAsync
              asyncUrl="/jurusan"
            />
          </LabelInputVerticalComponent>
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetKetuaJurusanModal("", false)}
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

const validate = ({ nip, jurusan, nama }) => {
  const errors = {};
  if (!nip) {
    errors.nip = "NIP harus diisi";
  }
  if (!nama) {
    errors.nama = "Nama ketua jurusan harus diisi";
  }
  if (!jurusan) {
    errors.jurusan = "Jurusan harus diisi";
  }

  return errors;
};

Add = reduxForm({
  form: "userKetuaJurusanAdd",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Add);

const mapStateToProps = ({ userKetuaJurusan: { pending }, jurusan }) => {
  return { pending, jurusan };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetKetuaJurusanModal: (modalType, isOpen) =>
      dispatch(setKetuaJurusanModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
