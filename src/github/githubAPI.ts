import { LatestReleaseType } from "./latestReleaseType";

const API = "https://api.github.com";

export class RepoNotFoundError extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, RepoNotFoundError.prototype);
  }
}

/**
 * https://developer.github.com/v3/repos/releases/#get-the-latest-release
 *
 * Rate limit is 60 request per hour
 */
export const getLatestRelease = async (
  repo: string
): Promise<LatestReleaseType> => {
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

/**
 * https://developer.github.com/v3/search/#search-repositories
 *
 * Rate limit is 10 request per minute
 */
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
