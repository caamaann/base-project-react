import {
  GET_AHP_PENDING,
  GET_AHP_SUCCESS,
  GET_AHP_ERROR,
  POST_AHP_PENDING,
  POST_AHP_SUCCESS,
  POST_AHP_ERROR,
  AHP_DATA,
  SET_AHP_MODAL,
} from "../../actions/ahp";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
};

const ahp = (state = initialState, action) => {
  switch (action.type) {
    case GET_AHP_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_AHP_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_AHP_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_AHP_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_AHP_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_AHP_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case AHP_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_AHP_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    default:
      return state;
  }
};

export default ahp;
