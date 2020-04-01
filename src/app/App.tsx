import {
  Box,
  Container,
  CssBaseline,
  NoSsr,
  ThemeProvider
} from "@material-ui/core";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Header from "../components/Header";
import Notifications from "../features/notifications/Notifications";
import useAutoUpdate from "../features/repos/autoUpdate";
import RefreshButton from "../features/repos/RefreshButton";
import RepoList from "../features/repos/RepoList";
import ReposSortButton from "../features/sortRepos/ReposSortButton";
import SortDirectionToggle from "../features/sortRepos/SortDirectionToggle";
import { RootState } from "./rootReducer";
import { persistor } from "./store";
import createTheme from "./theme";

const selectDarkMode = (state: RootState) => state.theme.darkMode;

const App = () => {
  useAutoUpdate();
  const darkMode = useSelector(selectDarkMode);

  const theme = useMemo(() => {
    return createTheme(darkMode);
  }, [darkMode]);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="md">
        <PersistGate loading={null} persistor={persistor}>
          <ReposSortButton />
          <SortDirectionToggle />
          <RepoList />
          <Box marginTop={2}>
            <RefreshButton />
          </Box>
        </PersistGate>
      </Container>
      <NoSsr defer>
        <Notifications />
      </NoSsr>
    </ThemeProvider>
  );
};

export default App;
