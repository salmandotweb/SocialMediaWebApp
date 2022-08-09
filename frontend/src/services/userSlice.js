import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
	},
	reducers: {
		userLogin: (state, action) => {
			state.user = action.payload;
		},
		userLogout: (state) => {
			state.user = null;
		},
		userVerifiedStatus: (state, action) => {
			state.user.verified = action.payload;
		},
	},
});

export const { userLogin, userLogout } = userSlice.actions;
