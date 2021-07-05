import API from "../../API";
import { actionPending, actionSuccess, actionError } from "../../actionTypes";
import { setToastModal } from "../..";
import { toastError, toastSuccess } from "../../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_USER_KETUA_PROGRAM_STUDI_PENDING =
  "GET_USER_KETUA_PROGRAM_STUDI_PENDING";
export const GET_USER_KETUA_PROGRAM_STUDI_SUCCESS =
  "GET_USER_KETUA_PROGRAM_STUDI_SUCCESS";
export const GET_USER_KETUA_PROGRAM_STUDI_ERROR =
  "GET_USER_KETUA_PROGRAM_STUDI_ERROR";
export const POST_USER_KETUA_PROGRAM_STUDI_PENDING =
  "POST_USER_KETUA_PROGRAM_STUDI_PENDING";
export const POST_USER_KETUA_PROGRAM_STUDI_SUCCESS =
  "POST_USER_KETUA_PROGRAM_STUDI_SUCCESS";
export const POST_USER_KETUA_PROGRAM_STUDI_ERROR =
  "POST_USER_KETUA_PROGRAM_STUDI_ERROR";
export const PUT_USER_KETUA_PROGRAM_STUDI_PENDING =
  "PUT_USER_KETUA_PROGRAM_STUDI_PENDING";
export const PUT_USER_KETUA_PROGRAM_STUDI_SUCCESS =
  "PUT_USER_KETUA_PROGRAM_STUDI_SUCCESS";
export const PUT_USER_KETUA_PROGRAM_STUDI_ERROR =
  "PUT_USER_KETUA_PROGRAM_STUDI_ERROR";
export const DELETE_USER_KETUA_PROGRAM_STUDI_PENDING =
  "DELETE_USER_KETUA_PROGRAM_STUDI_PENDING";
export const DELETE_USER_KETUA_PROGRAM_STUDI_SUCCESS =
  "DELETE_USER_KETUA_PROGRAM_STUDI_SUCCESS";
export const DELETE_USER_KETUA_PROGRAM_STUDI_ERROR =
  "DELETE_USER_KETUA_PROGRAM_STUDI_ERROR";

export const USER_KETUA_PROGRAM_STUDI_DATA = "USER_KETUA_PROGRAM_STUDI_DATA";
export const SET_USER_KETUA_PROGRAM_STUDI_MODAL =
  "SET_USER_KETUA_PROGRAM_STUDI_MODAL";

// URL: URL_{URL}
const USER_KETUA_PROGRAM_STUDI_URL = "/user/ketua_program_studi";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_USER_KETUA_PROGRAM_STUDI_PENDING));
  API.get(USER_KETUA_PROGRAM_STUDI_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_USER_KETUA_PROGRAM_STUDI_SUCCESS, res));
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
      dispatch(actionError(GET_USER_KETUA_PROGRAM_STUDI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_USER_KETUA_PROGRAM_STUDI_PENDING));
  API.post(USER_KETUA_PROGRAM_STUDI_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_USER_KETUA_PROGRAM_STUDI_SUCCESS, res));
      toastSuccess("Ketua Program Studi berhasil ditambahkan");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_USER_KETUA_PROGRAM_STUDI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_USER_KETUA_PROGRAM_STUDI_PENDING));
  API.put(USER_KETUA_PROGRAM_STUDI_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_USER_KETUA_PROGRAM_STUDI_SUCCESS, res));
      toastSuccess("Ketua Program Studi berhasil diubah");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_USER_KETUA_PROGRAM_STUDI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_USER_KETUA_PROGRAM_STUDI_PENDING));
  API.delete(USER_KETUA_PROGRAM_STUDI_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_USER_KETUA_PROGRAM_STUDI_SUCCESS, res));
      toastSuccess("Ketua Program Studi berhasil dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_USER_KETUA_PROGRAM_STUDI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const KetuaProgramStudi = { get, post, put, deleted };
export default KetuaProgramStudi;

export const setKetuaProgramStudiData = (data) => (dispatch) =>
  dispatch({ type: USER_KETUA_PROGRAM_STUDI_DATA, data });

export const setKetuaProgramStudiModal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_USER_KETUA_PROGRAM_STUDI_MODAL, {
      modalType: modalType,
      isOpen: isOpen,
    })
  );
