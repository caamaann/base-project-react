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
import { FOLDER_BERKAS_WAJIB } from "../../utils/constant";
import { getUser } from "../../utils/user";
import { StyleSheet, css } from "aphrodite";
import moment from "moment";

let Index = ({
  onSetMahasiswaData,
  userMahasiswa,
  onSetMahasiswaModal,
  handleSubmit,
  detailData,
  pending,
  reset,
  initialValues,
}) => {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const notEdit = () => {
    setIsEdit(!isEdit);
    reset();
  };
  const user = getUser();

  const onSubmit = ({ file_transkrip_nilai, file_kk, file_ktm }) => {
    let formData = new FormData();
    formData.append("file_ktm", file_ktm);
    formData.append("file_kk", file_kk);
    formData.append("file_transkrip_nilai", file_transkrip_nilai);

    const callback = () => {
      notEdit();
      dispatch(UserMahasiswa.getDetail({ id: user.profile.id }));
    };

    dispatch(Mahasiswa.uploadBerkas(formData, callback));
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
          <h5>Data Berkas Wajib</h5>
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
      <FormContainer label="File Kartu Keluarga">
        {!isEdit ? (
          <>
            {detailData?.file_kk ? (
              <DetailContentLihatBerkas
                onClick={() =>
                  setModal(
                    "show-document",
                    true,
                    "File Kartu Keluarga",
                    FOLDER_BERKAS_WAJIB,
                    detailData.file_kk
                  )
                }
              />
            ) : (
              <span>Belum ada berkas</span>
            )}
          </>
        ) : (
          <Field
            name="file_kk"
            type="file"
            fileType="pdf/image"
            title="Masukkan Berkas"
            message="PDF / JPG"
            component={formFile}
          />
        )}
      </FormContainer>
      <FormContainer label="File Kartu Tanda Mahasiswa">
        {!isEdit ? (
          <>
            {detailData?.file_ktm ? (
              <DetailContentLihatBerkas
                onClick={() =>
                  setModal(
                    "show-document",
                    true,
                    "File Kartu Tanda Mahasiswa",
                    FOLDER_BERKAS_WAJIB,
                    detailData.file_ktm
                  )
                }
              />
            ) : (
              <span>Belum ada berkas</span>
            )}
          </>
        ) : (
          <Field
            name="file_ktm"
            type="file"
            fileType="pdf/image"
            title="Masukkan Berkas"
            message="PDF / JPG"
            component={formFile}
          />
        )}
      </FormContainer>
      <FormContainer label="File Transkrip Nilai">
        {!isEdit ? (
          <>
            {detailData?.file_transkrip_nilai ? (
              <DetailContentLihatBerkas
                onClick={() =>
                  setModal(
                    "show-document",
                    true,
                    "File Transkrip Nilai",
                    FOLDER_BERKAS_WAJIB,
                    detailData.file_transkrip_nilai
                  )
                }
              />
            ) : (
              <span>Belum ada berkas</span>
            )}
          </>
        ) : (
          <Field
            name="file_transkrip_nilai"
            type="file"
            fileType="pdf/image"
            title="Masukkan Berkas"
            message="PDF / JPG"
            component={formFile}
          />
        )}
      </FormContainer>
    </form>
  );
};

const validate = ({ file_transkrip_nilai, file_kk, file_ktm }) => {
  const errors = {};
  if (!file_transkrip_nilai) {
    errors.file_transkrip_nilai = "Berkas harus diupload";
  }
  if (!file_kk) {
    errors.file_kk = "Berkas harus diupload";
  }
  if (!file_ktm) {
    errors.file_ktm = "Berkas harus diupload";
  }

  return errors;
};

Index = reduxForm({
  form: "mahasiswaBerkasWajibEditData",
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
      file_kk: detailData.file_kk,
      file_transkrip_nilai: detailData.file_transkrip_nilai,
      file_ktm: detailData.file_ktm,
    };
  }
  return {
    detailData,
    userMahasiswa,
    pending,
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
