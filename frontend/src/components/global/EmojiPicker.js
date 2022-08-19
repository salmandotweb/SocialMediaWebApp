import React, { useEffect, useRef, useState } from "react";
import { GrEmoji } from "react-icons/gr";
import Picker from "emoji-picker-react";
import classes from "../../styles/CreatePostModal.module.css";
import useClickOutside from "../../customHooks/useClickOutside";

const EmojiPicker = ({
	postText,
	setPostText,
	user,
	custom,
	background,
	setBackground,
	showEmojiPicker,
	setShowEmojiPicker,
}) => {
	const [showBackgrounds, setshowBackgrounds] = useState(false);
	const [cursorPosition, setCursorPosition] = useState();
	const textref = useRef(null);
	const emojiRef = useRef(null);
	const backgroundref = useRef(null);

	useClickOutside(emojiRef, () => setShowEmojiPicker(false));

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

	const postBackgrounds = [
		"../../../images/postBackgrounds/1.jpg",
		"../../../images/postBackgrounds/2.jpg",
		"../../../images/postBackgrounds/3.jpg",
		"../../../images/postBackgrounds/4.jpg",
		"../../../images/postBackgrounds/5.jpg",
		"../../../images/postBackgrounds/6.jpg",
		"../../../images/postBackgrounds/7.jpg",
		"../../../images/postBackgrounds/8.jpg",
		"../../../images/postBackgrounds/9.jpg",
		"../../../images/postBackgrounds/10.jpg",
	];

	const backgroundHandler = (index) => {
		backgroundref.current.style.backgroundImage = `url(${postBackgrounds[index]})`;
		setBackground(postBackgrounds[index]);
		backgroundref.current.classList.add("backgroundStyling");
	};

	const removeBackground = () => {
		backgroundref.current.style.backgroundImage = "";
		setBackground("");
		backgroundref.current.classList.remove("backgroundStyling");
	};

	const emojiContainerHandler = () => {
		setShowEmojiPicker(!showEmojiPicker);
	};

	return (
		<>
			<div className={custom ? `customModalBody ${classes.modalBody}` : ""}>
				<div className={classes.textareaContainer} ref={backgroundref}>
					<textarea
						name="textarea"
						ref={textref}
						value={postText}
						onChange={(e) => setPostText(e.target.value)}
						cols="30"
						rows={custom ? "3" : "5"}
						maxLength="200"
						placeholder={`What's on your mind, ${user?.firstName}`}></textarea>
				</div>
				<div
					className={
						!custom ? "emojiPickerWrapper" : classes.emojiPickerWrapper
					}>
					{showEmojiPicker && (
						<div
							className={!custom ? "emojiPicker" : classes.emojiPicker}
							ref={emojiRef}>
							<Picker onEmojiClick={onEmojiClick} />
						</div>
					)}
				</div>
				<div className={classes.postBackgroundOptions}>
					{!custom && (
						<img
							src="/icons/colorful.png"
							alt=""
							onClick={() => setshowBackgrounds(!showBackgrounds)}
						/>
					)}
					{!custom && showBackgrounds && (
						<div className={classes.postBackgrounds}>
							<div
								className={classes.noneBackground}
								onClick={() => removeBackground()}></div>
							{postBackgrounds.map((background, index) => (
								<img
									src={background}
									key={index}
									alt=""
									onClick={() => backgroundHandler(index)}
								/>
							))}
						</div>
					)}

					<GrEmoji onClick={emojiContainerHandler} />
				</div>
			</div>
		</>
	);
};

export default EmojiPicker;
