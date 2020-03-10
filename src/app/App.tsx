import { Box, Container, CssBaseline, ThemeProvider } from "@material-ui/core";
import { useMemo } from "preact/hooks";
import React from "react";
import { useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AddRepo from "../features/addRepo/AddRepo";
import Notifications from "../features/notifications/Notifications";
import RefreshButton from "../features/repos/RefreshButton";
import RepoList from "../features/repos/RepoList";
import ThemeToggle from "../features/theme/ThemeToggle";
import { RootState } from "./rootReducer";
import { persistor } from "./store";
import createTheme from "./theme";

const selectDarkMode = (state: RootState) => state.theme.darkMode;

const App = () => {
  const darkMode = useSelector(selectDarkMode);

  const theme = useMemo(() => {
    return createTheme(darkMode);
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PersistGate loading={null} persistor={persistor}>
        <Container maxWidth="lg">
          <ThemeToggle />
          <AddRepo />
          <RepoList />
          <Box marginTop={2}>
            <RefreshButton />
          </Box>
        </Container>
        <Notifications />
      </PersistGate>
    </ThemeProvider>
  );
};

export default App;
