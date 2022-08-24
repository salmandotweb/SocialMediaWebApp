import React from "react";
import axios from "axios";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import Post from "../components/home/Post";
import PostCard from "../components/home/PostCard";
import Stories from "../components/home/Stories";
import classes from "../styles/Home.module.css";
import { postReducer } from "../helpers/reducers";

const Home = ({ children }) => {
	const { user } = useSelector((state) => state.user);
	const [{ loading, posts, error }, dispatch] = useReducer(postReducer, {
		loading: false,
		posts: [],
		error: "",
	});

	const getAllPosts = async () => {
		try {
			dispatch({
				type: "POSTS_REQUEST",
			});
			const { data } = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/allPosts`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			dispatch({
				type: "POSTS_SUCCESS",
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: "POSTS_ERROR",
				payload: error.response.data.message,
			});
		}
	};

	useEffect(() => {
		getAllPosts();
	}, []);

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
