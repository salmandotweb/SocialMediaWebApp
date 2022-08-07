import React from "react";
import { useSelector } from "react-redux";
import classes from "../../styles/stylesheets/PostCard.module.css";

const PostCard = () => {
	const { user } = useSelector((state) => state.user);
	return (
		<div className={classes.postCard}>
			<div className={classes.header}>
				<img
					src={user?.picture}
					alt={user?.firstName}
					className="profileImage"
				/>
				<input
					type="text"
					placeholder={`What's happening ${user?.firstName}?`}
					className={`input ${classes.postInput}`}
				/>
			</div>
		</div>
	);
};

export default PostCard;
