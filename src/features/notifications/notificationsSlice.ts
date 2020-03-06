import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotificationType = "error" | "info" | "success" | "warning";

export interface Notification {
  message: string;
  type?: NotificationType;
}

export interface NotificationsState {
  current?: Notification;
  queue: Notification[];
}

const initialState: NotificationsState = {
  queue: []
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Notification>) {
      if (!state.current && state.queue.length === 0) {
        state.current = action.payload;
      } else {
        state.queue.push(action.payload);
      }
    },
    nextNotification(state) {
      if (state.queue.length === 0) {
        state.current = undefined;
      } else {
        state.current = state.queue.shift();
      }
    }
  }
});

export const { addNotification, nextNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
