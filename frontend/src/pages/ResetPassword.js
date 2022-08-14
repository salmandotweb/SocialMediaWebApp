import React, { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import ChangePassword from "../components/login/ChangePassword";
import CodeVerification from "../components/login/CodeVerification";
import SearchAccount from "../components/login/SearchAccount";
import SendEmail from "../components/login/SendEmail";
import headerClasses from "../styles/Header.module.css";
import classes from "../styles/ResetPassword.module.css";

const ResetPassword = () => {
	const { user } = useSelector((state) => state.user);
	const [showCard, setShowCard] = useState(0);
	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [userInfo, setUserInfo] = useState("");
	const [error, setError] = useState("");

	const emailSearchSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is Required"),
	});

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
				{showCard === 0 && (
					<SearchAccount
						email={email}
						setEmail={setEmail}
						error={error}
						setError={setError}
						emailSearchSchema={emailSearchSchema}
						setUserInfo={setUserInfo}
						setShowCard={setShowCard}
					/>
				)}
				{showCard === 1 && userInfo && (
					<SendEmail
						userInfo={userInfo}
						setUserInfo={setUserInfo}
						email={email}
						error={error}
						setError={setError}
						setShowCard={setShowCard}
					/>
				)}
				{showCard === 2 && (
					<CodeVerification
						code={code}
						email={email}
						setCode={setCode}
						error={error}
						setError={setError}
						setShowCard={setShowCard}
					/>
				)}
				{showCard === 3 && (
					<ChangePassword
						email={email}
						password={password}
						setPassword={setPassword}
						confirmPassword={confirmPassword}
						setConfirmPassword={setConfirmPassword}
						error={error}
						setError={setError}
					/>
				)}
			</div>
		</>
	);
};

export default ResetPassword;
