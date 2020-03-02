import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "preact/hooks";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  ThemeProvider
} from "@material-ui/core";

import createTheme from "./theme";
import { updateAll } from "../features/repos/reposSlice";
import { RootState } from "./rootReducer";

import AddRepo from "../features/repos/AddRepo";
import ThemeToggle from "../features/theme/ThemeToggle";

const selectRepo = (state: RootState) => state.repos;
const selectDarkMode = (state: RootState) => state.theme.darkMode;

const App = () => {
  const repos = useSelector(selectRepo);
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const theme = useMemo(() => {
    return createTheme(darkMode);
  }, [darkMode]);

  const onRefresh = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    dispatch(updateAll);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <ThemeToggle />
        <AddRepo />
        <div>{repos.map(repo => ` ${repo.id}: ${repo.lastUpdate}`)}</div>
        <Box marginTop={2}>
          <Button variant="outlined" color="primary" onClick={onRefresh}>
            Refresh
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
