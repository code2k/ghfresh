import { getLatestRelease, searchRepos } from "./githubAPI";

import responseLatest from "./fixtures/response.latest.json";
import responseSearch from "./fixtures/response.search.json";

describe("githubAPI", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe("latestRelease", () => {
    it("should return result", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(responseLatest));
      const response = await getLatestRelease("some/repo");
      expect(response).toEqual(responseLatest);
    });

    it("should return error on 404", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({
          documentation_url:
            "https://developer.github.com/v3/repos/releases/#get-the-latest-release",
          message: "Not Found"
        }),
        { status: 404 }
      );
      await expect(getLatestRelease("something")).rejects.toThrow("404");
    });
  });

  describe("searchRepos", () => {
    it("should return correct result", async () => {
      fetchMock.mockResponseOnce(JSON.stringify(responseSearch));
      const repos = await searchRepos("some/repo");
      expect(repos).toEqual([
        "reduxjs/redux",
        "StephenGrider/ReduxSimpleStarter",
        "StephenGrider/ReduxCasts"
      ]);
    });
    it("should return error", async () => {
      fetchMock.mockResponseOnce(JSON.stringify({}), { status: 500 });
      await expect(searchRepos("something")).rejects.toThrow("500");
    });
  });
});
