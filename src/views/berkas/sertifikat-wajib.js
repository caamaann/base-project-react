import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { reduxForm, Field, formValueSelector } from "redux-form";
import FormContainer from "../../components/container/Form";
import DetailContentLihatBerkas from "../../components/global-components/DetailContent/LihatBerkas";
import CircularProgress from "@material-ui/core/CircularProgress";
import { formFile } from "../../components/commons/form";
import Mahasiswa, {
  setMahasiswaData,
  setMahasiswaModal,
} from "../../store/actions/mahasiswa";
import UserMahasiswa from "../../store/actions/user/mahasiswa";
import { Row, Column } from "simple-flexbox";
import { Button } from "@material-ui/core";
import { FOLDER_SERTIFIKAT_WAJIB } from "../../utils/constant";
import { getUser } from "../../utils/user";
import { StyleSheet, css } from "aphrodite";
import moment from "moment";

let Index = ({
  onSetMahasiswaData,
  onSetMahasiswaModal,
  handleSubmit,
  detailData,
  pending,
  reset,
  initialValues,
  userMahasiswa,
}) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const notEdit = () => {
    setIsEdit(!isEdit);
    reset();
  };
  const user = getUser();

  const onSubmit = ({
    sertifikat_metagama,
    sertifikat_bn,
    sertifikat_ppkk,
    sertifikat_butterfly,
    sertifikat_esq,
  }) => {
    let formData = new FormData();
    formData.append("sertifikat_ppkk", sertifikat_ppkk);
    formData.append("sertifikat_bn", sertifikat_bn);
    formData.append("sertifikat_metagama", sertifikat_metagama);
    formData.append("sertifikat_butterfly", sertifikat_butterfly);
    formData.append("sertifikat_esq", sertifikat_esq);

    const callback = () => {
      notEdit();
      dispatch(UserMahasiswa.getDetail({ id: user.profile.id }));
    };

    dispatch(Mahasiswa.uploadSertifikat(formData, callback));
  };

  const setModal = (modalType, isOpen, title, folderName, fileName) => {
    onSetMahasiswaModal(modalType, isOpen, title, folderName, fileName);
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
      <Row
        vertical="center"
        horizontal="space-between"
        style={{ width: "100%", marginBottom: 20 }}
      >
        <div>
          <h5>Data Sertifikat Wajib</h5>
        </div>
        <div className="d-flex justify-content-between">
          {isEdit ? (
            <>
              <Button
                variant="outlined"
                color="primary"
                disabled={pending}
                style={{ marginRight: 20 }}
                onClick={notEdit}
              >
                Batal
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={pending}
                type="submit"
              >
                Submit
              </Button>
            </>
          ) : userMahasiswa.pending ? (
            <CircularProgress color="primary" style={{ marginRight: 10 }} />
          ) : (
            <Button
              variant="contained"
              color="primary"
              disabled={pending}
              onClick={notEdit}
            >
              Edit
            </Button>
          )}
        </div>
      </Row>
      <FormContainer label="File Sertifikat Bela Negara">
        {!isEdit ? (
          <>
            {detailData?.sertifikat_bn ? (
              <DetailContentLihatBerkas
                onClick={() =>
                  setModal(
                    "show-document",
                    true,
                    "File Sertifikat Bela Negara",
                    FOLDER_SERTIFIKAT_WAJIB,
                    detailData.sertifikat_bn
                  )
                }
              />
            ) : (
              <span>Belum ada berkas</span>
            )}
          </>
        ) : (
          <Field
            name="sertifikat_bn"
            type="file"
            fileType="pdf/image"
            title="Masukkan Sertifikat"
            message="PDF / JPG"
            component={formFile}
          />
        )}
      </FormContainer>
      <FormContainer label="File Sertifikat PPKK">
        {!isEdit ? (
          <>
            {detailData?.sertifikat_ppkk ? (
              <DetailContentLihatBerkas
                onClick={() =>
                  setModal(
                    "show-document",
                    true,
                    "File Sertifikat PPKK",
                    FOLDER_SERTIFIKAT_WAJIB,
                    detailData.sertifikat_ppkk
                  )
                }
              />
            ) : (
              <span>Belum ada berkas</span>
            )}
          </>
        ) : (
          <Field
            name="sertifikat_ppkk"
            type="file"
            fileType="pdf/image"
            title="Masukkan Sertifikat"
            message="PDF / JPG"
            component={formFile}
          />
        )}
      </FormContainer>
      <FormContainer label="File Sertifikat Metagama">
        {!isEdit ? (
          <>
            {detailData?.sertifikat_metagama ? (
              <DetailContentLihatBerkas
                onClick={() =>
                  setModal(
                    "show-document",
                    true,
                    "File Sertifikat Metagama",
                    FOLDER_SERTIFIKAT_WAJIB,
                    detailData.sertifikat_metagama
                  )
                }
              />
            ) : (
              <span>Belum ada berkas</span>
            )}
          </>
        ) : (
          <Field
            name="sertifikat_metagama"
            type="file"
            fileType="pdf/image"
            title="Masukkan Sertifikat"
            message="PDF / JPG"
            component={formFile}
          />
        )}
      </FormContainer>
      <FormContainer label="File Sertifikat Inagurasi">
        {!isEdit ? (
          <>
            {detailData?.sertifikat_butterfly ? (
              <DetailContentLihatBerkas
                onClick={() =>
                  setModal(
                    "show-document",
                    true,
                    "File Sertifikat Inagurasi",
                    FOLDER_SERTIFIKAT_WAJIB,
                    detailData.sertifikat_butterfly
                  )
                }
              />
            ) : (
              <span>Belum ada berkas</span>
            )}
          </>
        ) : (
          <Field
            name="sertifikat_butterfly"
            type="file"
            fileType="pdf/image"
            title="Masukkan Sertifikat"
            message="PDF / JPG"
            component={formFile}
          />
        )}
      </FormContainer>
      <FormContainer label="File Sertifikat ESQ">
        {!isEdit ? (
          <>
            {detailData?.sertifikat_esq ? (
              <DetailContentLihatBerkas
                onClick={() =>
                  setModal(
                    "show-document",
                    true,
                    "File Sertifikat ESQ",
                    FOLDER_SERTIFIKAT_WAJIB,
                    detailData.sertifikat_esq
                  )
                }
              />
            ) : (
              <span>Belum ada berkas</span>
            )}
          </>
        ) : (
          <Field
            name="sertifikat_esq"
            type="file"
            fileType="pdf/image"
            title="Masukkan Sertifikat"
            message="PDF / JPG"
            component={formFile}
          />
        )}
      </FormContainer>
    </form>
  );
};

const validate = ({
  sertifikat_metagama,
  sertifikat_bn,
  sertifikat_ppkk,
  sertifikat_butterfly,
  sertifikat_esq,
}) => {
  const errors = {};
  if (!sertifikat_metagama) {
    errors.sertifikat_metagama = "Sertifikat harus diupload";
  }
  if (!sertifikat_bn) {
    errors.sertifikat_bn = "Sertifikat harus diupload";
  }
  if (!sertifikat_ppkk) {
    errors.sertifikat_ppkk = "Sertifikat harus diupload";
  }
  if (!sertifikat_butterfly) {
    errors.sertifikat_butterfly = "Sertifikat harus diupload";
  }
  if (!sertifikat_esq) {
    errors.sertifikat_esq = "Sertifikat harus diupload";
  }

  return errors;
};

Index = reduxForm({
  form: "mahasiswaSertifikatWajibEditData",
  validate: validate,
  shouldError: () => true,
  enableReinitialize: true,
})(Index);

const mapStateToProps = ({ userMahasiswa, mahasiswa }) => {
  const { detailData } = userMahasiswa;
  const { pending } = mahasiswa;
  let initialValues = {};
  if (detailData) {
    initialValues = {
      sertifikat_bn: detailData.sertifikat_bn,
      sertifikat_metagama: detailData.sertifikat_metagama,
      sertifikat_ppkk: detailData.sertifikat_ppkk,
      sertifikat_butterfly: detailData.sertifikat_butterfly,
      sertifikat_es: detailData.sertifikat_es,
    };
  }
  return {
    detailData,
    pending,
    userMahasiswa,
    initialValues,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetMahasiswaModal: (modalType, isOpen, title, folderName, fileName) =>
      dispatch(
        setMahasiswaModal(modalType, isOpen, title, folderName, fileName)
      ),
    onSetMahasiswaData: (data) => dispatch(setMahasiswaData(data)),
  };
};

const styles = StyleSheet.create({
  imgDocument: {
    maxHeight: 200,
    maxWidth: 200,
    objectFit: "contain",
    marginRight: "auto",
    marginLeft: "auto",
  },
  logo: {
    maxHeight: 200,
    maxWidth: 200,
    objectFit: "contain",
    marginRight: "auto",
    marginLeft: "auto",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
