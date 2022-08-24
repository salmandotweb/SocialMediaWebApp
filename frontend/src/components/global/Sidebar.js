import React from "react";
import { Link } from "react-router-dom";
import classes from "../../styles/Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const SidebarLink = ({ children, to }) => {
	return (
		<Link to={to}>
			<li className={classes.sidebarLink}>{children}</li>
		</Link>
	);
};

const Sidebar = () => {
	const { user } = useSelector((state) => state.user);
	const links = [
		{
			to: "/profile",
			text: `${user?.firstName} ${user?.lastName}`,
			icon: `${user?.picture}`,
		},
		{ to: "/", text: "Feed", icon: "/Icons/feed.png" },
		{ to: "/", text: "My Friends", icon: "/Icons/friends.png" },
		{ to: "/", text: "Messages", icon: "/Icons/messages.png" },
		{ to: "/", text: "Notifications", icon: "/Icons/notification.png" },
		{ to: "/", text: "Explore", icon: "/Icons/explore.png" },
		{ to: "/", text: "Profile", icon: "/Icons/profile.png" },
		{ to: "/", text: "Settings", icon: "/Icons/setting.png" },
	];
	const dispatch = useDispatch();
	const handleLogout = () => {
		Cookies.set("user", "");
		dispatch({ type: "userLogout" });
		window.location.reload();
	};
	return (
		<div className={classes.sidebar}>
			<ul className={classes.sidebarLinks}>
				{links.map((link, index) => {
					return (
						<SidebarLink to={link.to} key={index}>
							<img className="svgIcon" src={link.icon} alt="icon" />
							{link.text}
						</SidebarLink>
					);
				})}
				<li className={classes.sidebarLink} onClick={handleLogout}>
					<img className="svgIcon" src="/Icons/logout.png" alt="icon" />
					Logout
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
