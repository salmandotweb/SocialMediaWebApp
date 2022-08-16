const Post = require("../models/Post");

exports.createPost = async (req, res) => {
	try {
		const post = await new Post(req.body).save();
		res.status(200).json(post);
	} catch (error) {
		return res.json({
			message: error.message,
		});
	}
};
