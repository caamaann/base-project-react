import API from "../API";
import { actionPending, actionSuccess, actionError } from "../actionTypes";
import { setToastModal } from "..";
import { toastError, toastSuccess } from "../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_SAUDARA_PENDING = "GET_SAUDARA_PENDING";
export const GET_SAUDARA_SUCCESS = "GET_SAUDARA_SUCCESS";
export const GET_SAUDARA_ERROR = "GET_SAUDARA_ERROR";
export const POST_SAUDARA_PENDING = "POST_SAUDARA_PENDING";
export const POST_SAUDARA_SUCCESS = "POST_SAUDARA_SUCCESS";
export const POST_SAUDARA_ERROR = "POST_SAUDARA_ERROR";
export const PUT_SAUDARA_PENDING = "PUT_SAUDARA_PENDING";
export const PUT_SAUDARA_SUCCESS = "PUT_SAUDARA_SUCCESS";
export const PUT_SAUDARA_ERROR = "PUT_SAUDARA_ERROR";
export const DELETE_SAUDARA_PENDING = "DELETE_SAUDARA_PENDING";
export const DELETE_SAUDARA_SUCCESS = "DELETE_SAUDARA_SUCCESS";
export const DELETE_SAUDARA_ERROR = "DELETE_SAUDARA_ERROR";

export const SAUDARA_DATA = "SAUDARA_DATA";
export const ADD_SAUDARA_DATA = "ADD_SAUDARA_DATA";
export const SAUDARA_STEP = "SAUDARA_STEP";
export const SET_SAUDARA_MODAL = "SET_SAUDARA_MODAL";

// URL: URL_{URL}
const SAUDARA_URL = "/mahasiswa/saudara";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_SAUDARA_PENDING));
  API.get(SAUDARA_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_SAUDARA_SUCCESS, res));
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
      dispatch(actionError(GET_SAUDARA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_SAUDARA_PENDING));
  API.post(SAUDARA_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_SAUDARA_SUCCESS, res));
      toastSuccess("Data Saudara berhasil ditambahkan");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_SAUDARA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_SAUDARA_PENDING));
  API.put(SAUDARA_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_SAUDARA_SUCCESS, res));
      toastSuccess("Data Saudara berhasil diubah");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_SAUDARA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_SAUDARA_PENDING));
  API.delete(SAUDARA_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_SAUDARA_SUCCESS, res));
      toastSuccess("Data Saudara berhasil dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_SAUDARA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const Saudara = { get, post, put, deleted };
export default Saudara;

export const setSaudaraData = (data) => (dispatch) =>
  dispatch({ type: SAUDARA_DATA, data });

export const setSaudaraModal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_SAUDARA_MODAL, { modalType: modalType, isOpen: isOpen })
  );

export const setSaudaraStep = (step) => (dispatch) =>
  dispatch({ type: SAUDARA_STEP, step });

export const setAddSaudaraData = (data) => (dispatch) =>
  dispatch({ type: ADD_SAUDARA_DATA, data });
