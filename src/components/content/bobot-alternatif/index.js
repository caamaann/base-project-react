import React, { useState } from "react";
import { k_combinations } from "../../../utils/combination";
import Slider from "../../commons/form/slider";
import { Field } from "redux-form";

let Index = ({ data, disabled, kriteria, validate }) => {
  let tempNama = data?.map((item) => {
    return item.nama;
  });

  let perbandingan = [];
  if (tempNama) {
    perbandingan = k_combinations(tempNama, 2);
  }
  return (
    <div>
      {perbandingan.map((item, index) => {
        return (
          <div className="row" key={index}>
            <div className="col-3" style={{ textAlign: "right" }}>
              {item[0]}
            </div>
            <div className="col-6">
              <Field
                name={"[" + kriteria + "].perbandingan_" + index.toString()}
                component={Slider}
                disabled={disabled}
                validate={validate}
              />
            </div>
            <div className="col-3" style={{ textAlign: "left" }}>
              {item[1]}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Index;
