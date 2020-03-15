import { hydrate, render } from "preact";
import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import * as serviceWorker from "./serviceWorker";

const doRender = process.env.NODE_ENV === "production" ? hydrate : render;

function init() {
  const App = require("./app/App").default;
  const rootElement = document.getElementById("root");

  const Element = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );

  doRender(<Element />, rootElement as HTMLElement);
}

if (process.env.NODE_ENV === "development") {
  // require("preact/debug");
  if (module.hot) {
    module.hot.accept("./app/App", init);
  }
}

init();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
