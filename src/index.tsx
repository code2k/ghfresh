import React from "react";
import { render } from "preact";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import store from "./app/store";

function init() {
  const App = require("./app/App").default;
  const rootElement = document.getElementById("root");

  const Element = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );

  // TODO: hydrate in SSR
  render(<Element />, rootElement as HTMLElement);
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
