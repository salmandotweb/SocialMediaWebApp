import React from "react";
import { Link } from "react-router-dom";
import classes from "../styles/stylesheets/Authentication.module.css";

const Register = () => {
	return (
		<div className={classes.authenticationPage}>
			<div className={classes.header}>
				<h1>ClickBay.</h1>
			</div>
			<img src="/images/Stroke.svg" alt="" className={classes.stroke} />
			<div className={classes.left}>
				<form className={classes.form}>
					<h2>Let’s get you started</h2>
					<div className={classes.input}>
						<label htmlFor="first">First Name</label>
						<input
							type="text"
							name="firstName"
							id="first"
							placeholder="Muhammad"
						/>
					</div>
					<div className={classes.input}>
						<label htmlFor="last">Last Name</label>
						<input type="text" name="lastName" id="last" placeholder="Salman" />
					</div>
					<div className={classes.input}>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="username"
						/>
					</div>
					<div className={classes.input}>
						<label htmlFor="email">Email Address</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="yourname@gmail.com"
						/>
					</div>
					<div className={classes.input}>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
						/>
					</div>
					<button type="submit" className="btn">
						SignUp
					</button>
					<p className={classes.signup}>
						Already a user?
						<Link to="/login">
							<span>Login</span>
						</Link>
					</p>
				</form>
			</div>
			<div className={classes.right}></div>
		</div>
	);
};

export default Register;
