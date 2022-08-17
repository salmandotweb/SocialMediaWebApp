const express = require("express");
const { createPost, allPosts } = require("../controllers/post");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/allPosts", authUser, allPosts);

module.exports = router;
