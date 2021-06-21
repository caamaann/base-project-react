import {
  GET_PEMBANTU_DIREKTUR_3_PENDING,
  GET_PEMBANTU_DIREKTUR_3_SUCCESS,
  GET_PEMBANTU_DIREKTUR_3_ERROR,
  POST_PEMBANTU_DIREKTUR_3_PENDING,
  POST_PEMBANTU_DIREKTUR_3_SUCCESS,
  POST_PEMBANTU_DIREKTUR_3_ERROR,
  PUT_PEMBANTU_DIREKTUR_3_PENDING,
  PUT_PEMBANTU_DIREKTUR_3_SUCCESS,
  PUT_PEMBANTU_DIREKTUR_3_ERROR,
  DELETE_PEMBANTU_DIREKTUR_3_PENDING,
  DELETE_PEMBANTU_DIREKTUR_3_SUCCESS,
  DELETE_PEMBANTU_DIREKTUR_3_ERROR,
  PEMBANTU_DIREKTUR_3_DATA,
  SET_PEMBANTU_DIREKTUR_3_MODAL,
} from "../../../actions/user/pembantu-direktur-3";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
};

const pembantuDirektur3 = (state = initialState, action) => {
  switch (action.type) {
    case GET_PEMBANTU_DIREKTUR_3_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_PEMBANTU_DIREKTUR_3_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_PEMBANTU_DIREKTUR_3_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_PEMBANTU_DIREKTUR_3_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_PEMBANTU_DIREKTUR_3_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_PEMBANTU_DIREKTUR_3_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PUT_PEMBANTU_DIREKTUR_3_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PUT_PEMBANTU_DIREKTUR_3_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case PUT_PEMBANTU_DIREKTUR_3_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case DELETE_PEMBANTU_DIREKTUR_3_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_PEMBANTU_DIREKTUR_3_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DELETE_PEMBANTU_DIREKTUR_3_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PEMBANTU_DIREKTUR_3_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_PEMBANTU_DIREKTUR_3_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    default:
      return state;
  }
};

export default pembantuDirektur3;
