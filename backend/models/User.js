const mongoose = require("mongoose");

const { Schema } = mongoose;

const objectId = mongoose.Schema.ObjectId;

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, "First name is required"],
			trim: true,
			text: true,
		},
		lastName: {
			type: String,
			required: [true, "Last name is required"],
			trim: true,
			text: true,
		},
		username: {
			type: String,
			required: [true, "Username is required"],
			trim: true,
			text: true,
			unique: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		picture: {
			type: String,
			default:
				"https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png",
		},
		cover: {
			type: String,
			trim: true,
		},
		gender: {
			type: String,
			required: [true, "Gender is required"],
			trim: true,
		},
		bYear: {
			type: String,
			required: true,
			trim: true,
		},
		bMonth: {
			type: String,
			required: true,
			trim: true,
		},
		bDay: {
			type: String,
			required: true,
			trim: true,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		friends: {
			type: Array,
			default: [],
		},
		following: {
			type: Array,
			default: [],
		},
		followers: {
			type: Array,
			default: [],
		},
		requests: {
			type: Array,
			default: [],
		},
		search: [
			{
				user: {
					type: objectId,
					ref: "User",
				},
			},
		],
		details: {
			bio: {
				type: String,
			},
			otherName: {
				type: String,
			},
			job: {
				type: String,
			},
			workplace: {
				type: String,
			},
			highSchool: {
				type: String,
			},
			college: {
				type: String,
			},
			currentCity: {
				type: String,
			},
			hometown: {
				type: String,
			},
			relationship: {
				type: String,
				enum: [
					"Single",
					"Married",
					"Divorced",
					"Widowed",
					"In a relationship",
					"It's complicated",
				],
			},
			instagram: {
				type: String,
			},
		},
		savedPosts: [
			{
				post: {
					type: objectId,
					ref: "Post",
				},
				savedAt: {
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

module.exports = mongoose.model("User", userSchema);
