import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlice } from "../services/userSlice";

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
	},
});

setupListeners(store.dispatch);
