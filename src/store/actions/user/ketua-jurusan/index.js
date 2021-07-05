import API from "../../API";
import { actionPending, actionSuccess, actionError } from "../../actionTypes";
import { setToastModal } from "../..";
import { toastError, toastSuccess } from "../../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_USER_KETUA_JURUSAN_PENDING = "GET_USER_KETUA_JURUSAN_PENDING";
export const GET_USER_KETUA_JURUSAN_SUCCESS = "GET_USER_KETUA_JURUSAN_SUCCESS";
export const GET_USER_KETUA_JURUSAN_ERROR = "GET_USER_KETUA_JURUSAN_ERROR";
export const POST_USER_KETUA_JURUSAN_PENDING = "POST_USER_KETUA_JURUSAN_PENDING";
export const POST_USER_KETUA_JURUSAN_SUCCESS = "POST_USER_KETUA_JURUSAN_SUCCESS";
export const POST_USER_KETUA_JURUSAN_ERROR = "POST_USER_KETUA_JURUSAN_ERROR";
export const PUT_USER_KETUA_JURUSAN_PENDING = "PUT_USER_KETUA_JURUSAN_PENDING";
export const PUT_USER_KETUA_JURUSAN_SUCCESS = "PUT_USER_KETUA_JURUSAN_SUCCESS";
export const PUT_USER_KETUA_JURUSAN_ERROR = "PUT_USER_KETUA_JURUSAN_ERROR";
export const DELETE_USER_KETUA_JURUSAN_PENDING = "DELETE_USER_KETUA_JURUSAN_PENDING";
export const DELETE_USER_KETUA_JURUSAN_SUCCESS = "DELETE_USER_KETUA_JURUSAN_SUCCESS";
export const DELETE_USER_KETUA_JURUSAN_ERROR = "DELETE_USER_KETUA_JURUSAN_ERROR";

export const USER_KETUA_JURUSAN_DATA = "USER_KETUA_JURUSAN_DATA";
export const SET_USER_KETUA_JURUSAN_MODAL = "SET_USER_KETUA_JURUSAN_MODAL";

// URL: URL_{URL}
const USER_KETUA_JURUSAN_URL = "/user/ketua_jurusan";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_USER_KETUA_JURUSAN_PENDING));
  API.get(USER_KETUA_JURUSAN_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_USER_KETUA_JURUSAN_SUCCESS, res));
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
      dispatch(actionError(GET_USER_KETUA_JURUSAN_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_USER_KETUA_JURUSAN_PENDING));
  API.post(USER_KETUA_JURUSAN_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_USER_KETUA_JURUSAN_SUCCESS, res));
      toastSuccess("Ketua Jurusan berhasil ditambahkan");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_USER_KETUA_JURUSAN_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_USER_KETUA_JURUSAN_PENDING));
  API.put(USER_KETUA_JURUSAN_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_USER_KETUA_JURUSAN_SUCCESS, res));
      toastSuccess("Ketua Jurusan berhasil diubah");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_USER_KETUA_JURUSAN_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_USER_KETUA_JURUSAN_PENDING));
  API.delete(USER_KETUA_JURUSAN_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_USER_KETUA_JURUSAN_SUCCESS, res));
      toastSuccess("Ketua Jurusan berhasil dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_USER_KETUA_JURUSAN_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const KetuaJurusan = { get, post, put, deleted };
export default KetuaJurusan;

export const setKetuaJurusanData = (data) => (dispatch) =>
  dispatch({ type: USER_KETUA_JURUSAN_DATA, data });

export const setKetuaJurusanModal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_USER_KETUA_JURUSAN_MODAL, {
      modalType: modalType,
      isOpen: isOpen,
    })
  );
