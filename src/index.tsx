import { hydrate, render } from "preact";
import React from "react";
import { Provider } from "react-redux";
import store from "./app/store";
import { updateOnlineStatus } from "./features/onlineStatus/onlineSlice";
import { setUpdateAvailable } from "./features/update/updateSlice";
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

/**
 * Register service worker
 */
serviceWorker.register({
  onUpdate: (registration) => {
    store.dispatch(setUpdateAvailable(true));
    registration?.waiting?.postMessage({ type: "SKIP_WAITING" });
  },
});

/**
 * Register event handlers for online / offline mode
 */
window.addEventListener("online", () => {
  store.dispatch(updateOnlineStatus(true));
});
window.addEventListener("offline", () => {
  store.dispatch(updateOnlineStatus(false));
});

