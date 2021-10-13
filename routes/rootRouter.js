const express = require("express");

// Controllers
const { getPostList } = require("../controllers/postController");

const { isLoggedIn } = require("../middlewares/loginCheck");

const router = express.Router();

// URL: /
router.get("/", isLoggedIn, getPostList);

module.exports = router;
