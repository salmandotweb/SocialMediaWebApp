import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { GiEarthAmerica } from "react-icons/gi";
import { useSelector } from "react-redux";
import classes from "../../styles/CreatePostModal.module.css";
import AddToPost from "./AddToPost";
import EmojiPicker from "./EmojiPicker";
import UploadImage from "./UploadImage";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";

const CreatePostModal = ({ setShowPostModal, setPostCreated }) => {
	const { user } = useSelector((state) => state.user);
	const [postText, setPostText] = useState("");
	const [showPreview, setShowPreview] = useState(false);
	const [images, setImages] = useState([]);
	const [background, setBackground] = useState("");
	const [loading, setLoading] = useState(false);

	const handleShow = () => {
		setShowPostModal(false);
	};

	const handlePostSubmit = async () => {
		try {
			if (background) {
				setLoading(true);
				const { data } = await axios.post(
					`${process.env.REACT_APP_BASE_URL}/createPost`,
					{
						type: null,
						text: postText,
						images: null,
						user: user.id,
						background: background,
					},
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				);
				setLoading(false);
				setPostCreated(true);
				setPostText("");
				setBackground("");
				setShowPostModal(false);
				setTimeout(() => {
					setPostCreated(false);
				}, 3000);
			}
		} catch (error) {
			setPostCreated(false);
			console.log(error);
		}
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
							background={background}
							setBackground={setBackground}
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
						setShowPreview={setShowPreview}
					/>
				)}
				<AddToPost setShowPreview={setShowPreview} />
				<button
					className={`btn ${classes.postBtn}`}
					onClick={handlePostSubmit}
					disabled={loading}>
					{loading ? (
						<BeatLoader color="#fff" loading={loading} size={10} />
					) : (
						"Post"
					)}
				</button>
			</div>
		</>
	);
};

export default CreatePostModal;
