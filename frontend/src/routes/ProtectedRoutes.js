import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

const ProtectedRoutes = () => {
	const { user } = useSelector((state) => state.user);
	return user ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
