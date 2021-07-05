import API from "../../API";
import { actionPending, actionSuccess, actionError } from "../../actionTypes";
import { setToastModal } from "../..";
import { toastError, toastSuccess } from "../../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_USER_MAHASISWA_PENDING = "GET_USER_MAHASISWA_PENDING";
export const GET_USER_MAHASISWA_SUCCESS = "GET_USER_MAHASISWA_SUCCESS";
export const GET_USER_MAHASISWA_ERROR = "GET_USER_MAHASISWA_ERROR";
export const GET_DETAIL_USER_MAHASISWA_PENDING =
  "GET_DETAIL_USER_MAHASISWA_PENDING";
export const GET_DETAIL_USER_MAHASISWA_SUCCESS =
  "GET_DETAIL_USER_MAHASISWA_SUCCESS";
export const GET_DETAIL_USER_MAHASISWA_ERROR =
  "GET_DETAIL_USER_MAHASISWA_ERROR";
export const POST_USER_MAHASISWA_PENDING = "POST_USER_MAHASISWA_PENDING";
export const POST_USER_MAHASISWA_SUCCESS = "POST_USER_MAHASISWA_SUCCESS";
export const POST_USER_MAHASISWA_ERROR = "POST_USER_MAHASISWA_ERROR";
export const PUT_USER_MAHASISWA_PENDING = "PUT_USER_MAHASISWA_PENDING";
export const PUT_USER_MAHASISWA_SUCCESS = "PUT_USER_MAHASISWA_SUCCESS";
export const PUT_USER_MAHASISWA_ERROR = "PUT_USER_MAHASISWA_ERROR";
export const DELETE_USER_MAHASISWA_PENDING = "DELETE_USER_MAHASISWA_PENDING";
export const DELETE_USER_MAHASISWA_SUCCESS = "DELETE_USER_MAHASISWA_SUCCESS";
export const DELETE_USER_MAHASISWA_ERROR = "DELETE_USER_MAHASISWA_ERROR";

export const USER_MAHASISWA_DATA = "USER_MAHASISWA_DATA";
export const SET_USER_MAHASISWA_MODAL = "SET_USER_MAHASISWA_MODAL";

// URL: URL_{URL}
const USER_MAHASISWA_URL = "/user/mahasiswa";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_USER_MAHASISWA_PENDING));
  API.get(USER_MAHASISWA_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_USER_MAHASISWA_SUCCESS, res));
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
      dispatch(actionError(GET_USER_MAHASISWA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const getDetail = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_DETAIL_USER_MAHASISWA_PENDING));
  API.get(USER_MAHASISWA_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_DETAIL_USER_MAHASISWA_SUCCESS, res));
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
      dispatch(actionError(GET_DETAIL_USER_MAHASISWA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_USER_MAHASISWA_PENDING));
  API.post(USER_MAHASISWA_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_USER_MAHASISWA_SUCCESS, res));
      toastSuccess("Mahasiswa berhasil ditambahkan");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_USER_MAHASISWA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_USER_MAHASISWA_PENDING));
  API.put(USER_MAHASISWA_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_USER_MAHASISWA_SUCCESS, res));
      toastSuccess("Mahasiswa berhasil diubah");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_USER_MAHASISWA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_USER_MAHASISWA_PENDING));
  API.delete(USER_MAHASISWA_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_USER_MAHASISWA_SUCCESS, res));
      toastSuccess("Mahasiswa berhasil dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_USER_MAHASISWA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const Mahasiswa = { get, post, put, deleted, getDetail };
export default Mahasiswa;

export const setMahasiswaData = (data) => (dispatch) =>
  dispatch({ type: USER_MAHASISWA_DATA, data });

export const setMahasiswaModal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_USER_MAHASISWA_MODAL, {
      modalType: modalType,
      isOpen: isOpen,
    })
  );
