import {
  getUserInfoAction,
  userSignupAction,
} from "../actions/asyncAuthActions";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state, action) {
      // Clear the user state
      state.user = null;
      localStorage.removeItem("accessToken");
      document.cookie =
        "refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignupAction.fulfilled, (state, action) => {
      const response = action.payload;
    });
    builder.addCase(getUserInfoAction.fulfilled, (state, action) => {
      const response = action.payload;
      // console.log(response.data);
      state.user = response;
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
