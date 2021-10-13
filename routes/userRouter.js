const express = require("express");

// Controller
const {
  postJoin,
  postLogin,
  logout,
} = require("../controllers/userController");

// Middlewares
const { isLoggedIn, isNotLoggedIn } = require("../middlewares/loginCheck");

const router = express.Router();

// URL: /user
router.post("/join", isNotLoggedIn, postJoin);
router.post("/login", isNotLoggedIn, postLogin);
router.post("/logout", isLoggedIn, logout);

module.exports = router;
