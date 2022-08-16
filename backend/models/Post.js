const mongoose = require("mongoose");

const { Schema } = mongoose;

const objectId = mongoose.Schema.ObjectId;

const postSchema = new Schema(
	{
		type: {
			type: String,
			enum: ["profilePicture", "coverPicture", null],
			default: null,
		},
		text: {
			type: String,
		},
		images: {
			type: Array,
		},
		user: {
			type: objectId,
			ref: "User",
			required: true,
		},
		background: {
			type: String,
		},
		comments: [
			{
				comment: {
					type: String,
				},
				image: {
					type: String,
				},
				commentBy: {
					type: objectId,
					ref: "User",
				},
				commentAt: {
					type: Date,
					default: new Date(),
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Post", postSchema);
