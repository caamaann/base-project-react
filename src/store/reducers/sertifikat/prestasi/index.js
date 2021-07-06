import {
  GET_SERTIFIKAT_PRESTASI_PENDING,
  GET_SERTIFIKAT_PRESTASI_SUCCESS,
  GET_SERTIFIKAT_PRESTASI_ERROR,
  POST_SERTIFIKAT_PRESTASI_PENDING,
  POST_SERTIFIKAT_PRESTASI_SUCCESS,
  POST_SERTIFIKAT_PRESTASI_ERROR,
  PUT_SERTIFIKAT_PRESTASI_PENDING,
  PUT_SERTIFIKAT_PRESTASI_SUCCESS,
  PUT_SERTIFIKAT_PRESTASI_ERROR,
  DELETE_SERTIFIKAT_PRESTASI_PENDING,
  DELETE_SERTIFIKAT_PRESTASI_SUCCESS,
  DELETE_SERTIFIKAT_PRESTASI_ERROR,
  SERTIFIKAT_PRESTASI_DATA,
  SET_SERTIFIKAT_PRESTASI_MODAL,
} from "../../../actions/sertifikat/prestasi";

const initialState = {
  pending: false,
  error: null,
  data: null,
  detailData: null,
  isOpenModal: false,
  modalType: "",
  title: "",
  folderName: "",
  fileName: "",
};

const sertifikatPrestasi = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERTIFIKAT_PRESTASI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case GET_SERTIFIKAT_PRESTASI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case GET_SERTIFIKAT_PRESTASI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case POST_SERTIFIKAT_PRESTASI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case POST_SERTIFIKAT_PRESTASI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case POST_SERTIFIKAT_PRESTASI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case PUT_SERTIFIKAT_PRESTASI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case PUT_SERTIFIKAT_PRESTASI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case PUT_SERTIFIKAT_PRESTASI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case DELETE_SERTIFIKAT_PRESTASI_PENDING:
      return {
        ...state,
        pending: true,
      };
    case DELETE_SERTIFIKAT_PRESTASI_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.data,
      };
    case DELETE_SERTIFIKAT_PRESTASI_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case SERTIFIKAT_PRESTASI_DATA:
      return {
        ...state,
        detailData: action.data,
      };
    case SET_SERTIFIKAT_PRESTASI_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
        title: action.data.title,
        folderName: action.data.folderName,
        fileName: action.data.fileName,
      };
    default:
      return state;
  }
};

export default sertifikatPrestasi;
