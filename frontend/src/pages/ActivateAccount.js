import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
	CheckMarkIcon,
	CheckErrorIcon,
} from "../components/global/CheckMarkIcon";
import classes from "../styles/ActivateAccount.module.css";
import Home from "./Home";

const ActivateModal = ({ title, text, icon }) => {
	return (
		<>
			<div className={classes.overlay}></div>
			<div className={classes.modal}>
				<div className={classes.modalContent}>
					{icon}
					<h1>{title}</h1>
					<p>{text}</p>
					<p>Redirecting...</p>
				</div>
			</div>
		</>
	);
};

const ActivateAccount = () => {
	const [activated, setActivated] = useState("s");
	const [error, setError] = useState("");
	const { user } = useSelector((state) => state.user);

	const { token } = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const activateAccount = async () => {
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/activate`,
				{
					token,
				},
				{
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				}
			);
			setActivated(data.message);
			Cookies.set("user", JSON.stringify({ ...user, verified: true }));
			dispatch({ type: "userVerifiedStatus", payload: true });

			setTimeout(() => {
				navigate("/");
			}, 4000);
		} catch (error) {
			setError(error.response.data.message);
			setTimeout(() => {
				navigate("/");
			}, 4000);
		}
	};

	useEffect(() => {
		activateAccount();
	}, []);

	return (
		<>
			<Home
				children={
					error ? (
						<ActivateModal
							title="Account Activation Failed"
							text={error}
							icon={<CheckErrorIcon />}
						/>
					) : "" || activated ? (
						<ActivateModal
							title="Account Activated"
							text="Your account has been activated. You can now use your account."
							icon={<CheckMarkIcon />}
						/>
					) : (
						""
					)
				}
			/>
		</>
	);
};

export default ActivateAccount;
