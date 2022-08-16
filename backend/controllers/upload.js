const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_KEY,
	api_secret: process.env.CLOUD_SECRET,
});

exports.uploadImages = async (req, res) => {
	try {
		const { path } = req.body;
		let files = Object.values(req.files).flat();
		let images = [];
		for (const file of files) {
			const url = await uploadToCloudinary(file, path);
			images.push(url);
			removeTmp(file.tempFilePath);
		}
		res.json(images);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

const uploadToCloudinary = async (file, path) => {
	return new Promise((resolve) => {
		cloudinary.v2.uploader.upload(
			file.tempFilePath,
			{
				folder: path,
			},
			(err, res) => {
				if (err) {
					removeTmp(file.tempFilePath);
					return res.status(500).json({
						message: "Image Upload Failed",
					});
				}
				resolve({
					url: res.secure_url,
				});
			}
		);
	});
};

const removeTmp = (filePath) => {
	fs.unlink(filePath, (err) => {
		if (err) {
			throw err;
		}
	});
};
