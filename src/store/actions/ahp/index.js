import API from "../API";
import { actionPending, actionSuccess, actionError } from "../actionTypes";
import { setToastModal } from "..";
import { toastError, toastSuccess } from "../../../components/commons/toast";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const GET_AHP_PENDING = "GET_AHP_PENDING";
export const GET_AHP_SUCCESS = "GET_AHP_SUCCESS";
export const GET_AHP_ERROR = "GET_AHP_ERROR";
export const POST_AHP_PENDING = "POST_AHP_PENDING";
export const POST_AHP_SUCCESS = "POST_AHP_SUCCESS";
export const POST_AHP_ERROR = "POST_AHP_ERROR";

export const AHP_DATA = "AHP_DATA";
export const SET_AHP_MODAL = "SET_AHP_MODAL";

// URL: URL_{URL}
const AHP_URL = "/ahp";

const get = (param, resolve, reject, callback) => (dispatch) => {
  dispatch(actionPending(GET_AHP_PENDING));
  API.get(AHP_URL, { params: param })
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(GET_AHP_SUCCESS, res));
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
      dispatch(actionError(GET_AHP_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const post = (param, callback) => (dispatch) => {
  dispatch(actionPending(POST_AHP_PENDING));
  API.post(AHP_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_AHP_SUCCESS, res));
      // toastSuccess("Perbandingan sudah konsisten");
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      dispatch(actionError(POST_AHP_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const Beasiswa = { get, post };
export default Beasiswa;

export const setBeasiswaData = (data) => (dispatch) =>
  dispatch({ type: AHP_DATA, data });

export const setBeasiswaModal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_AHP_MODAL, { modalType: modalType, isOpen: isOpen })
  );
