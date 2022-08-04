import classes from "../styles/stylesheets/Authentication.module.css";
import LoginForm from "../components/login/LoginForm";

const Login = () => {
	return (
		<div className={classes.authenticationPage}>
			<div className={classes.header}>
				<h1>ClickBay.</h1>
			</div>
			<img src="/images/Stroke.svg" alt="" className={classes.stroke} />
			<div className={classes.left}>
				<LoginForm />
			</div>
			<div className={classes.right}></div>
		</div>
	);
};

export default Login;
