import React from "react";
import { useRef } from "react";
import { BsBookmarkDash, BsPinAngle } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import useClickOutside from "../../customHooks/useClickOutside";
import classes from "../../styles/PostMenu.module.css";

const PostMenuOption = ({ option, icon }) => {
	return (
		<div className={classes.postMenuOption}>
			{icon}
			{option}
		</div>
	);
};

const PostMenu = ({ setShowMenu, images, userID, postUserID }) => {
	const menuRef = useRef(null);

	useClickOutside(menuRef, () => setShowMenu(false));
	return (
		<div className={classes.postMenu} ref={menuRef}>
			{userID === postUserID ? (
				<PostMenuOption option="Pin Post" icon={<BsPinAngle />} />
			) : (
				""
			)}
			<PostMenuOption option="Save Post" icon={<BsBookmarkDash />} />
			{images ? (
				<PostMenuOption option="Download" icon={<IoMdDownload />} />
			) : (
				""
			)}
		</div>
	);
};

export default PostMenu;
