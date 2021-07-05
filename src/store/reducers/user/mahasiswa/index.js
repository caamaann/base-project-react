import {
  GET_USER_MAHASISWA_PENDING,
  GET_USER_MAHASISWA_SUCCESS,
  GET_USER_MAHASISWA_ERROR,
  GET_DETAIL_USER_MAHASISWA_PENDING,
  GET_DETAIL_USER_MAHASISWA_SUCCESS,
  GET_DETAIL_USER_MAHASISWA_ERROR,
  POST_USER_MAHASISWA_PENDING,
  POST_USER_MAHASISWA_SUCCESS,
  POST_USER_MAHASISWA_ERROR,
  PUT_USER_MAHASISWA_PENDING,
  PUT_USER_MAHASISWA_SUCCESS,
  PUT_USER_MAHASISWA_ERROR,
  DELETE_USER_MAHASISWA_PENDING,
  DELETE_USER_MAHASISWA_SUCCESS,
  DELETE_USER_MAHASISWA_ERROR,
  USER_MAHASISWA_DATA,
  SET_USER_MAHASISWA_MODAL,
} from "../../../actions/user/mahasiswa";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
};

const mahasiswa = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_MAHASISWA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_USER_MAHASISWA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_USER_MAHASISWA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case GET_DETAIL_USER_MAHASISWA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_DETAIL_USER_MAHASISWA_SUCCESS:
      return {
        ...state,
        pending: false,
        detailData: action.data.data.data[0],
      };
    case GET_DETAIL_USER_MAHASISWA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_USER_MAHASISWA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_USER_MAHASISWA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_USER_MAHASISWA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PUT_USER_MAHASISWA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PUT_USER_MAHASISWA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case PUT_USER_MAHASISWA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case DELETE_USER_MAHASISWA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_USER_MAHASISWA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DELETE_USER_MAHASISWA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case USER_MAHASISWA_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_USER_MAHASISWA_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    default:
      return state;
  }
};

export default mahasiswa;
