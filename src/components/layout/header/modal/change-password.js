import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import { formInput } from "../../../commons/form";
import Header, { setHeaderModal } from "../../../../store/actions/header";
// import Auth from "../../../../store/actions/auth";
import LabelInputVerticalComponent from "../../../global-components/LabelInputVertical";
import { regexPassword } from "../../../../utils/constant";
import { history } from "../../../../utils";

let Edit = ({ onSetHeaderModal, handleSubmit, handleRefresh, pending }) => {
  const dispatch = useDispatch();
  const [isVisibleOld, setIsVisibleOld] = useState(false);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const onSubmit = ({ old_password, new_password, confirm_new_password }) => {
    const param = {
      old_password,
      new_password,
      confirm_new_password,
    };
    const callback = () => {
      onSetHeaderModal("", false);
      // handleRefresh();
      history.push("/login");
    };
    // dispatch(Auth.change_password(param, callback));
  };
  return (
    <>
      <ModalHeader>Ubah Password</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabelInputVerticalComponent label="Password Lama">
            <Field
              name="old_password"
              placeholder="Password Lama"
              type={!isVisibleOld ? "password" : "text"}
              isVisible={isVisibleOld}
              setIsVisible={() => setIsVisibleOld(!isVisibleOld)}
              isTypePassword
              component={formInput}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Password Baru">
            <Field
              name="new_password"
              placeholder="Password Baru"
              type={!isVisibleNew ? "password" : "text"}
              isVisible={isVisibleNew}
              setIsVisible={() => setIsVisibleNew(!isVisibleNew)}
              isTypePassword
              component={formInput}
            />
          </LabelInputVerticalComponent>
          <LabelInputVerticalComponent label="Konfirmasi Password">
            <Field
              name="confirm_new_password"
              placeholder="Konfirmasi Password"
              type={!isVisibleConfirm ? "password" : "text"}
              isVisible={isVisibleConfirm}
              setIsVisible={() => setIsVisibleConfirm(!isVisibleConfirm)}
              isTypePassword
              component={formInput}
            />
          </LabelInputVerticalComponent>
          <div className="d-flex justify-content-between">
            <Button
              variant="outlined"
              className="mt-3"
              disabled={pending}
              color="primary"
              onClick={() => onSetHeaderModal("", false)}
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

const validate = ({ old_password, new_password, confirm_new_password }) => {
  const errors = {};
  if (!old_password) {
    errors.old_password = "Password Lama harus diisi";
  }
  if (!new_password) {
    errors.new_password = "Password Baru harus diisi";
  }
  //  else if (!regexPassword.test(new_password)) {
  //   errors.new_password = "Password Baru tidak valid";
  // }
  if (!confirm_new_password) {
    errors.confirm_new_password = "Konfirmasi Password harus diisi";
  } else if (new_password !== confirm_new_password) {
    errors.confirm_new_password = "Konfirmasi Password tidak sama";
  }
  return errors;
};

Edit = reduxForm({
  form: "regionEdit",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Edit);

const mapStateToProps = ({ auth: { pending } }) => {
  return {
    pending,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetHeaderModal: (modalType, isOpen) =>
      dispatch(setHeaderModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
