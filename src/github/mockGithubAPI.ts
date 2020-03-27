import marked from "./fixtures/marked.json";
import materialUI from "./fixtures/material-ui.json";
import preact from "./fixtures/preact.json";
import reactRedux from "./fixtures/react-redux.json";
import reduxToolkit from "./fixtures/redux-toolkit.json";
import { RepoNotFoundError } from "./githubAPI";

export { RepoNotFoundError, searchRepos } from "./githubAPI";

const repoMapping: { [key: string]: any } = {
  "preactjs/preact": preact,
  "reduxjs/redux-toolkit": reduxToolkit,
  "reduxjs/react-redux": reactRedux,
  "mui-org/material-ui": materialUI,
  "markedjs/marked": marked
};

export const getLatestRelease = async (repo: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const json = repoMapping[repo];
      if (json) {
        resolve(json);
      } else {
        reject(new RepoNotFoundError(`Mock "${repo}" does not exist`));
      }
    }, 1);
  });
};
