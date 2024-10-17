import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  fullname: null,
  isEmailVerified: false,
};

export const userInformationSlice = createSlice({
  name: "userInformation",
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUserInfo } = userInformationSlice.actions;

export default userInformationSlice.reducer;
