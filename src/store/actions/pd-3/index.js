import API from "../API";
import { actionPending, actionSuccess, actionError } from "../actionTypes";
import { setToastModal } from "..";
import { toastError, toastSuccess } from "../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_PD_3_PENDING = "GET_PD_3_PENDING";
export const GET_PD_3_SUCCESS = "GET_PD_3_SUCCESS";
export const GET_PD_3_ERROR = "GET_PD_3_ERROR";
export const GET_PENDAFTAR_PD_3_PENDING = "GET_PENDAFTAR_PD_3_PENDING";
export const GET_PENDAFTAR_PD_3_SUCCESS = "GET_PENDAFTAR_PD_3_SUCCESS";
export const GET_PENDAFTAR_PD_3_ERROR = "GET_PENDAFTAR_PD_3_ERROR";
export const POST_PD_3_PENDING = "POST_PD_3_PENDING";
export const POST_PD_3_SUCCESS = "POST_PD_3_SUCCESS";
export const POST_PD_3_ERROR = "POST_PD_3_ERROR";
export const POST_SELEKSI_PD_3_PENDING = "POST_SELEKSI_PD_3_PENDING";
export const POST_SELEKSI_PD_3_SUCCESS = "POST_SELEKSI_PD_3_SUCCESS";
export const POST_SELEKSI_PD_3_ERROR = "POST_SELEKSI_PD_3_ERROR";
export const PUT_PD_3_PENDING = "PUT_PD_3_PENDING";
export const PUT_PD_3_SUCCESS = "PUT_PD_3_SUCCESS";
export const PUT_PD_3_ERROR = "PUT_PD_3_ERROR";
export const DELETE_PD_3_PENDING = "DELETE_PD_3_PENDING";
export const DELETE_PD_3_SUCCESS = "DELETE_PD_3_SUCCESS";
export const DELETE_PD_3_ERROR = "DELETE_PD_3_ERROR";

export const PD_3_DATA = "PD_3_DATA";
export const SET_PD_3_MODAL = "SET_PD_3_MODAL";

// URL: URL_{URL}
const PD_3_URL = "/pembantu_direktur_3/beasiswa";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_PD_3_PENDING));
  API.get(PD_3_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_PD_3_SUCCESS, res));
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
      dispatch(actionError(GET_PD_3_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const getPendaftar = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_PENDAFTAR_PD_3_PENDING));
  API.get(PD_3_URL + "/pendaftar", { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_PENDAFTAR_PD_3_SUCCESS, res));
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
      dispatch(actionError(GET_PENDAFTAR_PD_3_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_PD_3_PENDING));
  API.post(PD_3_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_PD_3_SUCCESS, res));
      toastSuccess("Beasiswa berhasil ditambahkan");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_PD_3_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const seleksi = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_SELEKSI_PD_3_PENDING));
  API.put(PD_3_URL + "/seleksi", param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_SELEKSI_PD_3_SUCCESS, res));
      toastSuccess(
        "Pendaftar beasiswa sudah diverifikasi sebagai penerima beasiswa"
      );
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_SELEKSI_PD_3_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_PD_3_PENDING));
  API.put(PD_3_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_PD_3_SUCCESS, res));
      toastSuccess("Berhasil melakukan seleksi beasiswa");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_PD_3_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_PD_3_PENDING));
  API.delete(PD_3_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_PD_3_SUCCESS, res));
      toastSuccess("Seleksi dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_PD_3_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const PD3 = { get, post, put, deleted, getPendaftar, seleksi };
export default PD3;

export const setPD3Data = (data) => (dispatch) =>
  dispatch({ type: PD_3_DATA, data });

export const setPD3Modal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_PD_3_MODAL, {
      modalType: modalType,
      isOpen: isOpen,
    })
  );
