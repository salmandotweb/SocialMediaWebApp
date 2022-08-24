import React from "react";
import { BsFillCameraFill } from "react-icons/bs";
import classes from "../../styles/Profile.module.css";

const ProfileInfo = ({ profileVisitor, profile }) => {
	const friends = profile?.friends?.length;
	const followers = profile?.followers?.length;
	return (
		<div className={classes.profileInfo}>
			<div className={classes.profileImage}>
				<img src={profile?.picture} alt="" />
				{!profileVisitor && (
					<div className={classes.editProfileImage}>
						<BsFillCameraFill />
					</div>
				)}
			</div>
			<div className={classes.profileDetails}>
				<h1>{`${profile?.firstName} ${profile?.lastName}`}</h1>
				<div>
					<p>{`${friends} friends`}</p>
					<p>{`${followers} followers`}</p>
				</div>
			</div>
		</div>
	);
};

export default ProfileInfo;
