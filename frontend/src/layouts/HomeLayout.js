import React from "react";
import FriendsSidebar from "../components/global/FriendsSidebar";
import Header from "../components/global/Header";
import Sidebar from "../components/global/Sidebar";
import classes from "../styles/HomeLayout.module.css";

const HomeLayout = ({ children }) => {
	return (
		<>
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
