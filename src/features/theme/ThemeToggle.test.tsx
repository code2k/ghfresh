import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("should call toggleTheme on click", () => {
    const toggleTheme = jest.fn();
    const { getByRole } = render(
      <ThemeToggle darkMode={true} toggleTheme={toggleTheme} />
    );

    fireEvent.click(getByRole("button"));

    expect(toggleTheme).toBeCalled();
  });

  it("should render different icons for dark/light mode", () => {
    const { container: dark } = render(
      <ThemeToggle darkMode={true} toggleTheme={jest.fn()} />
    );
    const { container: light } = render(
      <ThemeToggle darkMode={false} toggleTheme={jest.fn()} />
    );

    const darkIcon = dark.querySelector("svg");
    const lightIcon = light.querySelector("svg");

    expect(darkIcon).not.toEqual(lightIcon);
  });
});
