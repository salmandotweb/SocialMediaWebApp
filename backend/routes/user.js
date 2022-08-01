const express = require("express");
const { register } = require("../controllers/user");

const router = express.Router();

// home page route
router.get("/register", (req, res) => {
	res.send("Register Page");
});
router.post("/register", register);

module.exports = router;
