import {
  createEntityAdapter,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { getLatestRelease, RepoNotFoundError } from "../../github/githubAPI";
import { LatestReleaseType } from "../../github/latestReleaseType";
import { addNotification } from "../notifications/notificationsSlice";

export interface Repo {
  id: string;
  lastUpdate: number;
  latestRelease: LatestReleaseType;
  loading: boolean;
  error: Error | null;
}

export const reposAdapter = createEntityAdapter<Repo>();

const initialState = reposAdapter.getInitialState();

export type ReposState = typeof initialState;

export const reposSelectors = reposAdapter.getSelectors();

const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    addRepo: reposAdapter.addOne,

    removeRepo: reposAdapter.removeOne,

    startUpdateRepo(state, action: PayloadAction<string>) {
      reposAdapter.updateOne(state, {
        id: action.payload,
        changes: { loading: true }
      });
    },

    updateRepoSuccess(state, action: PayloadAction<Repo>) {
      const { id, lastUpdate, latestRelease } = action.payload;
      reposAdapter.updateOne(state, {
        id,
        changes: {
          lastUpdate,
          latestRelease,
          loading: false,
          error: null
        }
      });
    },

    updateRepoFailed(
      state,
      action: PayloadAction<{ id: string; error: Error }>
    ) {
      const { id, error } = action.payload;
      reposAdapter.updateOne(state, { id, changes: { error, loading: false } });
    },

    removeAllRepos: reposAdapter.removeAll
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
  const exists = getState().repos.ids.some(id => id === repoID);
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
  repos.ids.forEach(id => {
    const repo = repos.entities[id];
    if (!repo || repo.loading) {
      return;
    }
    const waitPeriod = new Date().getTime() - repo.lastUpdate;
    if (waitPeriod <= updateInterval) {
      return;
    }

    dispatch(updateLatestRelease(repo.id));
  });
};
