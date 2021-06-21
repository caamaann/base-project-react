import {
  GET_KETUA_PROGRAM_STUDI_PENDING,
  GET_KETUA_PROGRAM_STUDI_SUCCESS,
  GET_KETUA_PROGRAM_STUDI_ERROR,
  POST_KETUA_PROGRAM_STUDI_PENDING,
  POST_KETUA_PROGRAM_STUDI_SUCCESS,
  POST_KETUA_PROGRAM_STUDI_ERROR,
  PUT_KETUA_PROGRAM_STUDI_PENDING,
  PUT_KETUA_PROGRAM_STUDI_SUCCESS,
  PUT_KETUA_PROGRAM_STUDI_ERROR,
  DELETE_KETUA_PROGRAM_STUDI_PENDING,
  DELETE_KETUA_PROGRAM_STUDI_SUCCESS,
  DELETE_KETUA_PROGRAM_STUDI_ERROR,
  KETUA_PROGRAM_STUDI_DATA,
  SET_KETUA_PROGRAM_STUDI_MODAL,
} from "../../../actions/user/ketua-program-studi";

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
    case GET_KETUA_PROGRAM_STUDI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_KETUA_PROGRAM_STUDI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_KETUA_PROGRAM_STUDI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_KETUA_PROGRAM_STUDI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_KETUA_PROGRAM_STUDI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_KETUA_PROGRAM_STUDI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PUT_KETUA_PROGRAM_STUDI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PUT_KETUA_PROGRAM_STUDI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case PUT_KETUA_PROGRAM_STUDI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case DELETE_KETUA_PROGRAM_STUDI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_KETUA_PROGRAM_STUDI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DELETE_KETUA_PROGRAM_STUDI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case KETUA_PROGRAM_STUDI_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_KETUA_PROGRAM_STUDI_MODAL:
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
