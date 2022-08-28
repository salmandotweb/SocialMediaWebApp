import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/global/Header";
import Post from "../components/home/Post";
import PostCard from "../components/home/PostCard";
import Cover from "../components/profile/Cover";
import Friends from "../components/profile/Friends";
import Photos from "../components/profile/Photos";
import ProfileInfo from "../components/profile/ProfileInfo";
import { profileReducer } from "../helpers/reducers";
import classes from "../styles/Profile.module.css";

const Profile = () => {
	const { username } = useParams();
	const { user } = useSelector((state) => state.user);
	const [photos, setPhotos] = useState({});
	const navigate = useNavigate();

	let userName = username === undefined ? user.username : username;
	let profileVisitor = userName === user.username ? false : true;

	const path = `${userName}/*`;
	const max = 30;
	const sort = "desc";

	const [{ loading, profile, error }, dispatch] = useReducer(profileReducer, {
		loading: false,
		profile: [],
		error: "",
	});

	useEffect(() => {
		getProfile();
	}, [userName]);

	const getProfile = async () => {
		try {
			dispatch({
				type: "PROFILE_REQUEST",
				loading: true,
			});
			const { data } = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/getProfile/${userName}`,
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			if (data.ok === false) {
				navigate(`/profile`);
			} else {
				try {
					const images = await axios.post(
						`${process.env.REACT_APP_BASE_URL}/images`,
						{
							path,
							sort,
							max,
						},
						{
							headers: {
								Authorization: `Bearer ${user.token}`,
							},
						}
					);
					setPhotos(images.data);
				} catch (error) {
					console.log(error);
				}
				dispatch({
					type: "PROFILE_SUCCESS",
					loading: false,
					payload: data,
				});
			}
		} catch (error) {
			dispatch({
				type: "PROFILE_ERROR",
				loading: false,
				payload: error.response.data.message,
			});
		}
	};

	return (
		<>
			<Header />
			<div className={classes.profilePage}>
				<Cover profileVisitor={profileVisitor} profile={profile} />
				<ProfileInfo
					profileVisitor={profileVisitor}
					profile={profile}
					photos={photos.resources}
					loading={loading}
				/>
				<div className={classes.profileCardsContainer}>
					<div className={classes.left}>
						<Photos username={userName} photos={photos} />
						<Friends friends={profile?.friends} />
					</div>
					<div className={classes.right}>
						{!profileVisitor && <PostCard />}
						<div className={classes.postContainer}>
							{profile.userPosts && profile.userPosts.length ? (
								profile?.userPosts?.map((post) => (
									<Post key={post?._id} post={post} />
								))
							) : (
								<>
									<p className={classes.noPosts}>No posts available</p>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
