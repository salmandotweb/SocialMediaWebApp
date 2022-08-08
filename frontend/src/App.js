import { Routes, Route } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
	return (
		<>
			<Routes>
				<Route element={<ProtectedRoutes />}>
					<Route path="/" element={<HomeLayout children={<Home />} />} />
				</Route>
				<Route element={<NotLoggedInRoutes />}>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
