import API from "../../API";
import { actionPending, actionSuccess, actionError } from "../../actionTypes";
import { setToastModal } from "../..";
import { toastError, toastSuccess } from "../../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_SERTIFIKAT_PRESTASI_PENDING =
  "GET_SERTIFIKAT_PRESTASI_PENDING";
export const GET_SERTIFIKAT_PRESTASI_SUCCESS =
  "GET_SERTIFIKAT_PRESTASI_SUCCESS";
export const GET_SERTIFIKAT_PRESTASI_ERROR = "GET_SERTIFIKAT_PRESTASI_ERROR";
export const POST_SERTIFIKAT_PRESTASI_PENDING =
  "POST_SERTIFIKAT_PRESTASI_PENDING";
export const POST_SERTIFIKAT_PRESTASI_SUCCESS =
  "POST_SERTIFIKAT_PRESTASI_SUCCESS";
export const POST_SERTIFIKAT_PRESTASI_ERROR = "POST_SERTIFIKAT_PRESTASI_ERROR";
export const PUT_SERTIFIKAT_PRESTASI_PENDING =
  "PUT_SERTIFIKAT_PRESTASI_PENDING";
export const PUT_SERTIFIKAT_PRESTASI_SUCCESS =
  "PUT_SERTIFIKAT_PRESTASI_SUCCESS";
export const PUT_SERTIFIKAT_PRESTASI_ERROR = "PUT_SERTIFIKAT_PRESTASI_ERROR";
export const DELETE_SERTIFIKAT_PRESTASI_PENDING =
  "DELETE_SERTIFIKAT_PRESTASI_PENDING";
export const DELETE_SERTIFIKAT_PRESTASI_SUCCESS =
  "DELETE_SERTIFIKAT_PRESTASI_SUCCESS";
export const DELETE_SERTIFIKAT_PRESTASI_ERROR =
  "DELETE_SERTIFIKAT_PRESTASI_ERROR";

export const SERTIFIKAT_PRESTASI_DATA = "SERTIFIKAT_PRESTASI_DATA";
export const SET_SERTIFIKAT_PRESTASI_MODAL = "SET_SERTIFIKAT_PRESTASI_MODAL";

// URL: URL_{URL}
const SERTIFIKAT_PRESTASI_URL = "/mahasiswa/sertifikat/prestasi";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_SERTIFIKAT_PRESTASI_PENDING));
  API.get(SERTIFIKAT_PRESTASI_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_SERTIFIKAT_PRESTASI_SUCCESS, res));
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
      dispatch(actionError(GET_SERTIFIKAT_PRESTASI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_SERTIFIKAT_PRESTASI_PENDING));
  API.post(SERTIFIKAT_PRESTASI_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_SERTIFIKAT_PRESTASI_SUCCESS, res));
      toastSuccess("Sertifikat Prestasi berhasil ditambahkan");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_SERTIFIKAT_PRESTASI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_SERTIFIKAT_PRESTASI_PENDING));
  API.post(SERTIFIKAT_PRESTASI_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_SERTIFIKAT_PRESTASI_SUCCESS, res));
      toastSuccess("Sertifikat Prestasi berhasil diubah");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_SERTIFIKAT_PRESTASI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_SERTIFIKAT_PRESTASI_PENDING));
  API.delete(SERTIFIKAT_PRESTASI_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_SERTIFIKAT_PRESTASI_SUCCESS, res));
      toastSuccess("Sertifikat Prestasi berhasil dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_SERTIFIKAT_PRESTASI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const SertifikatPrestasi = { get, post, put, deleted };
export default SertifikatPrestasi;

export const setSertifikatPrestasiData = (data) => (dispatch) =>
  dispatch({ type: SERTIFIKAT_PRESTASI_DATA, data });

export const setSertifikatPrestasiModal =
  (modalType, isOpen, title, folderName, fileName) => (dispatch) =>
    dispatch(
      actionSuccess(SET_SERTIFIKAT_PRESTASI_MODAL, {
        modalType: modalType,
        isOpen: isOpen,
        title: title,
        folderName: folderName,
        fileName: fileName,
      })
    );
