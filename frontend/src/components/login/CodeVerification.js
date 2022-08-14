import axios from "axios";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import * as Yup from "yup";
import classes from "../../styles/ResetPassword.module.css";
import LoginInput from "../inputs/LoginInput";

const CodeVerification = ({
	email,
	code,
	setCode,
	error,
	setError,
	setShowCard,
}) => {
	const [loading, setLoading] = useState(false);
	const validateCode = Yup.object({
		code: Yup.string()
			.required("Code is required")
			.min(6, "Code must be 6 characters long")
			.max(6, "Code must be 6 characters long"),
	});
	const verifyCode = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/validateResetCode`,
				{
					email,
					code,
				}
			);
			setError("");
			setLoading(false);
			setShowCard(3);
		} catch (err) {
			setLoading(false);
			setError(err.response.data.message);
		}
	};
	return (
		<div className={classes.forgetPasswordCard}>
			<h1>Code Verification</h1>
			<p>Please enter the code that has been sent to your email.</p>
			<Formik
				enableReinitialize
				initialValues={{ code }}
				validationSchema={validateCode}
				onSubmit={verifyCode}>
				{(formik) => {
					return (
						<Form>
							<LoginInput
								name="code"
								type="text"
								placeholder="Enter the code"
								onChange={(e) => setCode(e.target.value)}
							/>
							{error && (
								<p
									className={`error ${classes.error} ${classes.searchAccountError}`}>
									{error}
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
										"Continue"
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

export default CodeVerification;
