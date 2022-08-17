import React from "react";
import { TiTick } from "react-icons/ti";
import classes from "../../styles/SuccessCard.module.css";

const SuccessCard = ({ text }) => {
	return (
		<div className={classes.successCard}>
			<p>{text}</p>
			<TiTick className={`success ${classes.successIcon}`} />
		</div>
	);
};

export default SuccessCard;
