import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { ModalBody, ModalHeader } from "reactstrap";
import { Button } from "@material-ui/core";
import {
  formInput,
  formSelect,
  formInputNumber,
} from "../../../components/commons/form";
import { setWaliKelasModal } from "../../../store/actions/wali-kelas";
import LabelInputVerticalComponent from "../../../components/global-components/LabelInputVertical";
import {
  FOLDER_SERTIFIKAT_ORGANISASI,
  FOLDER_SERTIFIKAT_PRESTASI,
} from "../../../utils/constant";
import DetailContentLihatBerkas from "../../../components/global-components/DetailContent/LihatBerkas";

let detail = ({
  onSetWaliKelasModal,
  pending,
  sertifikat_prestasi,
  sertifikat_organisasi,
}) => {
  return (
    <>
      <ModalHeader>Lihat Mahasiswa</ModalHeader>
      <ModalBody>
        <form>
          <div className="row">
            <div className="col-6 border-right">
              <LabelInputVerticalComponent label="NIM">
                <Field
                  name="nim"
                  disabled
                  placeholder="NIM"
                  component={formInputNumber}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="Nama Mahasiswa">
                <Field
                  name="nama"
                  disabled
                  placeholder="Nama"
                  component={formInput}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="Email">
                <Field
                  name="email"
                  disabled
                  placeholder="Email"
                  component={formInput}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="IPK">
                <Field
                  name="ipk"
                  placeholder="ipk"
                  disabled
                  component={formInputNumber}
                />
              </LabelInputVerticalComponent>
              <LabelInputVerticalComponent label="Penghasilan Orang Tua">
                <Field
                  name="penghasilan_orang_tua"
                  placeholder="Penghasilan Orang Tua"
                  disabled
                  thousandSeparator
                  component={formInputNumber}
                />
              </LabelInputVerticalComponent>
            </div>
            <div className="col-6">
              <LabelInputVerticalComponent label="Sertifikat Prestasi">
                {sertifikat_prestasi.length > 0 ? (
                  sertifikat_prestasi.map((item, index) => (
                    <div className="py-1">
                      <DetailContentLihatBerkas
                        onClick={() =>
                          window.open(
                            `${process.env.REACT_APP_SPK_BEASISWA_URL_FILE}/${FOLDER_SERTIFIKAT_PRESTASI}/${item}`,
                            "_blank"
                          )
                        }
                      />
                    </div>
                  ))
                ) : (
                  <span>Belum ada berkas</span>
                )}
              </LabelInputVerticalComponent>
              <div className="w-100 border-bottom my-3"></div>
              <LabelInputVerticalComponent label="Sertifikat Prestasi">
                {sertifikat_organisasi.length > 0 ? (
                  sertifikat_organisasi.map((item, index) => (
                    <div className="py-1">
                      <DetailContentLihatBerkas
                        onClick={() =>
                          window.open(
                            `${process.env.REACT_APP_SPK_BEASISWA_URL_FILE}/${FOLDER_SERTIFIKAT_ORGANISASI}/${item}`,
                            "_blank"
                          )
                        }
                      />
                    </div>
                  ))
                ) : (
                  <span>Belum ada berkas</span>
                )}
              </LabelInputVerticalComponent>
            </div>
          </div>
        </form>
        <Button
          variant="outlined"
          disabled={pending}
          className="mt-3"
          color="primary"
          onClick={() => onSetWaliKelasModal("", false)}
        >
          Kembali
        </Button>
      </ModalBody>
    </>
  );
};

detail = reduxForm({
  form: "waliKelasDetail",
})(detail);

const mapStateToProps = ({ waliKelas: { detailData, pending } }) => {
  let initialValues = {};
  let sertifikat_prestasi, sertifikat_organisasi;
  if (detailData) {
    let total_penghasilan = 0;
    if (detailData.orang_tua_mahasiswa) {
      total_penghasilan =
        detailData.orang_tua_mahasiswa.penghasilan_ayah +
        detailData.orang_tua_mahasiswa.penghasilan_ibu +
        detailData.orang_tua_mahasiswa.penghasilan_sambilan_ayah +
        detailData.orang_tua_mahasiswa.penghasilan_sambilan_ibu;
    }

    initialValues = {
      nim: detailData.nim,
      nama: detailData.nama,
      email: detailData.email,
      ipk: detailData.ipk,
      penghasilan_orang_tua: total_penghasilan,
    };

    sertifikat_prestasi = detailData.sertifikat_prestasi.map(
      (item) => item.file_sertifikat
    );
    sertifikat_organisasi = detailData.sertifikat_organisasi.map(
      (item) => item.file_sertifikat
    );
  }
  return {
    initialValues,
    pending,
    sertifikat_prestasi,
    sertifikat_organisasi,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetWaliKelasModal: (modalType, isOpen) =>
      dispatch(setWaliKelasModal(modalType, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(detail);
