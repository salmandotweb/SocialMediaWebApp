import React from "react";
import PostCard from "../components/home/PostCard";
import classes from "../styles/stylesheets/Home.module.css";

const Home = () => {
	return (
		<div className={classes.feedContainer}>
			<PostCard />
			<div className={classes.postsContainer}></div>
		</div>
	);
};

export default Home;
