import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/authReducer";
import expenseReducer from "./reducers/expenseReducer";
import chatReducer from "./reducers/chatReducer";
import groupReducer from "./reducers/groupReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    expense: expenseReducer,
    chat: chatReducer,
    group: groupReducer,
  },
});
