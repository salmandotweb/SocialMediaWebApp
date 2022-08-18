import { Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import ActivateAccount from "./pages/ActivateAccount";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
	return (
		<>
			<Routes>
				<Route element={<ProtectedRoutes />}>
					<Route path="/" element={<HomeLayout children={<Home />} />} />
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
