import React from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "../../styles/Header.module.css";

const Header = () => {
	const { user } = useSelector((state) => state.user);
	return (
		<div className={classes.header}>
			<div className={classes.left}>
				<Link to="/">
					<div className={classes.logo}>
						<img src="/images/Clickbay.png" alt="logo" />
					</div>
				</Link>
				<div className={classes.searchInput}>
					<FiSearch />
					<input type="text" placeholder="Search Clickbay" className="input" />
				</div>
			</div>
			<Link to="/profile">
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
			</Link>
		</div>
	);
};

export default Header;
