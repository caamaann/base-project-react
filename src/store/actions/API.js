import axios from "axios";

let user = JSON.parse(localStorage.getItem("user_spk_beasiswa"));

const instance = axios.create({
  baseURL: process.env.REACT_APP_SPK_BEASISWA_URL,
  // headers: { "x-auth-token": user !== null ? user.token : "" },
});

export default instance;
