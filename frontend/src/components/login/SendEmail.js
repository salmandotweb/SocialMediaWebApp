import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import classes from "../../styles/ResetPassword.module.css";

const SendEmail = ({
	userInfo,
	setUserInfo,
	error,
	email,
	setError,
	setShowCard,
}) => {
	const [loading, setLoading] = useState(false);
	const handleSendEmail = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/sendResetCode`,
				{
					email,
				}
			);
			setError("");
			setLoading(false);
			setUserInfo(data);
			setShowCard(2);
		} catch (error) {
			setLoading(false);
			setError(error.response.data.message);
		}
	};
	return (
		<div className={classes.forgetPasswordCard}>
			<h1>Reset your password</h1>
			<p>
				A one time verification code will be send to this email to reset your
				password.
			</p>
			<div className={classes.accountEmail}>
				<div className={classes.left}>
					<input type="radio" id="email" defaultChecked={true} />
					<label htmlFor="email">
						Send code via email at {userInfo?.email}
					</label>
				</div>
				<div className={classes.right}>
					<img src={userInfo?.picture} alt="Image" className="profileImage" />
					<p>{userInfo?.email}</p>
				</div>
			</div>
			<div className={classes.buttonsContainer}>
				<Link to="/">
					<button type="submit" className={`btn ${classes.cancelBtn}`}>
						Not you?
					</button>
				</Link>
				{error && (
					<p className={`error ${classes.error} ${classes.searchAccountError}`}>
						{error}
					</p>
				)}
				<button onClick={handleSendEmail} className="btn">
					{loading ? (
						<BeatLoader color="#fff" loading={loading} size={10} />
					) : (
						"Continue"
					)}
				</button>
			</div>
		</div>
	);
};

export default SendEmail;
