import { combineReducers } from "@reduxjs/toolkit";
import notificationsReducer from "../features/notifications/notificationsSlice";
import reposReducer from "../features/repos/reposSlice";
import themeReducer from "../features/theme/themeSlice";

const rootReducer = combineReducers({
  repos: reposReducer,
  theme: themeReducer,
  notifications: notificationsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
