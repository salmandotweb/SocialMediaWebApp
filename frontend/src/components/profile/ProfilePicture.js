import React, { useRef, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import classes from "../../styles/ProfilePicture.module.css";
import UpdateProfilePicture from "./UpdateProfilePicture";

const ProfilePicture = ({ setShow }) => {
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
			</div>
			{image && (
				<UpdateProfilePicture
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
