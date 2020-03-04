import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "preact/hooks";
import { PersistGate } from "redux-persist/integration/react";
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
import { persistor } from "./store";

import AddRepo from "../features/repos/AddRepo";
import ThemeToggle from "../features/theme/ThemeToggle";
import RepoList from "../features/repos/RepoList";

const selectDarkMode = (state: RootState) => state.theme.darkMode;

const App = () => {
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
      <PersistGate loading={null} persistor={persistor}>
        <Container maxWidth="lg">
          <ThemeToggle />
          <AddRepo />
          <RepoList />
          <Box marginTop={2}>
            <Button variant="outlined" color="primary" onClick={onRefresh}>
              Refresh
            </Button>
          </Box>
        </Container>
      </PersistGate>
    </ThemeProvider>
  );
};

export default App;
