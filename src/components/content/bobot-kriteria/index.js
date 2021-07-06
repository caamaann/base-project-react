import React, { useState } from "react";
import { k_combinations } from "../../../utils/combination";
import Slider from "../../commons/form/slider";
import { Field } from "redux-form";

let Index = ({ data, disabled }) => {
  let dataKriteria = [];
  if (data.prestasi === true || data.prestasi == "1") {
    dataKriteria.push("prestasi");
  }
  if (data.organisasi === true || data.organisasi == "1") {
    dataKriteria.push("organisasi");
  }
  if (data.sikap === true || data.sikap == "1") {
    dataKriteria.push("sikap");
  }
  if (data.nilai_sma === true || data.nilai_sma == "1") {
    dataKriteria.push("nilai_sma");
  }
  dataKriteria.unshift("ipk_minimal", "penghasilan_orang_tua_maksimal");

  let tempNama = dataKriteria.map((item) => {
    switch (item) {
      case "ipk_minimal":
        return "IPK";
      case "penghasilan_orang_tua_maksimal":
        return "Penghasilan Orang Tua";
      case "prestasi":
        return "Prestasi";
      case "organisasi":
        return "Organisasi";
      case "sikap":
        return "Sikap";
      case "nilai_sma":
        return "Nilai Rapot SMA";
      default:
        return null;
    }
  });
  let perbandingan = k_combinations(tempNama, 2);
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
                name={"perbandingan_" + index.toString()}
                component={Slider}
                disabled={disabled}
                // validate={validate}
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
