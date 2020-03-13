import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ReposSortOrder = "none" | "alpha" | "date";

export interface SortReposState {
  order: ReposSortOrder;
  descending: boolean;
}

const initialState: SortReposState = {
  order: "date",
  descending: true
};

const sortReposSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setReposSortOrder(state, action: PayloadAction<ReposSortOrder>) {
      state.order = action.payload;
    },
    toggleDescending(state) {
      state.descending = !state.descending;
    }
  }
});

export const { setReposSortOrder, toggleDescending } = sortReposSlice.actions;

export default sortReposSlice.reducer;
