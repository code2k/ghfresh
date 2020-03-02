import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: false
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.darkMode = !state.darkMode;
    }
  }
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
