import { configureStore, getDefaultMiddleware, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import rootReducer, { RootState } from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === "development",
  middleware: getDefaultMiddleware({
    // serializableCheck: {
    //   ignoredActions: [PERSIST]
    // }
  })
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
