import React from "react";
import classes from "../../styles/CreatePostModal.module.css";
import EmojiPicker from "./EmojiPicker";

const UploadImage = ({ postText, setPostText, user, custom }) => {
	return (
		<div className={classes.uploadImage}>
			<EmojiPicker
				postText={postText}
				setPostText={setPostText}
				user={user}
				custom={custom}
			/>
		</div>
	);
};

export default UploadImage;
