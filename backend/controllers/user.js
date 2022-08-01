const User = require("../models/User");
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
			first_name,
			last_name,
			email,
			username,
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

		if (!validateLength(first_name, 3, 20)) {
			return res.status(400).json({
				message: "First name must be between 3 and 20 characters",
			});
		}

		if (!validateLength(last_name, 3, 20)) {
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

		let autoUsername = first_name + last_name;
		let suggestedUsername = await validateUsername(autoUsername);

		const user = await new User({
			first_name,
			last_name,
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
		sendVerificationEmail(user.email, user.first_name, url);

		const token = generateToken({ id: user._id.toString() }, "7d");

		res.send({
			id: user._id,
			username: user.username,
			picture: user.picture,
			first_name: user.first_name,
			last_name: user.last_name,
			token: token,
			verified: user.verfied,
			message:
				"Registration Successful, please check your email to verify your account.",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
