import { combineReducers } from "@reduxjs/toolkit";
import notificationsReducer from "../features/notifications/notificationsSlice";
import reposReducer from "../features/repos/reposSlice";
import sortReducer from "../features/sortRepos/sortReposSlice";
import themeReducer from "../features/theme/themeSlice";

const rootReducer = combineReducers({
  repos: reposReducer,
  sort: sortReducer,
  theme: themeReducer,
  notifications: notificationsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
