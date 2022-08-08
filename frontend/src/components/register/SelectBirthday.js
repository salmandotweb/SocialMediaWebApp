import React from "react";
import classes from "../../styles/Authentication.module.css";

const SelectBirthday = ({
	bDay,
	bMonth,
	bYear,
	days,
	months,
	years,
	handleOnChange,
	dateError,
}) => {
	return (
		<div className={classes.input}>
			<label>Birthday</label>
			<div className={classes.birthdayContainer}>
				<select name="bYear" value={bYear} onChange={handleOnChange}>
					{years.map((year, index) => {
						return (
							<option key={index} value={year}>
								{year}
							</option>
						);
					})}
				</select>
				<select name="bMonth" value={bMonth} onChange={handleOnChange}>
					{months.map((month, index) => {
						return (
							<option key={index} value={month}>
								{month}
							</option>
						);
					})}
				</select>
				<select name="bDay" value={bDay} onChange={handleOnChange}>
					{days.map((day, index) => {
						return (
							<option key={index} value={day}>
								{day}
							</option>
						);
					})}
				</select>
			</div>
			{dateError && <p className="error">{dateError}</p>}
		</div>
	);
};

export default SelectBirthday;
