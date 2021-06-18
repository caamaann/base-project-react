import {
  POST_AUTH_LOGIN_PENDING,
  POST_AUTH_LOGIN_SUCCESS,
  POST_AUTH_LOGIN_ERROR,
  POST_AUTH_FORGET_PASSWORD_ERROR,
  POST_AUTH_FORGET_PASSWORD_PENDING,
  POST_AUTH_FORGET_PASSWORD_SUCCESS,
  POST_AUTH_RESET_PASSWORD_ERROR,
  POST_AUTH_RESET_PASSWORD_PENDING,
  POST_AUTH_RESET_PASSWORD_SUCCESS,
  POST_AUTH_CHANGE_PASSWORD_ERROR,
  POST_AUTH_CHANGE_PASSWORD_PENDING,
  POST_AUTH_CHANGE_PASSWORD_SUCCESS,
} from "../../actions/auth";

const user = JSON.parse(localStorage.getItem("user_spk_beasiswa"));
const initialState = user
  ? { loggedIn: true, user }
  : {
      loggingIn: false,
      pending: false,
      pendingForget: false,
      pendingVerifikasi: false,
    };

const auth_login = (state = initialState, action) => {
  switch (action.type) {
    case POST_AUTH_LOGIN_PENDING:
      return {
        loggingIn: true,
      };
    case POST_AUTH_LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loggingIn: false,
        user: action.data,
      };
    case POST_AUTH_LOGIN_ERROR:
      return {};
    case POST_AUTH_FORGET_PASSWORD_PENDING:
      return {
        pendingForget: true,
      };
    case POST_AUTH_FORGET_PASSWORD_SUCCESS:
      return {
        pendingForget: false,
        loggedIn: true,
      };
    case POST_AUTH_FORGET_PASSWORD_ERROR:
      return {};
    case POST_AUTH_RESET_PASSWORD_PENDING:
      return {
        pendingVerifikasi: true,
      };
    case POST_AUTH_RESET_PASSWORD_SUCCESS:
      return {
        pendingVerifikasi: false,
        loggedIn: true,
      };
    case POST_AUTH_RESET_PASSWORD_ERROR:
      return {};
    case POST_AUTH_CHANGE_PASSWORD_PENDING:
      return {
        pending: true,
      };
    case POST_AUTH_CHANGE_PASSWORD_SUCCESS:
      return {
        pending: false,
        loggedIn: true,
      };
    case POST_AUTH_CHANGE_PASSWORD_ERROR:
      return {};
    default:
      return state;
  }
};

export default auth_login;
