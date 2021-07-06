import {
  GET_SAUDARA_PENDING,
  GET_SAUDARA_SUCCESS,
  GET_SAUDARA_ERROR,
  POST_SAUDARA_PENDING,
  POST_SAUDARA_SUCCESS,
  POST_SAUDARA_ERROR,
  PUT_SAUDARA_PENDING,
  PUT_SAUDARA_SUCCESS,
  PUT_SAUDARA_ERROR,
  DELETE_SAUDARA_PENDING,
  DELETE_SAUDARA_SUCCESS,
  DELETE_SAUDARA_ERROR,
  SAUDARA_DATA,
  ADD_SAUDARA_DATA,
  SET_SAUDARA_MODAL,
  SAUDARA_STEP,
} from "../../actions/saudara";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
  step: 0,
};

const saudara = (state = initialState, action) => {
  switch (action.type) {
    case GET_SAUDARA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_SAUDARA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_SAUDARA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_SAUDARA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_SAUDARA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_SAUDARA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PUT_SAUDARA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PUT_SAUDARA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case PUT_SAUDARA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case DELETE_SAUDARA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_SAUDARA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DELETE_SAUDARA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case SAUDARA_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_SAUDARA_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    case SAUDARA_STEP:
      return {
        ...state,
        step: action.step,
      };
    case ADD_SAUDARA_DATA:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default saudara;
