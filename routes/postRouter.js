const express = require("express");

// Controllers
const { postUpload } = require("../controllers/postController.js");

const router = express.Router();

// URL: /post
router.post("/upload", postUpload);

module.exports = router;
