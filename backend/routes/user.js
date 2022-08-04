const express = require("express");
const { register, activeAccount, login } = require("../controllers/user");

const router = express.Router();

// home page route
router.get("/", (req, res) => {
	res.send("Home Page");
});

router.get("/register", (req, res) => {
	res.send("Register Page");
});

router.post("/register", register);
router.post("/activate", activeAccount);
router.post("/login", login);

module.exports = router;
