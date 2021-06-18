import API from "../../API";
import { actionPending, actionSuccess, actionError } from "../../actionTypes";
import { setToastModal } from "../..";
import { toastError, toastSuccess } from "../../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_PROGRAM_STUDI_PENDING = "GET_PROGRAM_STUDI_PENDING";
export const GET_PROGRAM_STUDI_SUCCESS = "GET_PROGRAM_STUDI_SUCCESS";
export const GET_PROGRAM_STUDI_ERROR = "GET_PROGRAM_STUDI_ERROR";
export const POST_PROGRAM_STUDI_PENDING = "POST_PROGRAM_STUDI_PENDING";
export const POST_PROGRAM_STUDI_SUCCESS = "POST_PROGRAM_STUDI_SUCCESS";
export const POST_PROGRAM_STUDI_ERROR = "POST_PROGRAM_STUDI_ERROR";
export const PUT_PROGRAM_STUDI_PENDING = "PUT_PROGRAM_STUDI_PENDING";
export const PUT_PROGRAM_STUDI_SUCCESS = "PUT_PROGRAM_STUDI_SUCCESS";
export const PUT_PROGRAM_STUDI_ERROR = "PUT_PROGRAM_STUDI_ERROR";
export const DELETE_PROGRAM_STUDI_PENDING = "DELETE_PROGRAM_STUDI_PENDING";
export const DELETE_PROGRAM_STUDI_SUCCESS = "DELETE_PROGRAM_STUDI_SUCCESS";
export const DELETE_PROGRAM_STUDI_ERROR = "DELETE_PROGRAM_STUDI_ERROR";

export const PROGRAM_STUDI_DATA = "PROGRAM_STUDI_DATA";
export const SET_PROGRAM_STUDI_MODAL = "SET_PROGRAM_STUDI_MODAL";

// URL: URL_{URL}
const PROGRAM_STUDI_URL = "/program_studi";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_PROGRAM_STUDI_PENDING));
  API.get(PROGRAM_STUDI_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_PROGRAM_STUDI_SUCCESS, res));
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
      dispatch(actionError(GET_PROGRAM_STUDI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_PROGRAM_STUDI_PENDING));
  API.post(PROGRAM_STUDI_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_PROGRAM_STUDI_SUCCESS, res));
      toastSuccess("Program Studi berhasil ditambahkan");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_PROGRAM_STUDI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const put = (param, callback) => (dispatch) => {
  dispatch(actionPending(PUT_PROGRAM_STUDI_PENDING));
  API.put(PROGRAM_STUDI_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(PUT_PROGRAM_STUDI_SUCCESS, res));
      toastSuccess("Program Studi berhasil diubah");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(PUT_PROGRAM_STUDI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const deleted = (param, callback) => (dispatch) => {
  dispatch(actionPending(DELETE_PROGRAM_STUDI_PENDING));
  API.delete(PROGRAM_STUDI_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(DELETE_PROGRAM_STUDI_SUCCESS, res));
      toastSuccess("Program Studi berhasil dihapus");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(DELETE_PROGRAM_STUDI_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const ProgramStudi = { get, post, put, deleted };
export default ProgramStudi;

export const setProgramStudiData = (data) => (dispatch) =>
  dispatch({ type: PROGRAM_STUDI_DATA, data });

export const setProgramStudiModal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_PROGRAM_STUDI_MODAL, {
      modalType: modalType,
      isOpen: isOpen,
    })
  );
