import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { RefreshButton } from "./RefreshButton";

describe("RefreshButton", () => {
  it("should render", () => {
    const { getByRole } = render(
      <RefreshButton isEmpty={false} isLoading={false} updateAll={jest.fn()} />
    );
    expect(getByRole("button")).toBeInTheDocument();
  });

  it("should call updateAll on click", () => {
    const updateAll = jest.fn();
    const { getByRole } = render(
      <RefreshButton isEmpty={false} isLoading={false} updateAll={updateAll} />
    );
    fireEvent.click(getByRole("button"));
    expect(updateAll).toBeCalledTimes(1);
  });

  it("should be disabled when list is empty", () => {
    const { getByRole } = render(
      <RefreshButton isEmpty={true} isLoading={false} updateAll={jest.fn()} />
    );
    const button = getByRole("button");
    expect(button.getAttributeNames()).toContain("disabled");
  });

  it("should be disabled while loading", () => {
    const { getByRole } = render(
      <RefreshButton isEmpty={false} isLoading={true} updateAll={jest.fn()} />
    );
    const button = getByRole("button");
    expect(button.getAttributeNames()).toContain("disabled");
  });
});
