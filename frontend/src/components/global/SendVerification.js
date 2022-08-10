import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import classes from "../../styles/SendVerification.module.css";

const SendVerification = () => {
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const { user } = useSelector((state) => state.user);
	const sendVerificationEmail = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/sendVerificationEmail`,
				{},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			setSuccess(data.message);
		} catch (error) {
			setError(error.response.data.message);
		}
	};
	return (
		<div className={classes.sendVerification}>
			Your account is not verified. Check your email to verify your account.
			<a onClick={sendVerificationEmail} href="/">
				Resend Verification Email
			</a>
			{error && <p className="error">{error}</p>}
			{success && <p className="success">{success}</p>}
		</div>
	);
};

export default SendVerification;
