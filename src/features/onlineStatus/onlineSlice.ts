import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import {
  addNotification,
  Notification,
} from "../notifications/notificationsSlice";

const onlineSlice = createSlice({
  name: "online",
  initialState: true,
  reducers: {
    updateOnline(_state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { updateOnline } = onlineSlice.actions;

export const updateOnlineStatus = (online: boolean): AppThunk => async (
  dispatch,
  getState
) => {
  if (getState().online !== online) {
    const notification: Notification = online
      ? { type: "info", message: "Online Mode" }
      : { type: "warning", message: "Offline Mode" };

    dispatch(addNotification(notification));
    dispatch(updateOnline(online));
  }
};

export default onlineSlice.reducer;
