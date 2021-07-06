import API from "../../API";
import { actionPending, actionSuccess, actionError } from "../../actionTypes";
import { setToastModal } from "../..";
import { toastError, toastSuccess } from "../../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_SERTIFIKAT_ORGANISASI_PENDING =
  "GET_SERTIFIKAT_ORGANISASI_PENDING";
export const GET_SERTIFIKAT_ORGANISASI_SUCCESS =
  "GET_SERTIFIKAT_ORGANISASI_SUCCESS";
export const GET_SERTIFIKAT_ORGANISASI_ERROR =
  "GET_SERTIFIKAT_ORGANISASI_ERROR";
export const POST_SERTIFIKAT_ORGANISASI_PENDING =
  "POST_SERTIFIKAT_ORGANISASI_PENDING";
export const POST_SERTIFIKAT_ORGANISASI_SUCCESS =
  "POST_SERTIFIKAT_ORGANISASI_SUCCESS";
export const POST_SERTIFIKAT_ORGANISASI_ERROR =
  "POST_SERTIFIKAT_ORGANISASI_ERROR";
export const PUT_SERTIFIKAT_ORGANISASI_PENDING =
  "PUT_SERTIFIKAT_ORGANISASI_PENDING";
export const PUT_SERTIFIKAT_ORGANISASI_SUCCESS =
  "PUT_SERTIFIKAT_ORGANISASI_SUCCESS";
export const PUT_SERTIFIKAT_ORGANISASI_ERROR =
  "PUT_SERTIFIKAT_ORGANISASI_ERROR";
export const DELETE_SERTIFIKAT_ORGANISASI_PENDING =
  "DELETE_SERTIFIKAT_ORGANISASI_PENDING";
export const DELETE_SERTIFIKAT_ORGANISASI_SUCCESS =
  "DELETE_SERTIFIKAT_ORGANISASI_SUCCESS";
export const DELETE_SERTIFIKAT_ORGANISASI_ERROR =
  "DELETE_SERTIFIKAT_ORGANISASI_ERROR";

export const SERTIFIKAT_ORGANISASI_DATA = "SERTIFIKAT_ORGANISASI_DATA";
export const SET_SERTIFIKAT_ORGANISASI_MODAL =
  "SET_SERTIFIKAT_ORGANISASI_MODAL";

// URL: URL_{URL}
const SERTIFIKAT_ORGANISASI_URL = "/mahasiswa/sertifikat/organisasi";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_SERTIFIKAT_ORGANISASI_PENDING));
  API.get(SERTIFIKAT_ORGANISASI_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_SERTIFIKAT_ORGANISASI_SUCCESS, res));
      const records_total = res.data.recordsTotal;
      let data = res.data.data.map((item, i) => ({
        ...item,
        no: i + 1 + (param?.page - 1) * param?.length,
      }));
      if (resolve) {
        resolve({
          data: data,
          page: param?.page - 1,
          totalCount: records_total,
        });
      }
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(GET_SERTIFIKAT_ORGANISASI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_SERTIFIKAT_ORGANISASI_PENDING));
  API.post(SERTIFIKAT_ORGANISASI_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_SERTIFIKAT_ORGANISASI_SUCCESS, res));
      toastSuccess("Sertifikat Organisasi berhasil ditambahkan");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_SERTIFIKAT_ORGANISASI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_SERTIFIKAT_ORGANISASI_PENDING));
  API.post(SERTIFIKAT_ORGANISASI_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_SERTIFIKAT_ORGANISASI_SUCCESS, res));
      toastSuccess("Sertifikat Organisasi berhasil diubah");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_SERTIFIKAT_ORGANISASI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_SERTIFIKAT_ORGANISASI_PENDING));
  API.delete(SERTIFIKAT_ORGANISASI_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_SERTIFIKAT_ORGANISASI_SUCCESS, res));
      toastSuccess("Sertifikat Organisasi berhasil dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_SERTIFIKAT_ORGANISASI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const SertifikatOrganisasi = { get, post, put, deleted };
export default SertifikatOrganisasi;

export const setSertifikatOrganisasiData = (data) => (dispatch) =>
  dispatch({ type: SERTIFIKAT_ORGANISASI_DATA, data });

export const setSertifikatOrganisasiModal =
  (modalType, isOpen, title, folderName, fileName) => (dispatch) =>
    dispatch(
      actionSuccess(SET_SERTIFIKAT_ORGANISASI_MODAL, {
        modalType: modalType,
        isOpen: isOpen,
        title: title,
        folderName: folderName,
        fileName: fileName,
      })
    );
