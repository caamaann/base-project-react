import {
  GET_BEASISWA_PENDING,
  GET_BEASISWA_SUCCESS,
  GET_BEASISWA_ERROR,
  POST_BEASISWA_PENDING,
  POST_BEASISWA_SUCCESS,
  POST_BEASISWA_ERROR,
  PUT_BEASISWA_PENDING,
  PUT_BEASISWA_SUCCESS,
  PUT_BEASISWA_ERROR,
  DELETE_BEASISWA_PENDING,
  DELETE_BEASISWA_SUCCESS,
  DELETE_BEASISWA_ERROR,
  BEASISWA_DATA,
  SET_BEASISWA_MODAL,
} from "../../actions/beasiswa";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
};

const beasiswa = (state = initialState, action) => {
  switch (action.type) {
    case GET_BEASISWA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_BEASISWA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_BEASISWA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_BEASISWA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_BEASISWA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_BEASISWA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PUT_BEASISWA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PUT_BEASISWA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case PUT_BEASISWA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case DELETE_BEASISWA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_BEASISWA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DELETE_BEASISWA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case BEASISWA_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_BEASISWA_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    default:
      return state;
  }
};

export default beasiswa;
