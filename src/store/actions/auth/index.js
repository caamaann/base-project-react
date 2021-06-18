import { history } from "../../../utils";
import axios from "axios";
import { actionPending, actionSuccess, actionError } from "../actionTypes";

// import API from "../API";
import { toastSuccess, toastError } from "../../../components/commons/toast";
import { getUser } from "../../../utils/user";

import API from "../API";

// ACTION TYPES TO DISPATCH: METHOD_URL_TYPES
export const POST_AUTH_LOGIN_PENDING = "POST_AUTH_LOGIN_PENDING";
export const POST_AUTH_LOGIN_SUCCESS = "POST_AUTH_LOGIN_SUCCESS";
export const POST_AUTH_LOGIN_ERROR = "POST_AUTH_LOGIN_ERROR";
export const POST_AUTH_FORGET_PASSWORD_PENDING =
  "POST_AUTH_FORGET_PASSWORD_PENDING";
export const POST_AUTH_FORGET_PASSWORD_SUCCESS =
  "POST_AUTH_FORGET_PASSWORD_SUCCESS";
export const POST_AUTH_FORGET_PASSWORD_ERROR =
  "POST_AUTH_FORGET_PASSWORD_ERROR";
export const POST_AUTH_RESET_PASSWORD_PENDING =
  "POST_AUTH_RESET_PASSWORD_PENDING";
export const POST_AUTH_RESET_PASSWORD_SUCCESS =
  "POST_AUTH_RESET_PASSWORD_SUCCESS";
export const POST_AUTH_RESET_PASSWORD_ERROR = "POST_AUTH_RESET_PASSWORD_ERROR";
export const POST_AUTH_CHANGE_PASSWORD_PENDING =
  "POST_AUTH_CHANGE_PASSWORD_PENDING";
export const POST_AUTH_CHANGE_PASSWORD_SUCCESS =
  "POST_AUTH_CHANGE_PASSWORD_SUCCESS";
export const POST_AUTH_CHANGE_PASSWORD_ERROR =
  "POST_AUTH_CHANGE_PASSWORD_ERROR";

// URL: URL_{URL}
const AUTH_LOGIN_URL = `${process.env.REACT_APP_SPK_BEASISWA_URL}/auth/login`;
const AUTH_FORGET_PASSWORD_URL = `${process.env.REACT_APP_SPK_BEASISWA_URL}/auth/forgot_password`;
const AUTH_RESET_PASSWORD_URL = `${process.env.REACT_APP_SPK_BEASISWA_URL}/auth/change_password_with_verify`;
const AUTH_CHANGE_PASSWORD_URL = `${process.env.REACT_APP_SPK_BEASISWA_URL}/auth/change_password`;

const auth_login = (param) => (dispatch) => {
  dispatch(actionPending(POST_AUTH_LOGIN_PENDING));
  axios
    .post(AUTH_LOGIN_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      dispatch(actionSuccess(POST_AUTH_LOGIN_SUCCESS, res));
      localStorage.setItem("user_spk_beasiswa", JSON.stringify(res.data.data));
      history.push(`/${res.data.data.roles[0].name.toLowerCase()}`);
      // history.push("/")
      window.location.reload(false);
      toastSuccess(`Selamat Datang ${res.data.data.profile.nama}`);
    })
    .catch((err) => {
      dispatch(actionError(POST_AUTH_LOGIN_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const logout = () => {
  if (getUser() && getUser() !== null) {
    localStorage.removeItem("user_spk_beasiswa");
    localStorage.removeItem("persist:root");
    history.push("/login");
  }
};

const forgetPassword = (param) => (dispatch) => {
  dispatch(actionPending(POST_AUTH_FORGET_PASSWORD_PENDING));
  axios
    .post(AUTH_FORGET_PASSWORD_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      history.push(`/login`);
      toastSuccess(`Silahkan Cek Email Anda`);
    })
    .catch((err) => {
      dispatch(actionError(POST_AUTH_FORGET_PASSWORD_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const verifikasi = (param) => (dispatch) => {
  dispatch(actionPending(POST_AUTH_RESET_PASSWORD_PENDING));
  axios
    .put(AUTH_RESET_PASSWORD_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      history.push(`/login`);
      toastSuccess(
        `Reset Password Berhasil, Silahkan Login menggunakan Password Baru Anda`
      );
    })
    .catch((err) => {
      dispatch(actionError(POST_AUTH_RESET_PASSWORD_ERROR));
      toastError(err?.response?.data?.message);
    });
};

const change_password = (param) => (dispatch) => {
  dispatch(actionPending(POST_AUTH_CHANGE_PASSWORD_PENDING));
  API.put(AUTH_CHANGE_PASSWORD_URL, param)
    .then((res) => {
      if (res.error) {
        throw res.error;
      }
      history.push(`/login`);
      toastSuccess(`Silahkan Login menggunakan Password Baru Anda`);
    })
    .catch((err) => {
      dispatch(actionError(POST_AUTH_CHANGE_PASSWORD_ERROR));
      toastError(err?.response?.data?.message);
    });
};
const Auth = {
  auth_login,
  logout,
  forgetPassword,
  verifikasi,
  change_password,
};
export default Auth;
