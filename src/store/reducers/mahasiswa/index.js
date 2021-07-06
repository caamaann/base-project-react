import {
  GET_MAHASISWA_PENDING,
  GET_MAHASISWA_SUCCESS,
  GET_MAHASISWA_ERROR,
  POST_MAHASISWA_PENDING,
  POST_MAHASISWA_SUCCESS,
  POST_MAHASISWA_ERROR,
  BERKAS_MAHASISWA_PENDING,
  BERKAS_MAHASISWA_SUCCESS,
  BERKAS_MAHASISWA_ERROR,
  SERTIFIKAT_MAHASISWA_PENDING,
  SERTIFIKAT_MAHASISWA_SUCCESS,
  SERTIFIKAT_MAHASISWA_ERROR,
  PUT_MAHASISWA_PENDING,
  PUT_MAHASISWA_SUCCESS,
  PUT_MAHASISWA_ERROR,
  DELETE_MAHASISWA_PENDING,
  DELETE_MAHASISWA_SUCCESS,
  DELETE_MAHASISWA_ERROR,
  MAHASISWA_DATA,
  ADD_MAHASISWA_DATA,
  SET_MAHASISWA_MODAL,
  MAHASISWA_STEP,
} from "../../actions/mahasiswa";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
  step: 0,
  title: "",
  folderName: "",
  fileName: "",
};

const mahasiswa = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAHASISWA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_MAHASISWA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_MAHASISWA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_MAHASISWA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_MAHASISWA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_MAHASISWA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case BERKAS_MAHASISWA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case BERKAS_MAHASISWA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case BERKAS_MAHASISWA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case SERTIFIKAT_MAHASISWA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case SERTIFIKAT_MAHASISWA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case SERTIFIKAT_MAHASISWA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PUT_MAHASISWA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PUT_MAHASISWA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case PUT_MAHASISWA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case DELETE_MAHASISWA_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_MAHASISWA_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DELETE_MAHASISWA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case MAHASISWA_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_MAHASISWA_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
        title: action.data.title,
        folderName: action.data.folderName,
        fileName: action.data.fileName,
      };
    case MAHASISWA_STEP:
      return {
        ...state,
        step: action.step,
      };
    case ADD_MAHASISWA_DATA:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};

export default mahasiswa;
