import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
};

export const categorySlice = createSlice({
  name: "categoryInformation",
  initialState,
  reducers: {
    updateCategories: (state, action) => {
      state.data = [...action.payload.data];
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const { updateCategories } = categorySlice.actions;

export default categorySlice.reducer;
