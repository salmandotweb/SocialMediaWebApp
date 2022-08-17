import React, { useRef } from "react";
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
}) => {
	const uploadImageRef = useRef(null);
	const handleImages = (e) => {
		let files = Array.from(e.target.files);
		files.forEach((file) => {
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
			/>
			<div className={classes.uploadImageContainer}>
				<input
					type="file"
					multiple
					hidden
					accept="image/*"
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
		</div>
	);
};

export default UploadImage;
