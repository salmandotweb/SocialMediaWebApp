import { Form, Formik } from "formik";
import React, { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoginInput from "../components/inputs/LoginInput";
import headerClasses from "../styles/Header.module.css";
import classes from "../styles/ResetPassword.module.css";

const ResetPassword = () => {
	const { user } = useSelector((state) => state.user);
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	return (
		<>
			<div className={headerClasses.header}>
				<div className={headerClasses.left}>
					<Link to="/">
						<div className={classes.backArrow}>
							<HiArrowLeft />
						</div>
					</Link>
				</div>
				<div className={headerClasses.right}>
					{user ? (
						<div className={headerClasses.profile}>
							<h3>
								<span>{user?.firstName}</span>
								{user?.lastName}
							</h3>
							<img
								src={user?.picture}
								alt={user?.firstName}
								className="profileImage"
							/>
						</div>
					) : (
						""
					)}
				</div>
			</div>
			<div className={classes.forgetPasswordPage}>
				<div className={classes.forgetPasswordCard}>
					<h1>Find your account</h1>
					<p>Please enter your email address to search for your account.</p>
					<Formik enableReinitialize initialValues={{ email }}>
						{(formik) => {
							return (
								<Form>
									<LoginInput
										htmlFor="email"
										name="email"
										type="email"
										placeholder="Enter your email address"
										onchange={(e) => setEmail(e.target.value)}
									/>
									<div className={classes.buttonsContainer}>
										<Link to="/">
											<button
												type="submit"
												className={`btn ${classes.cancelBtn}`}>
												Cancel
											</button>
										</Link>
										<button type="submit" className="btn">
											Search
										</button>
									</div>
								</Form>
							);
						}}
					</Formik>
					{error && <p className={`error ${classes.error}`}>{error}</p>}
				</div>
			</div>
		</>
	);
};

export default ResetPassword;
