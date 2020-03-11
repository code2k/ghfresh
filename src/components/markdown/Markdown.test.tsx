import React from "react";
import { render } from "@testing-library/react";
import Markdown from "./Markdown";

const markdown = `# Title
## Title2
### Title3
content`;

describe("Markdown", () => {
  it("should render markdown", () => {
    const { getByText, container } = render(<Markdown markdown={markdown} />);

    expect(getByText("Title")).toBeInTheDocument();
    expect(container.querySelector("h1")).toBeInTheDocument();

    expect(getByText("Title2")).toBeInTheDocument();
    expect(container.querySelector("h2")).toBeInTheDocument();

    expect(getByText("Title3")).toBeInTheDocument();
    expect(container.querySelector("h3")).toBeInTheDocument();

    expect(getByText("content")).toBeInTheDocument();
  });
});
