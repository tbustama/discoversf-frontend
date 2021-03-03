import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./Redux/Recuders/Index";
import { ActionCableProvider } from "react-actioncable-provider";

const API_WS_ROOT = "ws://localhost:3000/cable";
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
console.log(store);
ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <Provider store={store}>
      <App />
    </Provider>
  </ActionCableProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
