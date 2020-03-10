import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { getLatestRelease, RepoNotFoundError } from "../../github/githubAPI";
import { addNotification } from "../notifications/notificationsSlice";

export interface Repo {
  id: string;
  lastUpdate: number;
  latestRelease: any;
  loading: boolean;
  error: Error | null;
}

export type ReposState = Repo[];

const initialState: ReposState = [];

const reposSlice = createSlice({
  name: "repos",
  initialState: initialState,
  reducers: {
    addRepo(state, action: PayloadAction<Repo>) {
      state.push(action.payload);
    },
    removeRepo(state, action: PayloadAction<string>) {
      const index = state.findIndex(repo => repo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    startUpdateRepo(state, action: PayloadAction<string>) {
      const repo = state.find(repo => repo.id === action.payload);
      if (repo) {
        repo.loading = true;
      }
    },
    updateRepoSuccess(state, action: PayloadAction<Repo>) {
      const { id, lastUpdate, latestRelease, loading } = action.payload;
      const repo = state.find(repo => repo.id === id);
      if (repo) {
        repo.lastUpdate = lastUpdate;
        repo.latestRelease = latestRelease;
        repo.loading = loading;
        repo.error = null;
      }
    },
    updateRepoFailed(
      state,
      action: PayloadAction<{ id: string; error: Error }>
    ) {
      const { id, error } = action.payload;
      const repo = state.find(repo => repo.id === id);
      if (repo) {
        repo.error = error;
      }
    },
    removeAllRepos() {
      return [];
    }
  }
});

export const {
  addRepo,
  startUpdateRepo,
  updateRepoSuccess,
  updateRepoFailed,
  removeRepo,
  removeAllRepos
} = reposSlice.actions;

export default reposSlice.reducer;

const responseToRepo = (id: string, response: any): Repo => {
  return {
    id: id,
    lastUpdate: new Date().getTime(),
    latestRelease: response,
    loading: false,
    error: null
  };
};

export const addNewRepo = (repoID: string): AppThunk => async (
  dispatch,
  getState
) => {
  // prevent duplicate repositories
  const exists = getState().repos.some(repo => repo.id === repoID);
  if (exists) {
    dispatch(
      addNotification({
        message: `Repository "${repoID} already exists`,
        type: "info"
      })
    );
    return;
  }

  try {
    const latestRelease = await getLatestRelease(repoID);
    dispatch(addRepo(responseToRepo(repoID, latestRelease)));
    dispatch(
      addNotification({ message: `Added "${repoID}"`, type: "success" })
    );
  } catch (err) {
    const msg =
      err instanceof RepoNotFoundError
        ? err.message
        : `Error adding "${repoID}"`;

    dispatch(addNotification({ message: msg, type: "error" }));
  }
};

export const updateLatestRelease = (
  repoID: string
): AppThunk => async dispatch => {
  try {
    dispatch(startUpdateRepo(repoID));
    const latestRelease = await getLatestRelease(repoID);
    dispatch(updateRepoSuccess(responseToRepo(repoID, latestRelease)));
  } catch (err) {
    dispatch(updateRepoFailed({ id: repoID, error: err }));
    dispatch(
      addNotification({
        message: `Update for "${repoID}" failed`,
        type: "error"
      })
    );
  }
};

/**
 * Minimum time between repository updates. Defaults to one 1 hour.
 * Configure value in .env
 */
const updateInterval =
  parseInt(process.env.REACT_APP_UPDATE_INTERVAL || "3600") * 1000;

export const updateAll: AppThunk = async (dispatch, getState) => {
  const repos = getState().repos;
  repos.forEach(repo => {
    if (repo.loading) {
      return;
    }
    const waitPeriod = new Date().getTime() - repo.lastUpdate;
    if (waitPeriod <= updateInterval) {
      return;
    }

    dispatch(updateLatestRelease(repo.id));
  });
};
