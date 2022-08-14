const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const emailCodeSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
	},
	user: {
		type: ObjectId,
		ref: "User",
		required: true,
	},
});

module.exports = mongoose.model("EmailCode", emailCodeSchema);
