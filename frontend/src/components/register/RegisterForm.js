import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import classes from "../../styles/stylesheets/Authentication.module.css";
import LoginInput from "../inputs/LoginInput";
import SelectBirthday from "./SelectBirthday";
import BeatLoader from "react-spinners/BeatLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userLogin } from "../../services/userSlice";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
	const userDetails = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		bYear: new Date().getFullYear(),
		bMonth: new Date().getMonth() + 1,
		bDay: new Date().getDate(),
		gender: "",
	};

	const [user, setUser] = useState(userDetails);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading, setLoading] = useState(false);
	const [dateError, setDateError] = useState("");
	const [genderError, setGenderError] = useState("");

	const navigate = useNavigate();

	const { firstName, lastName, email, password, bYear, bMonth, bDay, gender } =
		user;

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const tempYear = new Date().getFullYear();

	const years = Array.from(new Array(108), (val, index) => tempYear - index);

	const months = Array.from(new Array(12), (val, index) => index + 1);

	const getDays = () => {
		return new Date(bYear, bMonth, 0).getDate();
	};

	const days = Array.from(new Array(getDays()), (val, index) => index + 1);

	const registerSchema = Yup.object({
		firstName: Yup.string()
			.min(2, "Too Short!")
			.max(16, "Too Long!")
			.required("What's your first name?")
			.matches(/^[a-zA-Z]+$/, "Only alphabets are allowed for this field "),
		lastName: Yup.string()
			.min(2, "Too Short!")
			.max(16, "Too Long!")
			.required("What's your last name?")
			.matches(/^[a-zA-Z]+$/, "Only alphabets are allowed for this field "),
		email: Yup.string()
			.email("Enter a valid email address")
			.required("Email is Required"),
		password: Yup.string()
			.required("Password is Required")
			.min(8, "Password must be at least 8 characters")
			.max(24, "Password must be at most 16 characters")
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
				"Password must contain at least one uppercase letter, one lowercase letter, one number and one special case character"
			),

		bYear: Yup.number().required("Required"),
		bMonth: Yup.number().required("Required"),
		bDay: Yup.number().required("Required"),
	});

	const dispatch = useDispatch();

	const registerUser = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/register`,
				{
					firstName,
					lastName,
					email,
					password,
					bYear,
					bMonth,
					bDay,
					gender,
				}
			);
			setLoading(false);
			setError("");
			setSuccess(data.message);
			const { message, ...rest } = data;
			setTimeout(() => {
				dispatch(userLogin(rest));
				Cookies.set("user", JSON.stringify(rest));
				navigate("/");
			}, 2000);
		} catch (error) {
			setLoading(false);
			setSuccess("");
			setError(error.response.data.message);
		}
	};

	return (
		<>
			<Formik
				enableReinitialize
				initialValues={{
					firstName,
					lastName,
					email,
					password,
					bYear,
					bMonth,
					bDay,
					gender,
				}}
				validationSchema={registerSchema}
				onSubmit={() => {
					let currentDate = new Date();
					let selectedDate = new Date(bYear, bMonth - 1, bDay);
					let minAge = new Date(1970 + 14, 0, 1);
					let maxAge = new Date(1970 + 70, 0, 1);
					if (currentDate - selectedDate < minAge) {
						setDateError("You must be at least 14 years old to register");
					} else if (currentDate - selectedDate > maxAge) {
						setDateError("You must be at most 70 years old to register");
					} else if (gender === "") {
						setGenderError(
							"Please select your gender, you can change who can see this later."
						);
					} else {
						setDateError("");
						setGenderError("");
						registerUser();
					}
				}}>
				{(formik) => (
					<Form className={classes.form}>
						<h2>Let's get you started</h2>
						<LoginInput
							label="First Name"
							htmlFor="firstName"
							name="firstName"
							type="text"
							placeholder="Muhammad"
							onChange={handleOnChange}
						/>
						<LoginInput
							label="Last Name"
							htmlFor="lastName"
							name="lastName"
							type="text"
							placeholder="Salman"
							onChange={handleOnChange}
						/>
						<LoginInput
							label="Email Address"
							htmlFor="email"
							name="email"
							type="email"
							placeholder="youremail@gmail.com"
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
						<SelectBirthday
							bDay={bDay}
							bMonth={bMonth}
							bYear={bYear}
							days={days}
							months={months}
							years={years}
							handleOnChange={handleOnChange}
							dateError={dateError}
						/>
						<div className={classes.input}>
							<label>Gender</label>
							<div className={classes.genderInput}>
								<label htmlFor="male">
									Male
									<input
										type="radio"
										name="gender"
										id="male"
										value="male"
										onChange={handleOnChange}
									/>
								</label>
								<label htmlFor="female">
									Female
									<input
										type="radio"
										name="gender"
										id="female"
										value="female"
										onChange={handleOnChange}
									/>
								</label>
								<label htmlFor="custom">
									Custom
									<input
										type="radio"
										name="gender"
										id="custom"
										value="custom"
										onChange={handleOnChange}
									/>
								</label>
							</div>
							{genderError && <p className="error">{genderError}</p>}
						</div>

						<button type="submit" className="btn">
							{loading ? (
								<BeatLoader color="#fff" loading={loading} size={10} />
							) : (
								"SignUp"
							)}
						</button>
						{error && <p className="error">{error}</p>}
						{success && <p className="success">{success}</p>}
						<p className={classes.signup}>
							Already a user?
							<Link to="/login">
								<span>Login</span>
							</Link>
						</p>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default RegisterForm;
