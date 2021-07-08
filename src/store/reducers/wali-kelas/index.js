import {
  GET_WALI_KELAS_PENDING,
  GET_WALI_KELAS_SUCCESS,
  GET_WALI_KELAS_ERROR,
  GET_SERTIFIKAT_WALI_KELAS_PENDING,
  GET_SERTIFIKAT_WALI_KELAS_SUCCESS,
  GET_SERTIFIKAT_WALI_KELAS_ERROR,
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
  ADD_WALI_KELAS_DATA,
  SET_WALI_KELAS_MODAL,
  WALI_KELAS_STEP,
} from "../../actions/wali-kelas";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
  step: 0,
  dataPerbandingan: null,
  title: "",
  folderName: "",
  fileName: "",
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
    case GET_SERTIFIKAT_WALI_KELAS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_SERTIFIKAT_WALI_KELAS_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_SERTIFIKAT_WALI_KELAS_ERROR:
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
        title: action.data.title,
        folderName: action.data.folderName,
        fileName: action.data.fileName,
      };
    case WALI_KELAS_STEP:
      return {
        ...state,
        step: action.step,
      };
    case ADD_WALI_KELAS_DATA:
      return {
        ...state,
        dataPerbandingan: action.data,
      };
    default:
      return state;
  }
};

export default waliKelas;
