import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GiEarthAmerica } from "react-icons/gi";
import { useSelector } from "react-redux";
import classes from "../../styles/CreatePostModal.module.css";
import AddToPost from "./AddToPost";
import EmojiPicker from "./EmojiPicker";
import UploadImage from "./UploadImage";

const CreatePostModal = ({ setShowPostModal }) => {
	const { user } = useSelector((state) => state.user);
	const [postText, setPostText] = useState("");
	const [showPreview, setShowPreview] = useState(true);
	const [images, setImages] = useState([]);

	console.log(images);

	const handleShow = () => {
		setShowPostModal(false);
	};

	return (
		<>
			<div className={classes.overlay} onClick={handleShow}></div>
			<div className={classes.createPostModal}>
				<div className={classes.header}>
					<h2>Create Post</h2>
					<button className={classes.closeBtn} onClick={handleShow}>
						<FaTimes />
					</button>
				</div>

				<div className={classes.profile}>
					<img src={user?.picture} alt="" className="profileImage" />
					<div>
						<h4>{`${user?.firstName} ${user?.lastName}`}</h4>
						<p>
							<GiEarthAmerica />
							Everyone
						</p>
					</div>
				</div>
				{!showPreview ? (
					<>
						<EmojiPicker
							postText={postText}
							setPostText={setPostText}
							user={user}
						/>
					</>
				) : (
					<UploadImage
						postText={postText}
						setPostText={setPostText}
						user={user}
						custom={true}
						images={images}
						setImages={setImages}
					/>
				)}
				<AddToPost />
				<button className={`btn ${classes.postBtn}`}>Post</button>
			</div>
		</>
	);
};

export default CreatePostModal;
