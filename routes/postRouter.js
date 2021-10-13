const express = require("express");

// Controllers
const {
  postUpload,
  getPostDetail,
  getPostDelete,
  postUpdateCheck,
  postPostUpdate,
} = require("../controllers/postController");

// Middleware
const { isLoggedIn } = require("../middlewares/loginCheck");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

// URL: /post
router.post("/upload", isLoggedIn, postUpload);
router.post("/:id/update", isLoggedIn, verifyToken, postPostUpdate);
router.get("/:id/delete", getPostDelete);
router.get("/:id", getPostDetail);

module.exports = router;
