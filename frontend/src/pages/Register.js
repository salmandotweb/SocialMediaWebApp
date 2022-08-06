import React from "react";
import RegisterForm from "../components/register/RegisterForm";
import classes from "../styles/stylesheets/Authentication.module.css";

const Register = () => {
	return (
		<div className={classes.authenticationPage}>
			<img src="/images/Stroke.svg" alt="" className={classes.stroke} />
			<div className={classes.left}>
				<div className={classes.header}>
					<h1>ClickBay.</h1>
				</div>
				<RegisterForm />
			</div>
			<div className={classes.right}></div>
		</div>
	);
};

export default Register;
