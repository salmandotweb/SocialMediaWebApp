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

exports.allPosts = async (req, res) => {
	try {
		const allPosts = await Post.find()
			.populate("user", "firstName lastName picture username gender")
			.sort({ createdAt: -1 });
		res.status(200).json(allPosts);
	} catch (error) {
		return res.json({
			message: error.message,
		});
	}
};
