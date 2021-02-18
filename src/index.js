import * as React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";

import App from './web/main';
import reportWebVitals from './reportWebVitals';

import configureStore from "./core/store/configureStore";

import './index.css';

const store = configureStore();
const rootElement = document.getElementById("root");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
