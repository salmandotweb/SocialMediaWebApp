const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
	validateEmail,
	validateLength,
	validateUsername,
} = require("../helpers/validation");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail, sendEmailCode } = require("../helpers/mailer");
const EmailCode = require("../models/EmailCode");

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
		const actualUser = req.user.id;
		const { token } = req.body;
		const user = jwt.verify(token, process.env.JWT_SECRET);
		const check = await User.findOne({ _id: user.id });
		if (actualUser !== user.id) {
			return res.status(400).json({
				message: "This account does not belong to you.",
			});
		}
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

exports.sendVerification = async (req, res) => {
	try {
		const id = req.user.id;
		const user = await User.findById(id);
		if (user.verified === true) {
			return res.status(400).json({
				message: "Account already verified",
			});
		}
		const emailVerificationToken = generateToken(
			{
				id: user._id.toString(),
			},
			"30m"
		);
		const url = `${process.env.BASEURL}/activate/${emailVerificationToken}`;
		sendVerificationEmail(user.email, user.firstName, url);

		return res.status(200).json({
			message: "Verification email sent successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

exports.findUser = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email }).select("-password");
		if (!user) {
			return res.status(400).json({
				message: "This email is not registered to any account.",
			});
		}
		res.status(200).json({
			email: user.email,
			picture: user.picture,
			message: "Password reset email sent successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

exports.sendResetCode = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email }).select("-password");
		await EmailCode.findOneAndRemove({ user: user._id });

		const code = Math.floor(100000 + Math.random() * 900000);
		const emailCode = await new EmailCode({
			user: user._id,
			code,
		}).save();
		sendEmailCode(user.email, user.firstName, code);
		res.status(200).json({
			message: "Password reset code sent successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

exports.validateResetCode = async (req, res) => {
	try {
		const { email, code } = req.body;
		const user = await User.findOne({ email });
		const emailCode = await EmailCode.findOne({ user: user._id });
		if (emailCode.code !== code) {
			return res.status(400).json({
				message: "Invalid code",
			});
		}
		res.status(200).json({
			message: "Code verified successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

exports.changePassword = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const hashPassword = await bcrypt.hash(password, 12);
		await User.findByIdAndUpdate(user._id, { password: hashPassword });
		res.status(200).json({
			message: "Password changed successfully",
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

exports.getProfile = async (req, res) => {
	try {
		const { username } = req.params;
		const userProfile = await User.find({ username }).select("-password");
		res.status(200).json({
			userProfile,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};
