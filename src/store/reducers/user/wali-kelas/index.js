import {
  GET_WALI_KELAS_PENDING,
  GET_WALI_KELAS_SUCCESS,
  GET_WALI_KELAS_ERROR,
  POST_WALI_KELAS_PENDING,
  POST_WALI_KELAS_SUCCESS,
  POST_WALI_KELAS_ERROR,
  PUT_WALI_KELAS_PENDING,
  PUT_WALI_KELAS_SUCCESS,
  PUT_WALI_KELAS_ERROR,
  DELETE_WALI_KELAS_PENDING,
  DELETE_WALI_KELAS_SUCCESS,
  DELETE_WALI_KELAS_ERROR,
  WALI_KELAS_DATA,
  SET_WALI_KELAS_MODAL,
} from "../../../actions/user/wali-kelas";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
};

const waliKelas = (state = initialState, action) => {
  switch (action.type) {
    case GET_WALI_KELAS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_WALI_KELAS_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_WALI_KELAS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_WALI_KELAS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_WALI_KELAS_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_WALI_KELAS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PUT_WALI_KELAS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PUT_WALI_KELAS_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case PUT_WALI_KELAS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case DELETE_WALI_KELAS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_WALI_KELAS_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DELETE_WALI_KELAS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case WALI_KELAS_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_WALI_KELAS_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    default:
      return state;
  }
};

export default waliKelas;
