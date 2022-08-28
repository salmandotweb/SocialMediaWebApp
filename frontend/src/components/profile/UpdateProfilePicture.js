import React, { useCallback, useRef, useState } from "react";
import axios from "axios";
import Cropper from "react-easy-crop";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import getCroppedImg from "../../helpers/CroppedImage";
import { useDispatch, useSelector } from "react-redux";
import classes from "../../styles/ProfilePicture.module.css";
import { uploadImages } from "../../helpers/uploadImages";
import BeatLoader from "react-spinners/BeatLoader";
import Cookies from "js-cookie";

const UpdateProfilePicture = ({
	image,
	setImage,
	setError,
	setShow,
	profilePictureRef,
}) => {
	const [caption, setCaption] = useState("");
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [loading, setLoading] = useState(false);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const { user } = useSelector((state) => state.user);
	const sliderRef = useRef();
	const dispatch = useDispatch();

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedAreaPixels(croppedAreaPixels);
	}, []);

	const zoomIn = () => {
		sliderRef.current.stepUp();
		setZoom(sliderRef.current.value);
	};
	const zoomOut = () => {
		sliderRef.current.stepDown();
		setZoom(sliderRef.current.value);
	};
	const getCroppedImage = useCallback(
		async (show) => {
			try {
				const croppedImage = await getCroppedImg(image, croppedAreaPixels);
				if (show) {
					setZoom(1);
					setCrop({ x: 0, y: 0 });
					setImage(croppedImage);
				} else {
					return croppedImage;
				}
			} catch (error) {
				console.log(error);
			}
		},
		[croppedAreaPixels]
	);

	const updateProfilePicture = async () => {
		try {
			setLoading(true);
			let image = await getCroppedImage();
			let blob = await fetch(image).then((b) => b.blob());
			const path = `${user.username}/profilePictures`;
			let formData = new FormData();
			formData.append("file", blob);
			formData.append("path", path);
			// uploading profile picture
			const res = await uploadImages(user.token, path, formData);
			// updating profile picture
			const updatePicture = await axios.put(
				`
				${process.env.REACT_APP_BASE_URL}/updateProfilePicture`,
				{
					url: res[0].url,
				},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			// creating profile picture updated post
			const response = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/createPost`,
				{
					type: "profilePicture",
					text: caption,
					images: res,
					user: user.id,
					background: null,
				},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);

			if (response.status === 200) {
				setLoading(false);
				setImage("");
				profilePictureRef.current.src = res[0].url;
				Cookies.set(
					"user",
					JSON.stringify({
						...user,
						picture: res[0].url,
					})
				);
				dispatch({
					type: "updateProfilePicture",
					payload: res[0].url,
				});
				setShow(false);
			} else {
				setLoading(false);
				setError(response.statusText);
			}
		} catch (error) {
			setLoading(false);
			setError(error);
		}
	};

	return (
		<div className={classes.profilePictureContainer}>
			<div className={classes.header}>
				<h2>Update Profile Picture</h2>
				<div className={classes.close} onClick={() => setImage("")}>
					<FaTimes />
				</div>
			</div>
			<div className={classes.caption}>
				<textarea
					placeholder="Caption"
					value={caption}
					onChange={(e) => setCaption(e.target.value)}></textarea>
			</div>
			<div className={classes.croper}>
				<Cropper
					image={image}
					crop={crop}
					zoom={zoom}
					aspect={1 / 1}
					cropShape="round"
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
				/>
			</div>
			<div className={classes.slider}>
				<div className={classes.left} onClick={zoomOut}>
					<FaMinus />
				</div>
				<input
					type="range"
					min={1}
					max={3}
					step={0.1}
					value={zoom}
					ref={sliderRef}
					onChange={(e) => setZoom(e.target.value)}
				/>
				<div className={classes.right} onClick={zoomIn}>
					<FaPlus />
				</div>
			</div>
			<div className={classes.buttonsContainer}>
				<button className="btn" onClick={() => setImage("")}>
					Cancel
				</button>
				<button
					disabled={loading}
					className="btn"
					onClick={updateProfilePicture}>
					{loading ? (
						<BeatLoader color="#fff" loading={loading} size={5} />
					) : (
						"Save"
					)}
				</button>
			</div>
		</div>
	);
};

export default UpdateProfilePicture;
