import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["global"],
};

const pReducer = persistReducer(persistConfig, rootReducers);
const middleware = applyMiddleware(thunk);
const store = createStore(pReducer, composeWithDevTools(middleware));
const persistor = persistStore(store);

export { persistor, store };
