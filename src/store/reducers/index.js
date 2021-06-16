import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import global from "./global";
import {
  setSelectedHeader as header,
  setSelectedLinkHeader as linkHeader,
  setGoBack as isBackButton,
  setHeaderModal as headerModal,
} from "./header";

const rootReducer = combineReducers({
  form: formReducer,
  global,
  header,
  linkHeader,
  isBackButton,
  headerModal,
});

export default rootReducer;
