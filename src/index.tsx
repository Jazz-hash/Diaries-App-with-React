import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import { setupServer } from "./services/mirage/server";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { Provider } from "react-redux";

if (process.env.NODE_ENV === "production") {
  setupServer();
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
