const API = "https://api.github.com/repos";

export const getLatestRelease = async (repo: string) => {
  const url = `${API}/${repo}/releases/latest`;

  if (process.env.NODE_ENV === "development") {
    return new Promise(resolve => {
      setTimeout(() => {
        const json = require("./response.latest.json");
        resolve(json);
      }, 1);
    });
  }

  const resp = await fetch(url);
  const json = await resp.json();

  return json;
};
