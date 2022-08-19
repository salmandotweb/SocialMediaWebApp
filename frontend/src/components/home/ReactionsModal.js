import classes from "../../styles/ReactionsModal.module.css";

const reactions = [
	{
		name: "like",
		image: "../../reacts/like.gif",
	},
	{
		name: "love",
		image: "../../reacts/love.gif",
	},
	{
		name: "haha",
		image: "../../reacts/haha.gif",
	},
	{
		name: "wow",
		image: "../../reacts/wow.gif",
	},
	{
		name: "sad",
		image: "../../reacts/sad.gif",
	},
	{
		name: "angry",
		image: "../../reacts/angry.gif",
	},
];

const ReactionsModal = ({ show, setShow }) => {
	return [
		show && (
			<>
				<div
					className={classes.reactionsModal}
					onMouseLeave={() => setShow(false)}
					onMouseEnter={() => setShow(true)}>
					{reactions.map((reaction) => (
						<div className={classes.reaction}>
							<img src={reaction.image} alt="icon" className="optionsIcon" />
						</div>
					))}
				</div>
			</>
		),
	];
};

export default ReactionsModal;
