import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import classes from "../../styles/stylesheets/Authentication.module.css";
import LoginInput from "../inputs/LoginInput";

const loginDetails = {
	email: "",
	password: "",
};

const LoginForm = () => {
	const [login, setLogin] = useState(loginDetails);
	const { email, password } = login;

	console.log(login);

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setLogin({ ...login, [name]: value });
	};

	const loginSchema = Yup.object({
		email: Yup.string()
			.email("Invalid email address")
			.required("Email is Required"),

		password: Yup.string().required("Password is Required"),
	});
	return (
		<>
			<Formik
				enableReinitialize
				initialValues={{
					email,
					password,
				}}
				validationSchema={loginSchema}>
				{(formik) => (
					<Form className={classes.form}>
						<h2>Login to your account</h2>
						<LoginInput
							label="Email Address"
							htmlFor="email"
							name="email"
							type="email"
							placeholder="yourname@gmail.com"
							onChange={handleOnChange}
						/>
						<LoginInput
							label="Password"
							htmlFor="password"
							name="password"
							type="password"
							placeholder="Password"
							onChange={handleOnChange}
						/>
						<button type="submit" className="btn">
							Login
						</button>
						<p className={classes.signup}>
							Not have an acount?
							<Link to="/register">
								<span>SignUp</span>
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default LoginForm;
