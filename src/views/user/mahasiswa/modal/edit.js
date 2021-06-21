import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput, formSelect } from "../../../../components/commons/form";
import Mahasiswa, {
  setMahasiswaModal,
} from "../../../../store/actions/user/mahasiswa";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";
import Jurusan from "../../../../store/actions/master/jurusan";

let Edit = ({
  onSetMahasiswaModal,
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
      onSetMahasiswaModal("", false);
      handleRefresh();
    };
    dispatch(Mahasiswa.put(param, callback));
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
      <ModalHeader>Edit Mahasiswa</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInputVerticalComponent label="Nama Mahasiswa">
            <Field
              name="nama"
              placeholder="Nama Mahasiswa"
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
              onClick={() => onSetMahasiswaModal("", false)}
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
  form: "userMahasiswaEdit",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Edit);

const mapStateToProps = ({
  userMahasiswa: { detailData, pending },
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
    onSetMahasiswaModal: (modalType, isOpen) =>
      dispatch(setMahasiswaModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
