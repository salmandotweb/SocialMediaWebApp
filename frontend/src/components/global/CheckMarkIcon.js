import React from "react";
import classes from "../../styles/CheckMarkIcon.module.css";

const CheckMarkIcon = () => {
	return (
		<div className={classes.uiSuccess}>
			<svg viewBox="0 0 87 87" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<g
					id="Page-1"
					stroke="none"
					strokeWidth="1"
					fill="none"
					fillRule="evenodd">
					<g id="Group-3" transform="translate(2.000000, 2.000000)">
						<circle
							id="Oval-2"
							stroke="rgba(165, 220, 134, 0.2)"
							strokeWidth="4"
							cx="41.5"
							cy="41.5"
							r="41.5"></circle>
						<circle
							className={classes.uiSuccessCircle}
							id="Oval-2"
							stroke="#A5DC86"
							strokeWidth="4"
							cx="41.5"
							cy="41.5"
							r="41.5"></circle>
						<polyline
							className={classes.uiSuccessPath}
							id="Path-2"
							stroke="#A5DC86"
							strokeWidth="4"
							points="19 38.8036813 31.1020744 54.8046875 63.299221 28"></polyline>
					</g>
				</g>
			</svg>
		</div>
	);
};

const CheckErrorIcon = () => {
	return (
		<div className={classes.uiError}>
			<svg viewBox="0 0 87 87" version="1.1" xmlns="http://www.w3.org/2000/svg">
				<g
					id="Page-1"
					stroke="none"
					strokeWidth="1"
					fill="none"
					fillRule="evenodd">
					<g id="Group-2" transform="translate(2.000000, 2.000000)">
						<circle
							id="Oval-2"
							stroke="rgba(252, 191, 191, .5)"
							strokeWidth="4"
							cx="41.5"
							cy="41.5"
							r="41.5"></circle>
						<circle
							className={classes.uiErrorCircle}
							stroke="#F74444"
							strokeWidth="4"
							cx="41.5"
							cy="41.5"
							r="41.5"></circle>
						<path
							className={classes.uiErrorLine1}
							d="M22.244224,22 L60.4279902,60.1837662"
							id="Line"
							stroke="#F74444"
							strokeWidth="3"
							stroke-linecap="square"></path>
						<path
							className={classes.uiErrorLine2}
							d="M60.755776,21 L23.244224,59.8443492"
							id="Line"
							stroke="#F74444"
							strokeWidth="3"
							stroke-linecap="square"></path>
					</g>
				</g>
			</svg>
		</div>
	);
};

export { CheckMarkIcon, CheckErrorIcon };
