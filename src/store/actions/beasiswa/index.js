import API from "../API";
import { actionPending, actionSuccess, actionError } from "../actionTypes";
import { setToastModal } from "..";
import { toastError, toastSuccess } from "../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_BEASISWA_PENDING = "GET_BEASISWA_PENDING";
export const GET_BEASISWA_SUCCESS = "GET_BEASISWA_SUCCESS";
export const GET_BEASISWA_ERROR = "GET_BEASISWA_ERROR";
export const POST_BEASISWA_PENDING = "POST_BEASISWA_PENDING";
export const POST_BEASISWA_SUCCESS = "POST_BEASISWA_SUCCESS";
export const POST_BEASISWA_ERROR = "POST_BEASISWA_ERROR";
export const PUT_BEASISWA_PENDING = "PUT_BEASISWA_PENDING";
export const PUT_BEASISWA_SUCCESS = "PUT_BEASISWA_SUCCESS";
export const PUT_BEASISWA_ERROR = "PUT_BEASISWA_ERROR";
export const DELETE_BEASISWA_PENDING = "DELETE_BEASISWA_PENDING";
export const DELETE_BEASISWA_SUCCESS = "DELETE_BEASISWA_SUCCESS";
export const DELETE_BEASISWA_ERROR = "DELETE_BEASISWA_ERROR";

export const BEASISWA_DATA = "BEASISWA_DATA";
export const ADD_BEASISWA_DATA = "ADD_BEASISWA_DATA";
export const BEASISWA_STEP = "BEASISWA_STEP";
export const SET_BEASISWA_MODAL = "SET_BEASISWA_MODAL";

// URL: URL_{URL}
const BEASISWA_URL = "/beasiswa";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_BEASISWA_PENDING));
  API.get(BEASISWA_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_BEASISWA_SUCCESS, res));
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
      dispatch(actionError(GET_BEASISWA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_BEASISWA_PENDING));
  API.post(BEASISWA_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_BEASISWA_SUCCESS, res));
      toastSuccess("Beasiswa berhasil ditambahkan");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_BEASISWA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_BEASISWA_PENDING));
  API.put(BEASISWA_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_BEASISWA_SUCCESS, res));
      toastSuccess("Beasiswa berhasil diubah");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_BEASISWA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_BEASISWA_PENDING));
  API.delete(BEASISWA_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_BEASISWA_SUCCESS, res));
      toastSuccess("Beasiswa berhasil dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_BEASISWA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const Beasiswa = { get, post, put, deleted };
export default Beasiswa;

export const setBeasiswaData = (data) => (dispatch) =>
  dispatch({ type: BEASISWA_DATA, data });

export const setBeasiswaModal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_BEASISWA_MODAL, { modalType: modalType, isOpen: isOpen })
  );

export const setBeasiswaStep = (step) => (dispatch) =>
  dispatch({ type: BEASISWA_STEP, step });

export const setAddBeasiswaData = (data) => (dispatch) =>
  dispatch({ type: ADD_BEASISWA_DATA, data });
