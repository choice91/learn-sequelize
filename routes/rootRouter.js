const express = require("express");

// Controllers
const { getPostList } = require("../controllers/rootController.js");

const router = express.Router();

// URL: /
router.get("/", getPostList);

module.exports = router;
