import React, { useRef, useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import classes from "../../styles/Profile.module.css";
import ProfilePicture from "./ProfilePicture";

const ProfileInfo = ({ profileVisitor, profile }) => {
	const [show, setShow] = useState(false);
	const profilePictureRef = useRef(null);
	const friends = profile?.friends?.length;
	const followers = profile?.followers?.length;
	return (
		<>
			<div className={classes.profileInfo}>
				<div className={classes.profileImage}>
					<img src={profile?.picture} alt="" ref={profilePictureRef} />
					{!profileVisitor && (
						<div
							className={classes.editProfileImage}
							onClick={() => setShow(true)}>
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
			{show && (
				<ProfilePicture
					show={show}
					setShow={setShow}
					profilePictureRef={profilePictureRef}
				/>
			)}
		</>
	);
};

export default ProfileInfo;
