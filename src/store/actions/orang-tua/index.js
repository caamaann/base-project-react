import API from "../API";
import { actionPending, actionSuccess, actionError } from "../actionTypes";
import { setToastModal } from "..";
import { toastError, toastSuccess } from "../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_ORANG_TUA_PENDING = "GET_ORANG_TUA_PENDING";
export const GET_ORANG_TUA_SUCCESS = "GET_ORANG_TUA_SUCCESS";
export const GET_ORANG_TUA_ERROR = "GET_ORANG_TUA_ERROR";
export const POST_ORANG_TUA_PENDING = "POST_ORANG_TUA_PENDING";
export const POST_ORANG_TUA_SUCCESS = "POST_ORANG_TUA_SUCCESS";
export const POST_ORANG_TUA_ERROR = "POST_ORANG_TUA_ERROR";
export const PUT_ORANG_TUA_PENDING = "PUT_ORANG_TUA_PENDING";
export const PUT_ORANG_TUA_SUCCESS = "PUT_ORANG_TUA_SUCCESS";
export const PUT_ORANG_TUA_ERROR = "PUT_ORANG_TUA_ERROR";
export const DELETE_ORANG_TUA_PENDING = "DELETE_ORANG_TUA_PENDING";
export const DELETE_ORANG_TUA_SUCCESS = "DELETE_ORANG_TUA_SUCCESS";
export const DELETE_ORANG_TUA_ERROR = "DELETE_ORANG_TUA_ERROR";

export const ORANG_TUA_DATA = "ORANG_TUA_DATA";
export const ADD_ORANG_TUA_DATA = "ADD_ORANG_TUA_DATA";
export const ORANG_TUA_STEP = "ORANG_TUA_STEP";
export const SET_ORANG_TUA_MODAL = "SET_ORANG_TUA_MODAL";

// URL: URL_{URL}
const ORANG_TUA_URL = "/mahasiswa/orangtua";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_ORANG_TUA_PENDING));
  API.get(ORANG_TUA_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_ORANG_TUA_SUCCESS, res));
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
      dispatch(actionError(GET_ORANG_TUA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_ORANG_TUA_PENDING));
  API.post(ORANG_TUA_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_ORANG_TUA_SUCCESS, res));
      toastSuccess("Data Orang Tua berhasil ditambahkan");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_ORANG_TUA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_ORANG_TUA_PENDING));
  API.put(ORANG_TUA_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_ORANG_TUA_SUCCESS, res));
      toastSuccess("Data Orang Tua berhasil diubah");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_ORANG_TUA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_ORANG_TUA_PENDING));
  API.delete(ORANG_TUA_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_ORANG_TUA_SUCCESS, res));
      toastSuccess("Data Orang Tua berhasil dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_ORANG_TUA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const OrangTua = { get, post, put, deleted };
export default OrangTua;

export const setOrangTuaData = (data) => (dispatch) =>
  dispatch({ type: ORANG_TUA_DATA, data });

export const setOrangTuaModal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_ORANG_TUA_MODAL, { modalType: modalType, isOpen: isOpen })
  );

export const setOrangTuaStep = (step) => (dispatch) =>
  dispatch({ type: ORANG_TUA_STEP, step });

export const setAddOrangTuaData = (data) => (dispatch) =>
  dispatch({ type: ADD_ORANG_TUA_DATA, data });
