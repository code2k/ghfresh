import { getLatestRelease } from "./githubAPI";

import responseLatest from "./response.latest.json";

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
});
