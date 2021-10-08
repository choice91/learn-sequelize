const express = require("express");

// Controller
const { postJoin } = require("../controllers/userController");

const router = express.Router();

// URL: /user
router.post("/join", postJoin);

module.exports = router;
