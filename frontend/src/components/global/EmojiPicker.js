import React, { useEffect, useRef, useState } from "react";
import { GrEmoji } from "react-icons/gr";
import Picker from "emoji-picker-react";
import classes from "../../styles/CreatePostModal.module.css";

const EmojiPicker = ({ postText, setPostText, user, custom }) => {
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [cursorPosition, setCursorPosition] = useState();
	const textref = useRef(null);

	const onEmojiClick = (e, { emoji }) => {
		const ref = textref.current;
		ref.focus();

		const start = postText.substring(0, ref.selectionStart);
		const end = postText.substring(ref.selectionStart);
		const newText = start + emoji + end;
		setPostText(newText);
		setCursorPosition(start.length + emoji.length);
	};

	useEffect(() => {
		textref.current.selectionEnd = cursorPosition;
	}, [cursorPosition]);

	return (
		<>
			<div className={custom ? `customModalBody ${classes.modalBody}` : ""}>
				<textarea
					name="textarea"
					ref={textref}
					value={postText}
					onChange={(e) => setPostText(e.target.value)}
					cols="30"
					rows={custom ? "2" : "5"}
					maxLength="150"
					placeholder={`What's on your mind, ${user?.firstName}`}></textarea>
				<div className="emojiPickerWrapper">
					{showEmojiPicker && (
						<div className="emojiPicker">
							<Picker onEmojiClick={onEmojiClick} />
						</div>
					)}
				</div>
				<div className={classes.postBackgroundOptions}>
					{!custom && <img src="/icons/colorful.png" alt="" />}
					<GrEmoji onClick={() => setShowEmojiPicker((prev) => !prev)} />
				</div>
			</div>
		</>
	);
};

export default EmojiPicker;
