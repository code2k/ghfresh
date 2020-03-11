import React from "react";
import { render } from "@testing-library/react";
import Markdown from "./Markdown";

const markdown = `# Title
## Title2
### Title3
content 

[link](https://github.com)
mention: @code2k
pull: #123`;

describe("Markdown", () => {
  it("should render markdown", () => {
    const { getByText, container } = render(
      <Markdown markdown={markdown} repoID="test" />
    );

    expect(getByText("Title")).toBeInTheDocument();
    expect(container.querySelector("h1")).toBeInTheDocument();

    expect(getByText("Title2")).toBeInTheDocument();
    expect(container.querySelector("h2")).toBeInTheDocument();

    expect(getByText("Title3")).toBeInTheDocument();
    expect(container.querySelector("h3")).toBeInTheDocument();

    expect(getByText("content")).toBeInTheDocument();
  });

  it("should render links correctly", () => {
    const { container } = render(
      <Markdown markdown={markdown} repoID="test" />
    );
    const link = container.querySelector("a");
    expect(link).toBeInTheDocument();
    expect(link?.getAttribute("href")).toEqual("https://github.com");
    expect(link?.getAttribute("target")).toEqual("__blank");
    expect(link?.getAttribute("rel")).toEqual("noopener");
  });

  it("should convert mentions to links", () => {
    const { container } = render(
      <Markdown markdown={markdown} repoID="test" />
    );
    const link = container.querySelector("a[href='https://github.com/code2k");
    expect(link).toBeInTheDocument();
    expect(link?.textContent).toEqual("@code2k");
  });

  it("should convert pull numbers to links", () => {
    const { container } = render(
      <Markdown markdown={markdown} repoID="test" />
    );
    const link = container.querySelector(
      "a[href='https://github.com/test/pull/123"
    );
    expect(link).toBeInTheDocument();
    expect(link?.textContent).toEqual("#123");
  });
});
