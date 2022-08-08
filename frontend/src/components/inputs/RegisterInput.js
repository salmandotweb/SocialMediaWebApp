import React from "react";
import { ErrorMessage, useField } from "formik";
import classes from "../../styles/Authentication.module.css";

const registerInput = ({ label, placeholder, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className={classes.input}>
			<label htmlFor={field.htmlFor}>{label}</label>
			<input
				placeholder={placeholder}
				{...field}
				{...props}
				type={field.type}
				name={field.name}
				id={field.htmlFor}
			/>
			{meta.touched && meta.error && (
				<p className="error">{<ErrorMessage name={field.name} />}</p>
			)}
		</div>
	);
};

export default registerInput;
