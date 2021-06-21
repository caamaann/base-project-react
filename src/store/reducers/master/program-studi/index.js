import {
  GET_PROGRAM_STUDI_PENDING,
  GET_PROGRAM_STUDI_SUCCESS,
  GET_PROGRAM_STUDI_ERROR,
  POST_PROGRAM_STUDI_PENDING,
  POST_PROGRAM_STUDI_SUCCESS,
  POST_PROGRAM_STUDI_ERROR,
  PUT_PROGRAM_STUDI_PENDING,
  PUT_PROGRAM_STUDI_SUCCESS,
  PUT_PROGRAM_STUDI_ERROR,
  DELETE_PROGRAM_STUDI_PENDING,
  DELETE_PROGRAM_STUDI_SUCCESS,
  DELETE_PROGRAM_STUDI_ERROR,
  PROGRAM_STUDI_DATA,
  SET_PROGRAM_STUDI_MODAL,
} from "../../../actions/master/program-studi";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
};

const programStudi = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROGRAM_STUDI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_PROGRAM_STUDI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_PROGRAM_STUDI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_PROGRAM_STUDI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_PROGRAM_STUDI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_PROGRAM_STUDI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PUT_PROGRAM_STUDI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PUT_PROGRAM_STUDI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case PUT_PROGRAM_STUDI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case DELETE_PROGRAM_STUDI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_PROGRAM_STUDI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DELETE_PROGRAM_STUDI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PROGRAM_STUDI_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_PROGRAM_STUDI_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    default:
      return state;
  }
};

export default programStudi;
