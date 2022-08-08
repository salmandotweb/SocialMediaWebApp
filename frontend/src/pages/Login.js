import classes from "../styles/Authentication.module.css";
import LoginForm from "../components/login/LoginForm";

const Login = () => {
	return (
		<div className={classes.authenticationPage}>
			<img src="/images/Stroke.svg" alt="" className={classes.stroke} />
			<div className={classes.left}>
				<div className={classes.header}>
					<h1>ClickBay.</h1>
				</div>
				<LoginForm />
			</div>
			<div className={classes.right}></div>
		</div>
	);
};

export default Login;
