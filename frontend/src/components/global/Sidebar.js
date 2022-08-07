import React from "react";
import { Link } from "react-router-dom";
import classes from "../../styles/stylesheets/Sidebar.module.css";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { MdOutlineDashboard, MdTravelExplore } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { TbMessageShare } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";

const SidebarLink = ({ children, to }) => {
	return (
		<Link to={to}>
			<li className={classes.sidebarLink}>{children}</li>
		</Link>
	);
};

const Sidebar = () => {
	const links = [
		{ to: "/", text: "Feed", icon: <MdOutlineDashboard /> },
		{ to: "/", text: "My Community", icon: <FiUsers /> },
		{ to: "/", text: "Messages", icon: <TbMessageShare /> },
		{ to: "/", text: "Notifications", icon: <IoMdNotificationsOutline /> },
		{ to: "/", text: "Explore", icon: <MdTravelExplore /> },
		{ to: "/", text: "Profile", icon: <AiOutlineUser /> },
		{ to: "/", text: "Settings", icon: <AiOutlineSetting /> },
		{ to: "/", text: "Logout", icon: <RiLogoutCircleRLine /> },
	];
	return (
		<div className={classes.sidebar}>
			<ul className={classes.sidebarLinks}>
				{links.map((link, index) => {
					return (
						<SidebarLink to={link.to} key={index}>
							{link.icon}
							{link.text}
						</SidebarLink>
					);
				})}
			</ul>
		</div>
	);
};

export default Sidebar;
