import React from "react";
import Post from "../components/home/Post";
import PostCard from "../components/home/PostCard";
import Stories from "../components/home/Stories";
import classes from "../styles/Home.module.css";

const Home = ({ children }) => {
	return (
		<div className={classes.feedContainer}>
			{children}
			<Stories />
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
