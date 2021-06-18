import API from "../../API";
import { actionPending, actionSuccess, actionError } from "../../actionTypes";
import { setToastModal } from "../..";
import { toastError, toastSuccess } from "../../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_JURUSAN_PENDING = "GET_JURUSAN_PENDING";
export const GET_JURUSAN_SUCCESS = "GET_JURUSAN_SUCCESS";
export const GET_JURUSAN_ERROR = "GET_JURUSAN_ERROR";
export const POST_JURUSAN_PENDING = "POST_JURUSAN_PENDING";
export const POST_JURUSAN_SUCCESS = "POST_JURUSAN_SUCCESS";
export const POST_JURUSAN_ERROR = "POST_JURUSAN_ERROR";
export const PUT_JURUSAN_PENDING = "PUT_JURUSAN_PENDING";
export const PUT_JURUSAN_SUCCESS = "PUT_JURUSAN_SUCCESS";
export const PUT_JURUSAN_ERROR = "PUT_JURUSAN_ERROR";
export const DELETE_JURUSAN_PENDING = "DELETE_JURUSAN_PENDING";
export const DELETE_JURUSAN_SUCCESS = "DELETE_JURUSAN_SUCCESS";
export const DELETE_JURUSAN_ERROR = "DELETE_JURUSAN_ERROR";

export const JURUSAN_DATA = "JURUSAN_DATA";
export const SET_JURUSAN_MODAL = "SET_JURUSAN_MODAL";

// URL: URL_{URL}
const JURUSAN_URL = "/jurusan";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_JURUSAN_PENDING));
  API.get(JURUSAN_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_JURUSAN_SUCCESS, res));
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
      dispatch(actionError(GET_JURUSAN_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_JURUSAN_PENDING));
  API.post(JURUSAN_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_JURUSAN_SUCCESS, res));
      toastSuccess("Jurusan berhasil ditambahkan");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_JURUSAN_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_JURUSAN_PENDING));
  API.put(JURUSAN_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_JURUSAN_SUCCESS, res));
      toastSuccess("Jurusan berhasil diubah");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_JURUSAN_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_JURUSAN_PENDING));
  API.delete(JURUSAN_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_JURUSAN_SUCCESS, res));
      toastSuccess("Jurusan berhasil dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_JURUSAN_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const Jurusan = { get, post, put, deleted };
export default Jurusan;

export const setJurusanData = (data) => (dispatch) =>
  dispatch({ type: JURUSAN_DATA, data });

export const setJurusanModal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_JURUSAN_MODAL, { modalType: modalType, isOpen: isOpen })
  );
