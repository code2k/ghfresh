import { configureStore, getDefaultMiddleware, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import {
  createTransform,
  persistStore,
  persistReducer,
  PersistConfig,
  PERSIST
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { Repo, ReposState } from "../features/repos/reposSlice";
import rootReducer, { RootState } from "./rootReducer";

type RootReducerType = typeof rootReducer;

/**
 * Transformer for resetting loading and error fields before persisting
 */
const cleanReposState = createTransform(
  (state: ReposState) => {
    return state.map((repo: Repo) => {
      return {
        ...repo,
        loading: false,
        error: null
      };
    });
  },
  null,
  { whitelist: ["repos"] }
);

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  transforms: [cleanReposState]
};

// persistReducer doesn't work nice with typescript -> brutal cast it
const persistedReducer = (persistReducer(
  persistConfig,
  rootReducer
) as unknown) as RootReducerType;

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [PERSIST] // needed for redux-persist
    }
  })
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
