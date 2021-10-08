const express = require("express");

// Controllers
const { getPostList } = require("../controllers/postController");

const router = express.Router();

// URL: /
router.get("/", getPostList);

module.exports = router;
