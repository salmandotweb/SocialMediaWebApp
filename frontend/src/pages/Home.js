import React from "react";
import Post from "../components/home/Post";
import PostCard from "../components/home/PostCard";
import Stories from "../components/home/Stories";
import classes from "../styles/Home.module.css";

const Home = ({ children, posts }) => {
	return (
		<div className={classes.feedContainer}>
			{children}
			<Stories />
			<PostCard />
			<div className={classes.postsContainer}>
				{posts?.map((post) => (
					<Post key={post?._id} post={post} />
				))}
			</div>
		</div>
	);
};

export default Home;
