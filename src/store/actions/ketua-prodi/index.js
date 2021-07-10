import API from "../API";
import { actionPending, actionSuccess, actionError } from "../actionTypes";
import { setToastModal } from "..";
import { toastError, toastSuccess } from "../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_KETUA_PRODI_PENDING = "GET_KETUA_PRODI_PENDING";
export const GET_KETUA_PRODI_SUCCESS = "GET_KETUA_PRODI_SUCCESS";
export const GET_KETUA_PRODI_ERROR = "GET_KETUA_PRODI_ERROR";
export const POST_KETUA_PRODI_PENDING = "POST_KETUA_PRODI_PENDING";
export const POST_KETUA_PRODI_SUCCESS = "POST_KETUA_PRODI_SUCCESS";
export const POST_KETUA_PRODI_ERROR = "POST_KETUA_PRODI_ERROR";
export const PUT_KETUA_PRODI_PENDING = "PUT_KETUA_PRODI_PENDING";
export const PUT_KETUA_PRODI_SUCCESS = "PUT_KETUA_PRODI_SUCCESS";
export const PUT_KETUA_PRODI_ERROR = "PUT_KETUA_PRODI_ERROR";
export const DELETE_KETUA_PRODI_PENDING = "DELETE_KETUA_PRODI_PENDING";
export const DELETE_KETUA_PRODI_SUCCESS = "DELETE_KETUA_PRODI_SUCCESS";
export const DELETE_KETUA_PRODI_ERROR = "DELETE_KETUA_PRODI_ERROR";

export const KETUA_PRODI_DATA = "KETUA_PRODI_DATA";
export const SET_KETUA_PRODI_MODAL = "SET_KETUA_PRODI_MODAL";

// URL: URL_{URL}
const KETUA_PRODI_URL = "/ketua_program_studi/beasiswa";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_KETUA_PRODI_PENDING));
  API.get(KETUA_PRODI_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_KETUA_PRODI_SUCCESS, res));
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
      dispatch(actionError(GET_KETUA_PRODI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_KETUA_PRODI_PENDING));
  API.post(KETUA_PRODI_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_KETUA_PRODI_SUCCESS, res));
      toastSuccess("KetuaProgramStudi berhasil ditambahkan");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_KETUA_PRODI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_KETUA_PRODI_PENDING));
  API.put(KETUA_PRODI_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_KETUA_PRODI_SUCCESS, res));
      toastSuccess("Berhasil melakukan seleksi beasiswa");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_KETUA_PRODI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_KETUA_PRODI_PENDING));
  API.delete(KETUA_PRODI_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_KETUA_PRODI_SUCCESS, res));
      toastSuccess("Seleksi dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_KETUA_PRODI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const KetuaProgramStudi = { get, post, put, deleted };
export default KetuaProgramStudi;

export const setKetuaProgramStudiData = (data) => (dispatch) =>
  dispatch({ type: KETUA_PRODI_DATA, data });

export const setKetuaProgramStudiModal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_KETUA_PRODI_MODAL, {
      modalType: modalType,
      isOpen: isOpen,
    })
  );
