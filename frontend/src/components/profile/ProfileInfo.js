import React, { useRef, useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import BeatLoader from "react-spinners/BeatLoader";
import classes from "../../styles/Profile.module.css";
import ProfilePicture from "./ProfilePicture";

const ProfileInfo = ({ profileVisitor, profile, photos, loading }) => {
	const [show, setShow] = useState(false);
	const profilePictureRef = useRef(null);
	const friends = profile?.friends?.length;
	const followers = profile?.followers?.length;
	return (
		<>
			<div className={classes.profileInfo}>
				{loading ? (
					<div className={classes.profileImage}>
						<img
							src="https://media.istockphoto.com/vectors/profile-placeholder-image-gray-silhouette-no-photo-vector-id1016744034?k=20&m=1016744034&s=612x612&w=0&h=kjCAwH5GOC3n3YRTHBaLDsLIuF8P3kkAJc9RvfiYWBY="
							alt=""
							ref={profilePictureRef}
						/>
						{!profileVisitor && (
							<div
								className={classes.editProfileImage}
								onClick={() => setShow(true)}>
								<BsFillCameraFill />
							</div>
						)}
					</div>
				) : (
					<>
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
					</>
				)}
				<div className={classes.profileDetails}>
					{loading ? (
						<BeatLoader color="#fff" loading={loading} size={10} />
					) : (
						<>
							<h1>{`${profile?.firstName} ${profile?.lastName}`}</h1>
							<div>
								<p>{`${friends} friends`}</p>
								<p>{`${followers} followers`}</p>
							</div>
						</>
					)}
				</div>
			</div>
			{show && (
				<ProfilePicture
					show={show}
					setShow={setShow}
					profilePictureRef={profilePictureRef}
					photos={photos}
				/>
			)}
		</>
	);
};

export default ProfileInfo;
