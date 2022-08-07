import React from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import classes from "../../styles//stylesheets/Header.module.css";

const Header = () => {
	const { user } = useSelector((state) => state.user);

	console.log(user);
	return (
		<div className={classes.header}>
			<div className={classes.left}>
				<div className={classes.logo}>
					<img src="/images/favicon.png" alt="logo" />
				</div>
				<div className={classes.searchInput}>
					<FiSearch />
					<input
						type="text"
						placeholder="Search for something here..."
						className="input"
					/>
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
