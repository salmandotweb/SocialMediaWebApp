const fs = require("fs");

module.exports = async (req, res, next) => {
	try {
		if (!req.files || Object.values(req.files).flat().length === 0) {
			return res.status(400).json({
				message: "No files selected",
			});
		}
		let images = Object.values(req.files).flat();
		images.forEach((image) => {
			if (
				image.mimetype !== "image/jpeg" &&
				image.mimetype !== "image/png" &&
				image.mimetype !== "image/jpg" &&
				image.mimetype !== "image/gif" &&
				image.mimetype !== "image/webp"
			) {
				removeTmp(image.tempFilePath);
				return res.status(400).json({
					message: "Invalid file type",
				});
			}
			if (image.size > 1024 * 1024 * 5) {
				removeTmp(image.tempFilePath);
				return res.status(400).json({
					message: "File size too big",
				});
			}
		});
		next();
	} catch (error) {
		return res.json({
			message: error.message,
		});
	}
};

const removeTmp = (filePath) => {
	fs.unlink(filePath, (err) => {
		if (err) {
			throw err;
		}
	});
};
