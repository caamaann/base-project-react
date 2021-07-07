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
import orangTua from "./orang-tua";
import saudara from "./saudara";
import sertifikatOrganisasi from "./sertifikat/organisasi";
import sertifikatPrestasi from "./sertifikat/prestasi";

const appReducer = combineReducers({
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
  orangTua,
  saudara,
  sertifikatOrganisasi,
  sertifikatPrestasi,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "RESET_ALL_REDUX") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
