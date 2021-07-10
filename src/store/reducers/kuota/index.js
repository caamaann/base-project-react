import {
  GET_KUOTA_PENDING,
  GET_KUOTA_SUCCESS,
  GET_KUOTA_ERROR,
  POST_KUOTA_PENDING,
  POST_KUOTA_SUCCESS,
  POST_KUOTA_ERROR,
  PUT_KUOTA_PENDING,
  PUT_KUOTA_SUCCESS,
  PUT_KUOTA_ERROR,
  DELETE_KUOTA_PENDING,
  DELETE_KUOTA_SUCCESS,
  DELETE_KUOTA_ERROR,
  KUOTA_DATA,
  SET_KUOTA_MODAL,
} from "../../actions/kuota";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
};

const kuota = (state = initialState, action) => {
  switch (action.type) {
    case GET_KUOTA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_KUOTA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_KUOTA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_KUOTA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_KUOTA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_KUOTA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PUT_KUOTA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PUT_KUOTA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case PUT_KUOTA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case DELETE_KUOTA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_KUOTA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DELETE_KUOTA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case KUOTA_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_KUOTA_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    default:
      return state;
  }
};

export default kuota;
