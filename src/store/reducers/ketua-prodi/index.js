import {
  GET_KETUA_PRODI_PENDING,
  GET_KETUA_PRODI_SUCCESS,
  GET_KETUA_PRODI_ERROR,
  POST_KETUA_PRODI_PENDING,
  POST_KETUA_PRODI_SUCCESS,
  POST_KETUA_PRODI_ERROR,
  PUT_KETUA_PRODI_PENDING,
  PUT_KETUA_PRODI_SUCCESS,
  PUT_KETUA_PRODI_ERROR,
  DELETE_KETUA_PRODI_PENDING,
  DELETE_KETUA_PRODI_SUCCESS,
  DELETE_KETUA_PRODI_ERROR,
  KETUA_PRODI_DATA,
  SET_KETUA_PRODI_MODAL,
} from "../../actions/ketua-prodi";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
};

const ketuaProgramStudi = (state = initialState, action) => {
  switch (action.type) {
    case GET_KETUA_PRODI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_KETUA_PRODI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_KETUA_PRODI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_KETUA_PRODI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_KETUA_PRODI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_KETUA_PRODI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PUT_KETUA_PRODI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PUT_KETUA_PRODI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case PUT_KETUA_PRODI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case DELETE_KETUA_PRODI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_KETUA_PRODI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DELETE_KETUA_PRODI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case KETUA_PRODI_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_KETUA_PRODI_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    default:
      return state;
  }
};

export default ketuaProgramStudi;
