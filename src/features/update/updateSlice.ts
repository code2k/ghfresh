import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UpdateState {
  updateAvailable: boolean;
}

const initialState: UpdateState = {
  updateAvailable: false,
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {
    setUpdateAvailable(state, action: PayloadAction<boolean>) {
      state.updateAvailable = action.payload;
    },
  },
});

export const { setUpdateAvailable } = updateSlice.actions;

export default updateSlice.reducer;
