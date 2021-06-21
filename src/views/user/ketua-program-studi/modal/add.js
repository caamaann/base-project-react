import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput, formSelect } from "../../../../components/commons/form";
import LabelInputVerticalComponent from "../../../../components/global-components/LabelInputVertical";
import KetuaProgramStudi, {
  setKetuaProgramStudiModal,
} from "../../../../store/actions/user/ketua-program-studi";
import Jurusan from "../../../../store/actions/master/jurusan";

let Add = ({
  onSetKetuaProgramStudiModal,
  handleSubmit,
  handleRefresh,
  pending,
  jurusan,
}) => {
  const dispatch = useDispatch();

  const onSubmit = ({ nama, jurusan }) => {
    const param = {
      jurusan_id: jurusan.value,
      nama,
    };
    const callback = () => {
      onSetKetuaProgramStudiModal("", false);
      handleRefresh();
    };
    dispatch(KetuaProgramStudi.post(param, callback));
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
      <ModalHeader>Tambah Ketua Program Studi</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInputVerticalComponent label="Nama Ketua Program Studi">
            <Field
              name="nama"
              placeholder="Nama Ketua Program Studi"
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

const validate = ({ jurusan, nama }) => {
  const errors = {};
  if (!nama) {
    errors.nama = "Nama program studi harus diisi";
  }
  if (!jurusan) {
    errors.jurusan = "Nama jurusan harus diisi";
  }

  return errors;
};

Add = reduxForm({
  form: "userKetuaProgramStudiAdd",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Add);

const mapStateToProps = ({ userKetuaProgramStudi: { pending }, jurusan }) => {
  return { pending, jurusan };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetKetuaProgramStudiModal: (modalType, isOpen) =>
      dispatch(setKetuaProgramStudiModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);
