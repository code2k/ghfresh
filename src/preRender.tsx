import path from "path";
import fs from "fs";
import { ServerStyleSheets } from "@material-ui/core/styles";
import CleanCSS from "clean-css";
import { render } from "preact-render-to-string";
import React from "react";
import { Provider } from "react-redux";
import App from "./app/App";
import store from "./app/store";

function preRender() {
  console.log("prerender html...");

  const sheets = new ServerStyleSheets();

  const app = render(
    sheets.collect(
      <Provider store={store}>
        <App />
      </Provider>
    )
  );

  const css = new CleanCSS({}).minify(sheets.toString()).styles;

  const htmlFile = path.resolve(__dirname, "../build/index.html");
  let html = fs.readFileSync(htmlFile).toString();

  const cssMarker = "</head>";
  html = html.replace(
    cssMarker,
    `<style id="jss-server-side">${css}</style>${cssMarker}`
  );

  const appMarker = '<div id="root">';
  html = html.replace(appMarker, `${appMarker}${app}`);

  fs.writeFileSync(htmlFile, html);
  console.log(" -> " + htmlFile);
}

export default preRender;
