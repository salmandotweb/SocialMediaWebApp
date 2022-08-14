import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../inputs/LoginInput";
import BeatLoader from "react-spinners/BeatLoader";
import classes from "../../styles/ResetPassword.module.css";
import axios from "axios";

const SearchAccount = ({
	email,
	setEmail,
	emailSearchSchema,
	error,
	setError,
	setUserInfo,
	setShowCard,
}) => {
	const [loading, setLoading] = useState(false);
	const handleEmailSearch = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/findUser`,
				{
					email,
				}
			);
			setError("");
			setLoading(false);
			setUserInfo(data);
			setShowCard(1);
		} catch (err) {
			setLoading(false);
			setError(err.response.data.message);
		}
	};

	return (
		<div className={classes.forgetPasswordCard}>
			<h1>Find your account</h1>
			<p>Please enter your email address to search for your account.</p>
			<Formik
				enableReinitialize
				initialValues={{ email }}
				validationSchema={emailSearchSchema}
				onSubmit={handleEmailSearch}>
				{(formik) => {
					return (
						<Form>
							<LoginInput
								name="email"
								type="email"
								placeholder="Enter your email address"
								onChange={(e) => setEmail(e.target.value)}
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
										"Search"
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

export default SearchAccount;
