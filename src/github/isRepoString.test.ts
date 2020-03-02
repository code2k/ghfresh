import isRepoString from "./isRepoString";

describe("isRepo", () => {
  it("should be true for correct format", () => {
    expect(isRepoString("some/repo")).toBe(true);
  });

  it("should not contains spaces", () => {
    expect(isRepoString(" some/repo")).toBe(false);
    expect(isRepoString("some  /repo")).toBe(false);
    expect(isRepoString("some/repo ")).toBe(false);
  });

  it("should contain 1 '/'", () => {
    expect(isRepoString("somerepo")).toBe(false);
    expect(isRepoString("so//merepo")).toBe(false);
  });

  it("should not start with '/'", () => {
    expect(isRepoString("/somerepo")).toBe(false);
  });

  it("should not end with '/'", () => {
    expect(isRepoString("somerepo/")).toBe(false);
  });
});
