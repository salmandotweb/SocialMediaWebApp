import React from "react";
import { useSelector } from "react-redux";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoEarthSharp } from "react-icons/io5";
import Moment from "react-moment";
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
						{post?.type === null ? (
							<h3>{`${user?.firstName} ${user?.lastName}`}</h3>
						) : (
							""
						)}
						{post?.type === "profilePicture" ? (
							<div className={classes.updated}>
								<h3>{`${user?.firstName} ${user?.lastName}`}</h3>
								<p>{`has updated ${
									post?.user.gender === "male" ? "his" : "her"
								} profile picture.`}</p>
							</div>
						) : (
							""
						)}
						{post?.type === "coverPicture" ? (
							<div className={classes.updated}>
								<h3>{`${user?.firstName} ${user?.lastName}`}</h3>
								<p>{`has updated ${
									post?.user.gender === "male" ? "his" : "her"
								} cover photo.`}</p>
							</div>
						) : (
							""
						)}
						<p className={classes.date}>
							<IoEarthSharp />
							{
								<Moment fromNow interval={30}>
									{post?.createdAt}
								</Moment>
							}
						</p>
					</div>
				</div>
				<div className={classes.postHeaderRight}>
					<BiDotsHorizontalRounded />
				</div>
			</div>
			<div className={classes.postBody}>
				{post?.background ? (
					<>
						<div
							className={classes.postBackground}
							style={{
								backgroundImage: `url(${post?.background})`,
							}}>
							{post?.text}
						</div>
					</>
				) : (
					<>
						{post?.text && <p>{post?.text}</p>}
						{post?.images && post?.images.length && (
							<div
								className={
									post?.images.length === 1
										? classes.postImage
										: post?.images.length === 2
										? classes.postImage2
										: post?.images.length === 3
										? classes.postImage3
										: post?.images.length === 4
										? classes.postImage4
										: post?.images.length >= 5 && classes.postImage5
								}>
								{post?.images.slice(0, 4).map((image, index) => (
									<img src={image.url} key={index} />
								))}
								{post?.images.length > 4 && (
									<div className={classes.moreImages}>
										<p className={classes.number}>+{post?.images.length - 4}</p>
										<img src={post?.images[4].url} />
									</div>
								)}
							</div>
						)}
					</>
				)}
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
