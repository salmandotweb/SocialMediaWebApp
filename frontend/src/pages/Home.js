import React from "react";
import axios from "axios";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import Post from "../components/home/Post";
import PostCard from "../components/home/PostCard";
import Stories from "../components/home/Stories";
import classes from "../styles/Home.module.css";

function reducer(state, action) {
	switch (action.type) {
		case "POSTS_REQUEST":
			return {
				...state,
				loading: true,
				error: "",
			};
		case "POSTS_SUCCESS":
			return {
				...state,
				loading: false,
				posts: action.payload,
				error: "",
			};
		case "POSTS_ERROR":
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
}

const Home = ({ children }) => {
	const { user } = useSelector((state) => state.user);
	const [{ loading, posts, error }, dispatch] = useReducer(reducer, {
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

	console.log(posts);

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
