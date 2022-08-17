import React, { useRef, useState } from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import classes from "../../styles/CreatePostModal.module.css";
import EmojiPicker from "./EmojiPicker";

const UploadImage = ({
	postText,
	setPostText,
	user,
	custom,
	images,
	setImages,
	setShowPreview,
	showEmojiPicker,
	setShowEmojiPicker,
}) => {
	const uploadImageRef = useRef(null);
	const [error, setError] = useState({
		message: "",
		status: false,
	});
	const handleImages = (e) => {
		let files = Array.from(e.target.files);
		files.forEach((file) => {
			if (
				file.type !== "image/jpeg" &&
				file.type !== "image/png" &&
				file.type !== "image/jpg" &&
				file.type !== "image/gif" &&
				file.type !== "image/webp"
			) {
				setError({
					message: "Please upload a valid image*",
				});
				files = files.filter((f) => f !== file);
				return;
			} else if (file.size > 1024 * 1024 * 5) {
				setError({
					message: `Please upload a image less than 5MB, ${
						file.name
					} is ${Math.round(file.size / (1024 * 1024))}MB`,
				});
				return;
			}
			setError({
				message: "",
			});
			let reader = new FileReader();
			reader.onload = (e) => {
				setImages((images) => [...images, e.target.result]);
			};
			reader.readAsDataURL(file);
		});
	};
	return (
		<div className={classes.uploadImage}>
			<EmojiPicker
				postText={postText}
				setPostText={setPostText}
				user={user}
				custom={custom}
				showEmojiPicker={showEmojiPicker}
				setShowEmojiPicker={setShowEmojiPicker}
			/>
			<div className={classes.uploadImageContainer}>
				<input
					type="file"
					multiple
					hidden
					accept="image/jpeg, image/png, image/gif, image/jpg, image/webp"
					ref={uploadImageRef}
					onChange={handleImages}
				/>
				{images && images.length ? (
					<div className={classes.addImages}>
						<div className="closeBtn" onClick={() => setImages([])}>
							<FaTimes />
						</div>
						<div
							className={`${classes.addIcon} ${classes.addMoreImages}`}
							onClick={() => uploadImageRef.current.click()}>
							<MdAddPhotoAlternate />
						</div>
						<div
							className={
								images.length === 1
									? classes.images
									: images.length === 2
									? classes.images2
									: images.length === 3
									? classes.images3
									: images.length === 4
									? classes.images4
									: images.length === 5
									? classes.images5
									: images.length % 2 === 0
									? classes.images6
									: classes.images6 + " " + classes.images7
							}>
							{images.map((image, index) => (
								<img key={index} src={image} alt="" />
							))}
						</div>
					</div>
				) : (
					<>
						<div className={classes.addImages}>
							<div className="closeBtn" onClick={() => setShowPreview(false)}>
								<FaTimes />
							</div>
							<div
								className={classes.addIcon}
								onClick={() => uploadImageRef.current.click()}>
								<MdAddPhotoAlternate />
							</div>
							<h3>Add Photos/Videos</h3>
							<p>on drag and drop</p>
						</div>
					</>
				)}
			</div>
			{error && <p className="error">{error.message}</p>}
		</div>
	);
};

export default UploadImage;
