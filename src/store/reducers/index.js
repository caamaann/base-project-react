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

const rootReducer = combineReducers({
  form: formReducer,
  global,
  auth,
  header,
  linkHeader,
  isBackButton,
  headerModal,
  programStudi,
  jurusan,
});

export default rootReducer;
