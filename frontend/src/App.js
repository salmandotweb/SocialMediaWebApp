import axios from "axios";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import ActivateAccount from "./pages/ActivateAccount";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function reducer(state, action) {
	switch (action.type) {
		case "POSTS_REQUEST":
			return {
				...state,
				loading: true,
				error: "",
			};
		case "POSTS_SUCCESS":
			return {
				...state,
				loading: false,
				posts: action.payload,
				error: "",
			};
		case "POSTS_ERROR":
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
}

function App() {
	const { user } = useSelector((state) => state.user);
	const [{ loading, posts, error }, dispatch] = useReducer(reducer, {
		loading: false,
		posts: [],
		error: "",
	});
	const getAllPosts = async () => {
		try {
			dispatch({
				type: "POSTS_REQUEST",
			});
			const { data } = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/allPosts`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			dispatch({
				type: "POSTS_SUCCESS",
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: "POSTS_ERROR",
				payload: error.response.data.message,
			});
		}
	};

	useEffect(() => {
		getAllPosts();
	}, []);

	return (
		<>
			<Routes>
				<Route element={<ProtectedRoutes />}>
					<Route
						path="/"
						element={<HomeLayout children={<Home posts={posts} />} />}
					/>
					<Route
						path="/activate/:token"
						element={<HomeLayout children={<ActivateAccount />} />}
					/>
				</Route>
				<Route element={<NotLoggedInRoutes />}>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Route>
				<Route path="/forget-password" element={<ResetPassword />} />
			</Routes>
		</>
	);
}

export default App;
