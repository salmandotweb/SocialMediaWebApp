import React from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import classes from "../../styles/Stories.module.css";

const CreateStory = () => {
	const { user } = useSelector((state) => state.user);
	return (
		<div className={classes.CreateStoryContainer}>
			<img src={user.picture} alt="" />
			<div className={classes.plusBtn}>
				<FaPlus />
			</div>
		</div>
	);
};

const Story = () => {
	return (
		<div className={classes.story}>
			<img src="/images/default_profile.png" alt="" />
		</div>
	);
};

const Stories = () => {
	return (
		<div className={classes.storiesContainer}>
			<CreateStory />
			<Story />
			<Story />
			<Story />
			<Story />
			<Story />
			<Story />
			<Story />
			<Story />
			<Story />
			<Story />
			<Story />
		</div>
	);
};

export default Stories;
