const jwt = require("jsonwebtoken");

exports.authUser = async (req, res, next) => {
	try {
		const authorization = req.header("Authorization");
		const token = authorization
			? authorization.slice(7, authorization.length)
			: "";
		if (!token) {
			return res.status(401).json({
				message: "Unauthorized",
			});
		}
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).json({
					message: "Unauthorized",
				});
			}
			req.user = decoded;
			next();
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};
