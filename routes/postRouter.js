const express = require("express");

// Controllers
const {
  postUpload,
  getPostDetail,
  getPostDelete,
  postPostUpdate,
} = require("../controllers/postController.js");

const router = express.Router();

// URL: /post
router.post("/upload", postUpload);
router.post("/:id/update", postPostUpdate);
router.get("/:id/delete", getPostDelete);
router.get("/:id", getPostDetail);

module.exports = router;
