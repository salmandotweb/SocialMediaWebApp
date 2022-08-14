import axios from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import * as Yup from "yup";
import classes from "../../styles/ResetPassword.module.css";
import LoginInput from "../inputs/LoginInput";

const ChangePassword = ({
	password,
	setPassword,
	confirmPassword,
	setConfirmPassword,
	error,
	setError,
	email,
}) => {
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState();
	const changePasswordSchema = Yup.object({
		password: Yup.string()
			.required(
				"Enter a conbination of at least six numbers, letters and punctuation marks (like ! and &)"
			)
			.min(6, "Password must be at least 8 characters")
			.max(20, "Password must be at most 20 characters"),

		confirmPassword: Yup.string()
			.required("Confirm Password is Required")
			.oneOf([Yup.ref("password"), null], "Passwords does not match"),
	});

	const handlePasswordChange = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/changePassword`,
				{
					email,
					password,
				}
			);
			setError("");
			setPassword("");
			setConfirmPassword("");
			setSuccess(data.message);
			setTimeout(() => {
				window.location.href = "/";
			}, 2000);
			setLoading(false);
		} catch (err) {
			setSuccess("");
			setLoading(false);
			setError(err.response.data.message);
		}
	};

	return (
		<div className={classes.forgetPasswordCard}>
			<h1>Change Password</h1>
			<p>Please enter a new password</p>
			<Formik
				enableReinitialize
				initialValues={{ password, confirmPassword }}
				validationSchema={changePasswordSchema}
				onSubmit={handlePasswordChange}>
				{(formik) => {
					return (
						<Form>
							<LoginInput
								name="password"
								type="text"
								placeholder="New Password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<LoginInput
								name="confirmPassword"
								type="text"
								placeholder="Confirm Password"
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
							{error && (
								<p
									className={`error ${classes.error} ${classes.searchAccountError}`}>
									{error}
								</p>
							)}
							{success && (
								<p className={`success ${classes.searchAccountError}`}>
									{`${success}, Redirecting...`}
								</p>
							)}
							<div className={classes.buttonsContainer}>
								<Link to="/">
									<button type="submit" className={`btn ${classes.cancelBtn}`}>
										Cancel
									</button>
								</Link>
								<button type="submit" className="btn">
									{loading ? (
										<BeatLoader color="#fff" loading={loading} size={10} />
									) : (
										"Save"
									)}
								</button>
							</div>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
};

export default ChangePassword;
