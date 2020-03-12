const API = "https://api.github.com";

export class RepoNotFoundError extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, RepoNotFoundError.prototype);
  }
}

export const getLatestRelease = async (repo: string) => {
  const url = `${API}/repos/${repo}/releases/latest`;

  const resp = await fetch(url);
  const json = await resp.json();

  if (resp.status === 404) {
    throw new RepoNotFoundError(`"${repo}" does not exist`);
  }

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
