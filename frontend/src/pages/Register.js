import React from "react";
import RegisterForm from "../components/register/RegisterForm";
import classes from "../styles/Authentication.module.css";

const Register = () => {
	return (
		<div className={classes.authenticationPage}>
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
