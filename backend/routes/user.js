const express = require("express");
const {
	register,
	activeAccount,
	login,
	sendVerification,
	findUser,
	sendResetCode,
	validateResetCode,
	changePassword,
	getProfile,
	updateProfilePicture,
} = require("../controllers/user");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

// home page route
router.get("/", (req, res) => {
	res.send("Home Page");
});

router.get("/register", (req, res) => {
	res.send("Register Page");
});

router.post("/register", register);
router.post("/activate", authUser, activeAccount);
router.post("/login", login);
router.post("/sendVerificationEmail", authUser, sendVerification);
router.post("/findUser", findUser);
router.post("/sendResetCode", sendResetCode);
router.post("/validateResetCode", validateResetCode);
router.post("/changePassword", changePassword);
router.get("/getProfile/:username", authUser, getProfile);
router.put("/updateProfilePicture", authUser, updateProfilePicture);

module.exports = router;
