import { combineReducers } from "@reduxjs/toolkit";
import notificationsReducer from "../features/notifications/notificationsSlice";
import onlineReducer from "../features/onlineStatus/onlineSlice";
import reposReducer from "../features/repos/reposSlice";
import sortReducer from "../features/sortRepos/sortReposSlice";
import themeReducer from "../features/theme/themeSlice";
import updateReducer from "../features/update/updateSlice";

const rootReducer = combineReducers({
  repos: reposReducer,
  sort: sortReducer,
  theme: themeReducer,
  notifications: notificationsReducer,
  update: updateReducer,
  online: onlineReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
