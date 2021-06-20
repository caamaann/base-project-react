import API from "../../API";
import { actionPending, actionSuccess, actionError } from "../../actionTypes";
import { setToastModal } from "../..";
import { toastError, toastSuccess } from "../../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_PEMBANTU_DIREKTUR_3_PENDING =
  "GET_PEMBANTU_DIREKTUR_3_PENDING";
export const GET_PEMBANTU_DIREKTUR_3_SUCCESS =
  "GET_PEMBANTU_DIREKTUR_3_SUCCESS";
export const GET_PEMBANTU_DIREKTUR_3_ERROR = "GET_PEMBANTU_DIREKTUR_3_ERROR";
export const POST_PEMBANTU_DIREKTUR_3_PENDING =
  "POST_PEMBANTU_DIREKTUR_3_PENDING";
export const POST_PEMBANTU_DIREKTUR_3_SUCCESS =
  "POST_PEMBANTU_DIREKTUR_3_SUCCESS";
export const POST_PEMBANTU_DIREKTUR_3_ERROR = "POST_PEMBANTU_DIREKTUR_3_ERROR";
export const PUT_PEMBANTU_DIREKTUR_3_PENDING =
  "PUT_PEMBANTU_DIREKTUR_3_PENDING";
export const PUT_PEMBANTU_DIREKTUR_3_SUCCESS =
  "PUT_PEMBANTU_DIREKTUR_3_SUCCESS";
export const PUT_PEMBANTU_DIREKTUR_3_ERROR = "PUT_PEMBANTU_DIREKTUR_3_ERROR";
export const DELETE_PEMBANTU_DIREKTUR_3_PENDING =
  "DELETE_PEMBANTU_DIREKTUR_3_PENDING";
export const DELETE_PEMBANTU_DIREKTUR_3_SUCCESS =
  "DELETE_PEMBANTU_DIREKTUR_3_SUCCESS";
export const DELETE_PEMBANTU_DIREKTUR_3_ERROR =
  "DELETE_PEMBANTU_DIREKTUR_3_ERROR";

export const PEMBANTU_DIREKTUR_3_DATA = "PEMBANTU_DIREKTUR_3_DATA";
export const SET_PEMBANTU_DIREKTUR_3_MODAL = "SET_PEMBANTU_DIREKTUR_3_MODAL";

// URL: URL_{URL}
const PEMBANTU_DIREKTUR_3_URL = "/user/pembantu_direktur_3";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_PEMBANTU_DIREKTUR_3_PENDING));
  API.get(PEMBANTU_DIREKTUR_3_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_PEMBANTU_DIREKTUR_3_SUCCESS, res));
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
      dispatch(actionError(GET_PEMBANTU_DIREKTUR_3_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_PEMBANTU_DIREKTUR_3_PENDING));
  API.post(PEMBANTU_DIREKTUR_3_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_PEMBANTU_DIREKTUR_3_SUCCESS, res));
      toastSuccess("Pembantu Direktur 3 berhasil ditambahkan");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_PEMBANTU_DIREKTUR_3_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_PEMBANTU_DIREKTUR_3_PENDING));
  API.put(PEMBANTU_DIREKTUR_3_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_PEMBANTU_DIREKTUR_3_SUCCESS, res));
      toastSuccess("Pembantu Direktur 3 berhasil diubah");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_PEMBANTU_DIREKTUR_3_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_PEMBANTU_DIREKTUR_3_PENDING));
  API.delete(PEMBANTU_DIREKTUR_3_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_PEMBANTU_DIREKTUR_3_SUCCESS, res));
      toastSuccess("Pembantu Direktur 3 berhasil dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_PEMBANTU_DIREKTUR_3_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const PembantuDirektur3 = { get, post, put, deleted };
export default PembantuDirektur3;

export const setPembantuDirektur3Data = (data) => (dispatch) =>
  dispatch({ type: PEMBANTU_DIREKTUR_3_DATA, data });

export const setPembantuDirektur3Modal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_PEMBANTU_DIREKTUR_3_MODAL, {
      modalType: modalType,
      isOpen: isOpen,
    })
  );
