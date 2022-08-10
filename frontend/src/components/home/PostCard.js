import React from "react";
import { useSelector } from "react-redux";
import { HiOutlineVideoCamera, HiOutlinePhotograph } from "react-icons/hi";
import { BsEmojiSmile } from "react-icons/bs";
import classes from "../../styles/PostCard.module.css";

const PostCard = () => {
	const { user } = useSelector((state) => state.user);
	return (
		<div className={classes.postCard}>
			<div className={classes.header}>
				<img
					src={user?.picture}
					alt={user?.firstName}
					className="profileImage"
				/>
				<input
					type="text"
					placeholder={`What's happening ${user?.firstName}?`}
					className={`input ${classes.postInput}`}
				/>
			</div>
			<div className={classes.options}>
				<div className={classes.optionBtns}>
					<button className={`btn ${classes.optionBtn}`}>
						<img src="/icons/live.png" alt="icon" className="svgIcon" /> Live
						Video
					</button>
					<button className={`btn ${classes.optionBtn}`}>
						<img src="/icons/gallery.png" alt="icon" className="svgIcon" />
						Photo/Video
					</button>
					<button className={`btn ${classes.optionBtn}`}>
						<img src="/icons/emoji.png" alt="icon" className="svgIcon" />
						Feeling
					</button>
				</div>
				<button className="btn">Post</button>
			</div>
		</div>
	);
};

export default PostCard;
