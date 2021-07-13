import {
  GET_PD_3_PENDING,
  GET_PD_3_SUCCESS,
  GET_PD_3_ERROR,
  GET_PENDAFTAR_PD_3_PENDING,
  GET_PENDAFTAR_PD_3_SUCCESS,
  GET_PENDAFTAR_PD_3_ERROR,
  POST_PD_3_PENDING,
  POST_PD_3_SUCCESS,
  POST_PD_3_ERROR,
  POST_SELEKSI_PD_3_PENDING,
  POST_SELEKSI_PD_3_SUCCESS,
  POST_SELEKSI_PD_3_ERROR,
  PUT_PD_3_PENDING,
  PUT_PD_3_SUCCESS,
  PUT_PD_3_ERROR,
  DELETE_PD_3_PENDING,
  DELETE_PD_3_SUCCESS,
  DELETE_PD_3_ERROR,
  PD_3_DATA,
  SET_PD_3_MODAL,
} from "../../actions/pd-3";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
};

const pd3 = (state = initialState, action) => {
  switch (action.type) {
    case GET_PD_3_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_PD_3_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_PD_3_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case GET_PENDAFTAR_PD_3_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_PENDAFTAR_PD_3_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_PENDAFTAR_PD_3_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_PD_3_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_PD_3_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_PD_3_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_SELEKSI_PD_3_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_SELEKSI_PD_3_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_SELEKSI_PD_3_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PUT_PD_3_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PUT_PD_3_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case PUT_PD_3_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case DELETE_PD_3_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_PD_3_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DELETE_PD_3_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PD_3_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_PD_3_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    default:
      return state;
  }
};

export default pd3;
