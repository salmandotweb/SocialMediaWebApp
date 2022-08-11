import React from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import classes from "../../styles/Stories.module.css";

const CreateStory = () => {
	const { user } = useSelector((state) => state.user);
	return (
		<div className={classes.CreateStoryContainer}>
			<img src={user.picture} alt="" />
			<div className={classes.createStory}>
				<div className={classes.createBtn}>
					<FaPlus />
				</div>
				<p>Create story</p>
			</div>
		</div>
	);
};

const Story = () => {
	return (
		<div className={classes.story}>
			<div className={classes.storyProfile}>
				<img src="/images/default_profile.png" alt="" />
			</div>
			<img src="/images/postBackgrounds/10.jpg" alt="" />
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
		</div>
	);
};

export default Stories;
