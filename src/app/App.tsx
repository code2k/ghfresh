import {
  Container,
  CssBaseline,
  NoSsr,
  ThemeProvider,
} from "@material-ui/core";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Header from "../components/Header";
import NoScript from "../components/NoScript";
import Welcome from "../components/Welcome";
import Notifications from "../features/notifications/Notifications";
import { updateOnlineStatus } from "../features/onlineStatus/onlineSlice";
import useAutoUpdate from "../features/repos/autoUpdate";
import RepoList from "../features/repos/RepoList";
import UpdateNotification from "../features/update/UpdateNotification";
import { RootState } from "./rootReducer";
import { persistor } from "./store";
import createTheme from "./theme";
import useExamples from "./useExamples";

const selectDarkMode = (state: RootState) => state.theme.darkMode;
const selectRepos = (state: RootState) => state.repos;
const selectUpdateAvailable = (state: RootState) =>
  state.update.updateAvailable;

const App = () => {
  useAutoUpdate();
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);
  const updateAvailable = useSelector(selectUpdateAvailable);
  const repos = useSelector(selectRepos);
  const addExamples = useExamples();

  const theme = useMemo(() => {
    return createTheme(darkMode);
  }, [darkMode]);

  /**
   * Remove SSR styles
   */
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  /**
   * Set initial online status
   */
  useEffect(() => {
    dispatch(updateOnlineStatus(navigator?.onLine));
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="md">
        <NoScript />
        {updateAvailable && <UpdateNotification />}
        <PersistGate loading={null} persistor={persistor}>
          {repos.ids.length === 0 ? (
            <Welcome addExamples={addExamples} />
          ) : (
            <RepoList />
          )}
        </PersistGate>
      </Container>
      <NoSsr defer>
        <Notifications />
      </NoSsr>
    </ThemeProvider>
  );
};

export default App;
