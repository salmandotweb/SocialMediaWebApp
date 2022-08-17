import React from "react";
import { useSelector } from "react-redux";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import classes from "../../styles/Post.module.css";

const Post = ({ post }) => {
	const { user } = useSelector((state) => state.user);
	return (
		<div className={classes.postContainer}>
			<div className={classes.postHeader}>
				<div className={classes.postHeaderLeft}>
					<img
						src={user?.picture}
						alt={user?.firstName}
						className={`profileImage ${classes.profileImage}`}
					/>
					<div className={classes.postUserDetails}>
						<h3>{`${user?.firstName} ${user?.lastName}`}</h3>
						<p>15h, Public</p>
					</div>
				</div>
				<div className={classes.postHeaderRight}>
					<BiDotsHorizontalRounded />
				</div>
			</div>
			<div className={classes.postBody}>
				<p>{post?.text}</p>
				<img
					src="https://images.pexels.com/photos/2238318/pexels-photo-2238318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
					alt=""
					className={classes.postImage}
				/>
			</div>
			<div className={classes.postFooter}>
				<div className={classes.postFooterLeft}>
					<div className={classes.postReactions}>
						<img src="/reacts/like.svg" alt="" />
						<img src="/reacts/love.svg" alt="" />
						<img src="/reacts/heart.svg" alt="" />
					</div>
				</div>
				<div className={classes.postFooterRight}>
					<p>3 Comments</p>
					<p>17 Shares</p>
				</div>
			</div>
			<div className={classes.postOptions}>
				<button className={`btn ${classes.postOption}`}>
					<img src="/images/likeBtn.png" alt="icon" className="optionsIcon" />
					Like
				</button>
				<button className={`btn ${classes.postOption}`}>
					<img
						src="/images/commentsBtn.png"
						alt="icon"
						className="optionsIcon"
					/>
					Comments
				</button>
				<button className={`btn ${classes.postOption}`}>
					<img src="/images/shareBtn.png" alt="icon" className="optionsIcon" />
					Share
				</button>
			</div>
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
					/>
				</div>
				<button className="btn">
					<img src="/images/sendBtn.png" alt="icon" className="svgIcon" />
				</button>
			</div>
		</div>
	);
};

export default Post;
