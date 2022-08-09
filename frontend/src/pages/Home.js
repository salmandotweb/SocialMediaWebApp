import React from "react";
import Post from "../components/home/Post";
import PostCard from "../components/home/PostCard";
import classes from "../styles/Home.module.css";

const Home = ({ children }) => {
	return (
		<div className={classes.feedContainer}>
			{children}
			<PostCard />
			<div className={classes.postsContainer}>
				<Post />
				<Post />
				<Post />
				<Post />
			</div>
		</div>
	);
};

export default Home;
