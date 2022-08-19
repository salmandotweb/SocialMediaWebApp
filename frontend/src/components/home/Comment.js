import React, { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";
import { useSelector } from "react-redux";
import classes from "../../styles/Post.module.css";
import useClickOutside from "../../customHooks/useClickOutside";
import { FiImage } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

const Comment = () => {
	const { user } = useSelector((state) => state.user);
	const textref = useRef(null);
	const emojiRef = useRef(null);
	const imageInput = useRef(null);
	const [cursorPosition, setCursorPosition] = useState();
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [error, setError] = useState("");
	const [commentImage, setCommentImage] = useState("");
	const [comment, setComment] = useState("");

	useClickOutside(emojiRef, () => setShowEmojiPicker(false));

	const onEmojiClick = (e, { emoji }) => {
		const ref = textref.current;
		ref.focus();

		const start = comment.substring(0, ref.selectionStart);
		const end = comment.substring(ref.selectionStart);
		const newText = start + emoji + end;
		setComment(newText);
		setCursorPosition(start.length + emoji.length);
	};

	useEffect(() => {
		textref.current.selectionEnd = cursorPosition;
	}, [cursorPosition]);

	const emojiContainerHandler = () => {
		setShowEmojiPicker((prev) => !prev);
	};

	const handleImage = (e) => {
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
			setCommentImage(e.target.result);
		};
	};

	return (
		<>
			{error && <div className={`error ${classes.commentError}`}>{error}</div>}
			<div className={classes.loggedUserOptions}>
				<img
					src={user?.picture}
					alt={user?.firstName}
					className="profileImage"
				/>
				<div className={classes.loggedUserComment}>
					<input
						type="text"
						placeholder="Write a comment..."
						className="input"
						ref={textref}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<GrEmoji onClick={emojiContainerHandler} />
					{showEmojiPicker && (
						<div
							className={`emojiPicker ${classes.commentEmojiPicker}`}
							ref={emojiRef}>
							<Picker onEmojiClick={onEmojiClick} />
						</div>
					)}
					<input
						type="file"
						hidden
						ref={imageInput}
						accept="image/jpeg, image/png, image/gif, image/webp, image/jpg"
						onChange={handleImage}
					/>
					<FiImage onClick={() => imageInput.current.click()} />
				</div>
				<button className="btn">
					<img src="/images/sendBtn.png" alt="icon" className="svgIcon" />
				</button>
			</div>
			{commentImage && (
				<div className={classes.commentImage}>
					<div
						className={classes.closeIcon}
						onClick={() => setCommentImage("")}>
						<FaTimes />
					</div>
					<img src={commentImage} alt="commentImage" />
				</div>
			)}
		</>
	);
};

export default Comment;
