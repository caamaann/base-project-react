import {
  GET_JURUSAN_PENDING,
  GET_JURUSAN_SUCCESS,
  GET_JURUSAN_ERROR,
  POST_JURUSAN_PENDING,
  POST_JURUSAN_SUCCESS,
  POST_JURUSAN_ERROR,
  PUT_JURUSAN_PENDING,
  PUT_JURUSAN_SUCCESS,
  PUT_JURUSAN_ERROR,
  DELETE_JURUSAN_PENDING,
  DELETE_JURUSAN_SUCCESS,
  DELETE_JURUSAN_ERROR,
  JURUSAN_DATA,
  SET_JURUSAN_MODAL,
} from "../../../actions/master/jurusan";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
};

const jurusan = (state = initialState, action) => {
  switch (action.type) {
    case GET_JURUSAN_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_JURUSAN_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_JURUSAN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_JURUSAN_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_JURUSAN_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_JURUSAN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PUT_JURUSAN_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PUT_JURUSAN_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case PUT_JURUSAN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case DELETE_JURUSAN_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_JURUSAN_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DELETE_JURUSAN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case JURUSAN_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_JURUSAN_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    default:
      return state;
  }
};

export default jurusan;
