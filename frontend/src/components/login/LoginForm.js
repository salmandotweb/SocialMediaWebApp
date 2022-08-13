import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import classes from "../../styles/Authentication.module.css";
import LoginInput from "../inputs/LoginInput";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLogin } from "../../services/userSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const loginDetails = {
	email: "",
	password: "",
};

const LoginForm = () => {
	const [login, setLogin] = useState(loginDetails);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { email, password } = login;

	const navigate = useNavigate();
	const dispatch = useDispatch();

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

	const loginUser = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/login`,
				{
					email,
					password,
				}
			);
			setLoading(false);
			dispatch(userLogin(data));
			Cookies.set("user", JSON.stringify(data));
			navigate("/");
		} catch (err) {
			setLoading(false);
			setError(err.response.data.message);
		}
	};
	return (
		<>
			<Formik
				enableReinitialize
				initialValues={{
					email,
					password,
				}}
				validationSchema={loginSchema}
				onSubmit={() => loginUser()}>
				{(formik) => (
					<Form className={`${classes.form} ${classes.loginForm}`}>
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
						<p className={classes.forgetPassword}>
							<Link to="/forget-password">
								<span>Forget password?</span>
							</Link>
						</p>
						<button type="submit" className="btn">
							{loading ? (
								<BeatLoader color="#fff" loading={loading} size={10} />
							) : (
								"Login"
							)}
						</button>
						{error && <p className="error">{error}</p>}
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
