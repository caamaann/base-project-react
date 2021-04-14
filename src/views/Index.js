import React from "react";
import { reduxForm, Field } from "redux-form";
import { Button } from "reactstrap";
import { formInput } from "../components/commons/form";

let Index = ({ handleSubmit }) => {
  const onSubmit = ({ tulisan }) => {
    alert(tulisan);
  };
  return (
    <div className="container d-flex mt-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <>
          <Field
            name="tulisan"
            type="text"
            placeholder="Tulis disini"
            component={formInput}
          />
        </>
        <Button type="submit" color="primary" className="primary-button">
          Kirim
        </Button>
      </form>
    </div>
  );
};

const validate = ({ tulisan }) => {
  const errors = {};
  if (!tulisan) {
    errors.tulisan = "Tulisan harus diisi";
  }

  return errors;
};

Index = reduxForm({
  form: "Index",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Index);

export default Index;
