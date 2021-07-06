import API from "../API";
import { actionPending, actionSuccess, actionError } from "../actionTypes";
import { setToastModal } from "..";
import { toastError, toastSuccess } from "../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_MAHASISWA_PENDING = "GET_MAHASISWA_PENDING";
export const GET_MAHASISWA_SUCCESS = "GET_MAHASISWA_SUCCESS";
export const GET_MAHASISWA_ERROR = "GET_MAHASISWA_ERROR";
export const POST_MAHASISWA_PENDING = "POST_MAHASISWA_PENDING";
export const POST_MAHASISWA_SUCCESS = "POST_MAHASISWA_SUCCESS";
export const POST_MAHASISWA_ERROR = "POST_MAHASISWA_ERROR";
export const PUT_MAHASISWA_PENDING = "PUT_MAHASISWA_PENDING";
export const PUT_MAHASISWA_SUCCESS = "PUT_MAHASISWA_SUCCESS";
export const PUT_MAHASISWA_ERROR = "PUT_MAHASISWA_ERROR";
export const DELETE_MAHASISWA_PENDING = "DELETE_MAHASISWA_PENDING";
export const DELETE_MAHASISWA_SUCCESS = "DELETE_MAHASISWA_SUCCESS";
export const DELETE_MAHASISWA_ERROR = "DELETE_MAHASISWA_ERROR";
export const BERKAS_MAHASISWA_PENDING = "BERKAS_MAHASISWA_PENDING";
export const BERKAS_MAHASISWA_SUCCESS = "BERKAS_MAHASISWA_SUCCESS";
export const BERKAS_MAHASISWA_ERROR = "BERKAS_MAHASISWA_ERROR";
export const SERTIFIKAT_MAHASISWA_PENDING = "SERTIFIKAT_MAHASISWA_PENDING";
export const SERTIFIKAT_MAHASISWA_SUCCESS = "SERTIFIKAT_MAHASISWA_SUCCESS";
export const SERTIFIKAT_MAHASISWA_ERROR = "SERTIFIKAT_MAHASISWA_ERROR";

export const MAHASISWA_DATA = "MAHASISWA_DATA";
export const ADD_MAHASISWA_DATA = "ADD_MAHASISWA_DATA";
export const MAHASISWA_STEP = "MAHASISWA_STEP";
export const SET_MAHASISWA_MODAL = "SET_MAHASISWA_MODAL";

// URL: URL_{URL}
const MAHASISWA_URL = "/mahasiswa";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_MAHASISWA_PENDING));
  API.get(MAHASISWA_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_MAHASISWA_SUCCESS, res));
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
      dispatch(actionError(GET_MAHASISWA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_MAHASISWA_PENDING));
  API.post(MAHASISWA_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_MAHASISWA_SUCCESS, res));
      toastSuccess("Berhasil mendaftar beasiswa");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_MAHASISWA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const uploadBerkas = (param, callback) => (dispatch) => {
  dispatch(actionPending(BERKAS_MAHASISWA_PENDING));
  API.post(MAHASISWA_URL + "/berkas_wajib", param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(BERKAS_MAHASISWA_SUCCESS, res));
      toastSuccess("Berkas berhasil diupload");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(BERKAS_MAHASISWA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const uploadSertifikat = (param, callback) => (dispatch) => {
  dispatch(actionPending(SERTIFIKAT_MAHASISWA_PENDING));
  API.post(MAHASISWA_URL + "/sertifikat_wajib", param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(SERTIFIKAT_MAHASISWA_SUCCESS, res));
      toastSuccess("Sertifikat berhasil diupload");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(SERTIFIKAT_MAHASISWA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_MAHASISWA_PENDING));
  API.put(MAHASISWA_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_MAHASISWA_SUCCESS, res));
      toastSuccess("Data Mahasiswa berhasil diubah");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_MAHASISWA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_MAHASISWA_PENDING));
  API.delete(MAHASISWA_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_MAHASISWA_SUCCESS, res));
      toastSuccess("Data Mahasiswa berhasil dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_MAHASISWA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const Mahasiswa = { get, post, put, deleted, uploadBerkas, uploadSertifikat };
export default Mahasiswa;

export const setMahasiswaData = (data) => (dispatch) =>
  dispatch({ type: MAHASISWA_DATA, data });

export const setMahasiswaModal =
  (modalType, isOpen, title, folderName, fileName) => (dispatch) =>
    dispatch(
      actionSuccess(SET_MAHASISWA_MODAL, {
        modalType: modalType,
        isOpen: isOpen,
        title: title,
        folderName: folderName,
        fileName: fileName,
      })
    );

export const setMahasiswaStep = (step) => (dispatch) =>
  dispatch({ type: MAHASISWA_STEP, step });

export const setAddMahasiswaData = (data) => (dispatch) =>
  dispatch({ type: ADD_MAHASISWA_DATA, data });
