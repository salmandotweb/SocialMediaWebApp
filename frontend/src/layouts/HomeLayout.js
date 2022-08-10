import React from "react";
import { useSelector } from "react-redux";
import FriendsSidebar from "../components/global/FriendsSidebar";
import Header from "../components/global/Header";
import SendVerification from "../components/global/SendVerification";
import Sidebar from "../components/global/Sidebar";
import classes from "../styles/HomeLayout.module.css";

const HomeLayout = ({ children }) => {
	const { user } = useSelector((state) => state.user);
	return (
		<>
			{user.verified === false && <SendVerification />}
			<Header />
			<div className={classes.dashboard}>
				<Sidebar />
				{children}
				<FriendsSidebar />
			</div>
		</>
	);
};

export default HomeLayout;
