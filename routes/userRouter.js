const express = require("express");

// Controller
const {
  postJoin,
  postLogin,
  logout,
} = require("../controllers/userController");

const router = express.Router();

// URL: /user
router.post("/join", postJoin);
router.post("/login", postLogin);
router.post("/logout", logout);

module.exports = router;
