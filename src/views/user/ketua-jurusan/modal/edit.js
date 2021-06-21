import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput, formSelect } from "../../../../components/commons/form";
import KetuaJurusan, {
  setKetuaJurusanModal,
} from "../../../../store/actions/user/ketua-jurusan";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";
import Jurusan from "../../../../store/actions/master/jurusan";

let Edit = ({
  onSetKetuaJurusanModal,
  handleSubmit,
  detailData,
  handleRefresh,
  pending,
  jurusan,
}) => {
  const dispatch = useDispatch();

  const onSubmit = ({ jurusan, nama }) => {
    const param = {
      id: detailData.id,
      jurusan_id: jurusan.value,
      nama,
    };
    const callback = () => {
      onSetKetuaJurusanModal("", false);
      handleRefresh();
    };
    dispatch(KetuaJurusan.put(param, callback));
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
      <ModalHeader>Edit Ketua Jurusan</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInputVerticalComponent label="Nama Ketua Jurusan">
            <Field
              name="nama"
              placeholder="Nama Ketua Jurusan"
              component={formInput}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Nama Jurusan">
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

const validate = ({ jurusan, nama }) => {
  const errors = {};
  if (!jurusan) {
    errors.jurusan = "Nama jurusan harus diisi";
  }
  if (!nama) {
    errors.nama = "Nama wilayah harus diisi";
  }

  return errors;
};

Edit = reduxForm({
  form: "userKetuaJurusanEdit",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Edit);

const mapStateToProps = ({
  userKetuaJurusan: { detailData, pending },
  jurusan,
}) => {
  let initialValues = {};
  if (detailData) {
    initialValues = {
      jurusan: { value: detailData.jurusan_id, label: detailData.jurusan_nama },
      nama: detailData.nama,
    };
  }
  return {
    detailData,
    initialValues,
    pending,
    jurusan,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetKetuaJurusanModal: (modalType, isOpen) =>
      dispatch(setKetuaJurusanModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
