import {
  GET_ORANG_TUA_PENDING,
  GET_ORANG_TUA_SUCCESS,
  GET_ORANG_TUA_ERROR,
  POST_ORANG_TUA_PENDING,
  POST_ORANG_TUA_SUCCESS,
  POST_ORANG_TUA_ERROR,
  PUT_ORANG_TUA_PENDING,
  PUT_ORANG_TUA_SUCCESS,
  PUT_ORANG_TUA_ERROR,
  DELETE_ORANG_TUA_PENDING,
  DELETE_ORANG_TUA_SUCCESS,
  DELETE_ORANG_TUA_ERROR,
  ORANG_TUA_DATA,
  ADD_ORANG_TUA_DATA,
  SET_ORANG_TUA_MODAL,
  ORANG_TUA_STEP,
} from "../../actions/orang-tua";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
  step: 0,
};

const orangTua = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORANG_TUA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_ORANG_TUA_SUCCESS:
      return {
        ...state,
        pending: false,
        detailData: action.data.data.data[0],
      };
    case GET_ORANG_TUA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_ORANG_TUA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_ORANG_TUA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_ORANG_TUA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PUT_ORANG_TUA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PUT_ORANG_TUA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case PUT_ORANG_TUA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case DELETE_ORANG_TUA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_ORANG_TUA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DELETE_ORANG_TUA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case ORANG_TUA_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_ORANG_TUA_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    case ORANG_TUA_STEP:
      return {
        ...state,
        step: action.step,
      };
    case ADD_ORANG_TUA_DATA:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default orangTua;
