import React, { useRef, useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import { HiOutlineUpload } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlineInsertPhoto } from "react-icons/md";
import useClickOutside from "../../customHooks/useClickOutside";
import classes from "../../styles/Profile.module.css";

const Cover = ({ profile, profileVisitor }) => {
	const [showEditButtons, setShowEditButtons] = useState(false);
	const editButtonsRef = useRef(null);
	useClickOutside(editButtonsRef, () => setShowEditButtons(false));
	return (
		<div className={classes.cover}>
			{profile?.cover && (
				<img
					src="https://scontent.flhe2-4.fna.fbcdn.net/v/t39.30808-6/297826874_799386994423436_957691319378267791_n.jpg?stp=dst-jpg_s960x960&_nc_cat=110&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeFCd1M60xyxXJbhyTKBVoYUtaxtBwz52Ne1rG0HDPnY1zjkK6ubeVQviQKi1FxrY2z-hbK6gVN_F0GoAPkH0AJ_&_nc_ohc=L3ZkOROqEH8AX_5q7Yx&_nc_zt=23&_nc_ht=scontent.flhe2-4.fna&oh=00_AT-7GwtUauveqtXASn7Dgw5shDsHyy0TfDolmt5iAXzhjg&oe=6309E9D4"
					alt=""
				/>
			)}
			{!profileVisitor && (
				<div className={classes.editCoverContainer}>
					<button
						className="btn"
						onClick={() => setShowEditButtons(!showEditButtons)}>
						<AiFillCamera />
						Edit Cover Photo
					</button>
					{showEditButtons && (
						<div className={classes.editCoverOptions} ref={editButtonsRef}>
							<button className="btn">
								<MdOutlineInsertPhoto />
								Edit Image
							</button>
							<button className="btn">
								<HiOutlineUpload />
								Upload Photo
							</button>
							<button className="btn">
								<IoTrashOutline />
								Remove
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Cover;
