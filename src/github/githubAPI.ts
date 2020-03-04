const API = "https://api.github.com/repos";

export const getLatestRelease = async (repo: string) => {
  const url = `${API}/${repo}/releases/latest`;

  if (process.env.NODE_ENV === "development") {
    return new Promise(resolve => {
      setTimeout(() => {
        const json = require("./fixtures/response.latest.json");
        resolve(json);
      }, 1);
    });
  }

  const resp = await fetch(url);
  const json = await resp.json();

  if (resp.status !== 200) {
    throw new Error(
      `getLatestRelease error: ${resp.status} -> ${json.message} `
    );
  }

  return json;
};

export const searchRepos = async (repo: string): Promise<string[]> => {
  const url = `${API}/search/repositories?q=${repo}`;

  const resp = await fetch(url);

  if (resp.status !== 200) {
    throw new Error(`searchRepo error: ${resp.status}`);
  }

  const json = await resp.json();
  const repos = json.items.map((item: any) => item.full_name);

  return repos;
};
