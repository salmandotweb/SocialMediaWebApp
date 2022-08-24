import React from "react";
import classes from "../../styles/Profile.module.css";

const Friends = ({ friends }) => {
	return (
		<div className={classes.leftCards}>
			<div className={classes.leftCardsHeader}>
				<h3>Friends</h3>
				<p>{`${friends.length} friends`}</p>
			</div>
			<div className={classes.leftCardsPhotosContainer}>
				{friends && friends.length ? (
					friends?.slice(0, 9).map((photo) => <p>Friends</p>)
				) : (
					<p className="noData">No Friends Avalaible</p>
				)}
			</div>
		</div>
	);
};

export default Friends;
