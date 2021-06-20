import API from "../../API";
import { actionPending, actionSuccess, actionError } from "../../actionTypes";
import { setToastModal } from "../..";
import { toastError, toastSuccess } from "../../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_WALI_KELAS_PENDING = "GET_WALI_KELAS_PENDING";
export const GET_WALI_KELAS_SUCCESS = "GET_WALI_KELAS_SUCCESS";
export const GET_WALI_KELAS_ERROR = "GET_WALI_KELAS_ERROR";
export const POST_WALI_KELAS_PENDING = "POST_WALI_KELAS_PENDING";
export const POST_WALI_KELAS_SUCCESS = "POST_WALI_KELAS_SUCCESS";
export const POST_WALI_KELAS_ERROR = "POST_WALI_KELAS_ERROR";
export const PUT_WALI_KELAS_PENDING = "PUT_WALI_KELAS_PENDING";
export const PUT_WALI_KELAS_SUCCESS = "PUT_WALI_KELAS_SUCCESS";
export const PUT_WALI_KELAS_ERROR = "PUT_WALI_KELAS_ERROR";
export const DELETE_WALI_KELAS_PENDING = "DELETE_WALI_KELAS_PENDING";
export const DELETE_WALI_KELAS_SUCCESS = "DELETE_WALI_KELAS_SUCCESS";
export const DELETE_WALI_KELAS_ERROR = "DELETE_WALI_KELAS_ERROR";

export const WALI_KELAS_DATA = "WALI_KELAS_DATA";
export const SET_WALI_KELAS_MODAL = "SET_WALI_KELAS_MODAL";

// URL: URL_{URL}
const WALI_KELAS_URL = "/user/wali_kelas";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_WALI_KELAS_PENDING));
  API.get(WALI_KELAS_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_WALI_KELAS_SUCCESS, res));
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
      dispatch(actionError(GET_WALI_KELAS_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_WALI_KELAS_PENDING));
  API.post(WALI_KELAS_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_WALI_KELAS_SUCCESS, res));
      toastSuccess("Wali Kelas berhasil ditambahkan");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_WALI_KELAS_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_WALI_KELAS_PENDING));
  API.put(WALI_KELAS_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_WALI_KELAS_SUCCESS, res));
      toastSuccess("Wali Kelas berhasil diubah");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_WALI_KELAS_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_WALI_KELAS_PENDING));
  API.delete(WALI_KELAS_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_WALI_KELAS_SUCCESS, res));
      toastSuccess("Wali Kelas berhasil dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_WALI_KELAS_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const WaliKelas = { get, post, put, deleted };
export default WaliKelas;

export const setWaliKelasData = (data) => (dispatch) =>
  dispatch({ type: WALI_KELAS_DATA, data });

export const setWaliKelasModal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_WALI_KELAS_MODAL, {
      modalType: modalType,
      isOpen: isOpen,
    })
  );
