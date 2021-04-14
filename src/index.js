import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// styles
import "./assets/styles/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// router
import { Router } from "react-router";
import { history } from "./utils";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
