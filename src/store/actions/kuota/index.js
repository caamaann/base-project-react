import API from "../API";
import { actionPending, actionSuccess, actionError } from "../actionTypes";
import { setToastModal } from "..";
import { toastError, toastSuccess } from "../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_KUOTA_PENDING = "GET_KUOTA_PENDING";
export const GET_KUOTA_SUCCESS = "GET_KUOTA_SUCCESS";
export const GET_KUOTA_ERROR = "GET_KUOTA_ERROR";
export const POST_KUOTA_PENDING = "POST_KUOTA_PENDING";
export const POST_KUOTA_SUCCESS = "POST_KUOTA_SUCCESS";
export const POST_KUOTA_ERROR = "POST_KUOTA_ERROR";
export const PUT_KUOTA_PENDING = "PUT_KUOTA_PENDING";
export const PUT_KUOTA_SUCCESS = "PUT_KUOTA_SUCCESS";
export const PUT_KUOTA_ERROR = "PUT_KUOTA_ERROR";
export const DELETE_KUOTA_PENDING = "DELETE_KUOTA_PENDING";
export const DELETE_KUOTA_SUCCESS = "DELETE_KUOTA_SUCCESS";
export const DELETE_KUOTA_ERROR = "DELETE_KUOTA_ERROR";

export const KUOTA_DATA = "KUOTA_DATA";
export const SET_KUOTA_MODAL = "SET_KUOTA_MODAL";

// URL: URL_{URL}
const KUOTA_URL = "/pembantu_direktur_3/beasiswa/kuota";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_KUOTA_PENDING));
  API.get(KUOTA_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_KUOTA_SUCCESS, res));
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
      dispatch(actionError(GET_KUOTA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_KUOTA_PENDING));
  API.post(KUOTA_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_KUOTA_SUCCESS, res));
      toastSuccess("Kuota berhasil ditambahkan");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_KUOTA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_KUOTA_PENDING));
  API.put(KUOTA_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_KUOTA_SUCCESS, res));
      toastSuccess("Kuota berhasil diubah");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_KUOTA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_KUOTA_PENDING));
  API.delete(KUOTA_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_KUOTA_SUCCESS, res));
      toastSuccess("Kuota berhasil dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_KUOTA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const getKuotaProdi = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_KUOTA_PENDING));
  API.get("ketua_program_studi/beasiswa/kuota", { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_KUOTA_SUCCESS, res));
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
      dispatch(actionError(GET_KUOTA_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const Kuota = { get, post, put, deleted, getKuotaProdi };
export default Kuota;

export const setKuotaData = (data) => (dispatch) =>
  dispatch({ type: KUOTA_DATA, data });

export const setKuotaModal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_KUOTA_MODAL, { modalType: modalType, isOpen: isOpen })
  );
