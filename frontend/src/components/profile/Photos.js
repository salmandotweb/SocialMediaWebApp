import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { photosReducer } from "../../helpers/reducers";
import classes from "../../styles/Profile.module.css";

const Photos = ({ username }) => {
	const { user } = useSelector((state) => state.user);
	const [{ loading, photos, error }, dispatch] = useReducer(photosReducer, {
		loading: false,
		photos: {},
		error: "",
	});

	useEffect(() => {
		getPhotos();
	}, [username]);

	const path = `${username}/*`;
	const max = 30;
	const sort = "desc";

	const getPhotos = async () => {
		try {
			dispatch({
				type: "PHOTOS_REQUEST",
			});
			const { data } = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/images`,
				{
					path,
					sort,
					max,
				},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			dispatch({
				type: "PHOTOS_SUCCESS",
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: "PHOTOS_ERROR",
				payload: error.response.data.message,
			});
		}
	};
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
