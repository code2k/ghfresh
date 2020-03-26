import React from "react";
import { connect } from "react-redux";
import { IconButton, Tooltip } from "@material-ui/core";

import { RootState } from "../../app/rootReducer";

import { ThemeLightIcon, ThemeDarkIcon } from "../../components/Icons";
import { toggleTheme } from "./themeSlice";

interface Props {
  darkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeToggle = ({ darkMode, toggleTheme }: Props) => {
  const onClick = () => {
    toggleTheme();
  };

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton color="inherit" onClick={onClick}>
        {darkMode ? <ThemeDarkIcon /> : <ThemeLightIcon />}
      </IconButton>
    </Tooltip>
  );
};

const selectDarkMode = (state: RootState) => state.theme.darkMode;

const mapStateToProps = (state: RootState) => ({
  darkMode: selectDarkMode(state)
});

const mapDispatch = { toggleTheme };

export default connect(mapStateToProps, mapDispatch)(ThemeToggle);
