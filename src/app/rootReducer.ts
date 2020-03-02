import { combineReducers } from "@reduxjs/toolkit";

import reposReducer from "../features/repos/reposSlice";
import themeReducer from "../features/theme/themeSlice";

const rootReducer = combineReducers({
  repos: reposReducer,
  theme: themeReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
