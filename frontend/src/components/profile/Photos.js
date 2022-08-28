import React from "react";
import classes from "../../styles/Profile.module.css";

const Photos = ({ photos }) => {
	return (
		<div className={classes.leftCards}>
			<div className={classes.leftCardsHeader}>
				<h3>Photos</h3>
				<p>
					{photos?.total_count === 0
						? "0 Photos"
						: photos?.total_count === 1
						? "1 Photo"
						: `${photos?.total_count} Photos`}
				</p>
			</div>
			<div className={classes.leftCardsPhotosContainer}>
				{photos?.resources && photos?.resources?.length ? (
					photos?.resources
						?.slice(0, 9)
						.map((photo) => (
							<img key={photos?.resources?.created_at} src={photo.url} alt="" />
						))
				) : (
					<p className="noData">No Photos Available</p>
				)}
			</div>
		</div>
	);
};

export default Photos;
