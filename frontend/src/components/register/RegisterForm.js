import React, { useCallback, useState } from "react";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import classes from "../../styles/stylesheets/Authentication.module.css";
import LoginInput from "../inputs/LoginInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const userDetails = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	bYear: "",
	bMonth: "",
	bDay: "",
	gender: "",
};

const RegisterForm = () => {
	const [user, setUser] = useState(userDetails);
	const [startDate, setStartDate] = useState(new Date());
	const {
		firstName,
		lastName,
		email,
		password,
		date,
		bYear,
		bMonth,
		bDay,
		gender,
	} = user;

	console.log(user);

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleDateChange = (date) => {
		setStartDate(date);

		// birth year
		const year = date.getFullYear();
		setUser({ ...user, bYear: year });

		// birth month
		const month = date.getMonth() + 1;
		setUser({ ...user, bMonth: month });

		// birth day
		const day = date.getDate();
		setUser({ ...user, bDay: day });
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
					firstName,
					lastName,
					email,
					password,
					date,
					bYear,
					bMonth,
					bDay,
					gender,
				}}
				validationSchema={loginSchema}>
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
						<div className={classes.input}>
							<label>Birthday</label>
							<DatePicker
								selected={startDate}
								name="date"
								className={classes.datePicker}
								onChange={handleDateChange}
							/>
						</div>

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
					</Form>
				)}
			</Formik>
		</>
	);
};

export default RegisterForm;
