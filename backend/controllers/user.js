const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
	validateEmail,
	validateLength,
	validateUsername,
} = require("../helpers/validation");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");

exports.register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			bYear,
			bMonth,
			bDay,
			gender,
		} = req.body;

		if (!validateEmail(email)) {
			return res.status(400).json({
				message: "Invalid Email Address",
			});
		}

		const checkEmail = await User.findOne({ email });

		if (checkEmail) {
			return res.status(400).json({
				message: "Email already exists",
			});
		}

		if (!validateLength(firstName, 3, 20)) {
			return res.status(400).json({
				message: "First name must be between 3 and 20 characters",
			});
		}

		if (!validateLength(lastName, 3, 20)) {
			return res.status(400).json({
				message: "Last name must be between 3 and 20 characters",
			});
		}

		if (!validateLength(password, 6, 30)) {
			return res.status(400).json({
				message: "Password must be between 6 and 30 characters",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		let autoUsername = firstName + lastName;
		let suggestedUsername = await validateUsername(autoUsername);

		const user = await new User({
			firstName,
			lastName,
			email,
			username: suggestedUsername,
			password: hashedPassword,
			bYear,
			bMonth,
			bDay,
			gender,
		}).save();

		const emailVerificationToken = generateToken(
			{ id: user._id.toString() },
			"30m"
		);

		const url = `${process.env.BASEURL}/activate/${emailVerificationToken}`;
		sendVerificationEmail(user.email, user.firstName, url);

		const token = generateToken({ id: user._id.toString() }, "7d");

		res.send({
			id: user._id,
			username: user.username,
			picture: user.picture,
			firstName: user.firstName,
			lastName: user.lastName,
			token: token,
			verified: user.verified,
			message:
				"Registration Successful, please check your email to verify your account.",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

exports.activeAccount = async (req, res) => {
	try {
		const { token } = req.body;
		const user = jwt.verify(token, process.env.JWT_SECRET);
		const check = await User.findOne({ _id: user.id });
		if (check.verified === true) {
			return res.status(400).json({
				message: "Account already verified",
			});
		} else {
			await User.findByIdAndUpdate(user.id, { verified: true });
			res.status(200).json({
				message: "Account verified successfully",
			});
		}
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				message: "This email is not registered to any account.",
			});
		}
		const passCheck = await bcrypt.compare(password, user.password);
		if (!passCheck) {
			return res.status(400).json({
				message: "Invalid password",
			});
		}
		const token = generateToken({ id: user._id.toString() }, "7d");

		res.send({
			id: user._id,
			username: user.username,
			picture: user.picture,
			firstName: user.firstName,
			lastName: user.lastName,
			token: token,
			verified: user.verified,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
