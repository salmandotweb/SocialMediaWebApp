const express = require("express");
const { uploadImages, images } = require("../controllers/upload");
const { authUser } = require("../middlewares/auth");
const imageUpload = require("../middlewares/imageUpload");

const router = express.Router();

router.post("/uploadImages", authUser, imageUpload, uploadImages);
router.post("/images", images);

module.exports = router;
