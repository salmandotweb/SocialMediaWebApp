import React, { useRef, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import classes from "../../styles/ProfilePicture.module.css";
import UpdateProfilePicture from "./UpdateProfilePicture";

const ProfilePicture = ({ setShow, profilePictureRef, photos }) => {
	const { user } = useSelector((state) => state.user);
	const inputRef = useRef();
	const [error, setError] = useState("");
	const [image, setImage] = useState("");
	const handleImageChange = (e) => {
		let file = e.target.files[0];
		if (
			file.type !== "image/jpeg" &&
			file.type !== "image/png" &&
			file.type !== "image/jpg" &&
			file.type !== "image/gif" &&
			file.type !== "image/webp"
		) {
			setError("Please upload a valid image");
			return;
		} else if (file.size > 1024 * 1024 * 5) {
			setError("Image size should be less than 5MB");
			return;
		}
		setError("");
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			setImage(e.target.result);
		};
	};

	return (
		<>
			<div className={classes.overlay} onClick={() => setShow(false)}></div>
			<div className={classes.profilePictureContainer}>
				<input
					type="file"
					ref={inputRef}
					accept="image/jpeg, image/png, image/gif, image/webp, image/jpg"
					hidden
					onChange={handleImageChange}
				/>
				<div className={classes.header}>
					<h2>Update Profile Picture</h2>
					<div className={classes.close} onClick={() => setShow(false)}>
						<FaTimes />
					</div>
				</div>
				<div className={classes.uploadPhoto}>
					<button
						className={`btn ${classes.uploadBtn}`}
						onClick={() => inputRef.current.click()}>
						<FaPlus />
						Upload Photo
					</button>
				</div>
				{photos.length ? (
					<>
						<div className={classes.oldPicturesContainer}>
							<h4>Profile Pictures</h4>
							<div className={classes.photosContainer}>
								{photos
									.filter(
										(img) => img.folder === `${user.username}/profilePictures`
									)
									.slice(0, 10)
									.map((photo) => (
										<img
											src={photo.secure_url}
											key={photo.public_id}
											alt=""
											onClick={() => setImage(photo.secure_url)}
										/>
									))}
							</div>
						</div>

						<div className={classes.oldPicturesContainer}>
							<h4>Timeline Pictures</h4>
							<div className={classes.photosContainer}>
								{photos
									.filter(
										(img) => img.folder !== `${user.username}/profilePictures`
									)
									.slice(0, 10)
									.map((photo) => (
										<img
											src={photo.secure_url}
											key={photo.public_id}
											alt=""
											onClick={() => setImage(photo.secure_url)}
										/>
									))}
							</div>
						</div>
					</>
				) : (
					""
				)}
			</div>
			{image && (
				<UpdateProfilePicture
					profilePictureRef={profilePictureRef}
					image={image}
					setShow={setShow}
					setImage={setImage}
					setError={setError}
				/>
			)}
		</>
	);
};

export default ProfilePicture;
