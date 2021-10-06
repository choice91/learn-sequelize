const express = require("express");

// Controllers
const { getPosts } = require("../controllers/rootController.js");

const router = express.Router();

// URL: /
router.get("/", getPosts);

module.exports = router;
