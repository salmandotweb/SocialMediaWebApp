import React from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import classes from "../../styles/Header.module.css";

const Header = () => {
	const { user } = useSelector((state) => state.user);
	return (
		<div className={classes.header}>
			<div className={classes.left}>
				<div className={classes.logo}>
					<img src="/images/Clickbay.png" alt="logo" />
				</div>
				<div className={classes.searchInput}>
					<FiSearch />
					<input type="text" placeholder="Search Clickbay" className="input" />
				</div>
			</div>
			<div className={classes.right}>
				<div className={classes.profile}>
					<h3>
						<span>{user?.firstName}</span>
						{user?.lastName}
					</h3>
					<img
						src={user?.picture}
						alt={user?.firstName}
						className="profileImage"
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
