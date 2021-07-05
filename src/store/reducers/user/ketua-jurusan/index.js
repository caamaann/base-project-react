import {
  GET_USER_KETUA_JURUSAN_PENDING,
  GET_USER_KETUA_JURUSAN_SUCCESS,
  GET_USER_KETUA_JURUSAN_ERROR,
  POST_USER_KETUA_JURUSAN_PENDING,
  POST_USER_KETUA_JURUSAN_SUCCESS,
  POST_USER_KETUA_JURUSAN_ERROR,
  PUT_USER_KETUA_JURUSAN_PENDING,
  PUT_USER_KETUA_JURUSAN_SUCCESS,
  PUT_USER_KETUA_JURUSAN_ERROR,
  DELETE_USER_KETUA_JURUSAN_PENDING,
  DELETE_USER_KETUA_JURUSAN_SUCCESS,
  DELETE_USER_KETUA_JURUSAN_ERROR,
  USER_KETUA_JURUSAN_DATA,
  SET_USER_KETUA_JURUSAN_MODAL,
} from "../../../actions/user/ketua-jurusan";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
};

const ketuaJurusan = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_KETUA_JURUSAN_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_USER_KETUA_JURUSAN_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_USER_KETUA_JURUSAN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_USER_KETUA_JURUSAN_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_USER_KETUA_JURUSAN_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_USER_KETUA_JURUSAN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PUT_USER_KETUA_JURUSAN_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PUT_USER_KETUA_JURUSAN_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case PUT_USER_KETUA_JURUSAN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case DELETE_USER_KETUA_JURUSAN_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_USER_KETUA_JURUSAN_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DELETE_USER_KETUA_JURUSAN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case USER_KETUA_JURUSAN_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_USER_KETUA_JURUSAN_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    default:
      return state;
  }
};

export default ketuaJurusan;
