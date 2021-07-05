import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import global from "./global";
import auth from "./auth";
import {
  setSelectedHeader as header,
  setSelectedLinkHeader as linkHeader,
  setGoBack as isBackButton,
  setHeaderModal as headerModal,
} from "./header";
import programStudi from "./master/program-studi";
import jurusan from "./master/jurusan";
import userMahasiswa from "./user/mahasiswa";
import userWaliKelas from "./user/wali-kelas";
import userKetuaProgramStudi from "./user/ketua-program-studi";
import userKetuaJurusan from "./user/ketua-jurusan";
import userPembantuDirektur3 from "./user/pembantu-direktur-3";
import beasiswa from "./beasiswa";
import mahasiswa from "./mahasiswa";

const rootReducer = combineReducers({
  form: formReducer,
  beasiswa,
  global,
  auth,
  header,
  linkHeader,
  isBackButton,
  headerModal,
  programStudi,
  jurusan,
  userMahasiswa,
  userWaliKelas,
  userKetuaProgramStudi,
  userKetuaJurusan,
  userPembantuDirektur3,
  mahasiswa,
});

export default rootReducer;
