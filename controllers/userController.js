const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

exports.postJoin = async (req, res) => {
  const { email, pwd, username } = req.body;
  const hashedPassword = await bcrypt.hash(pwd, 12);
  try {
    await User.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

exports.postLogin = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({ message: "login fail" });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const payload = {
        uid: user.dataValues.id,
        email: user.dataValues.email,
        username: user.dataValues.username,
      };
      const options = { expiresIn: "1h" };
      const token = jwt.sign(payload, "secretKey", options);
      const expiryDate = new Date(Date.now() + 1000 * 60 * 60 * 10);
      res.cookie("accessToken", token, {
        expires: expiryDate,
        httpOnly: true,
      });
      return res.status(200).json({ token });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
  return res.status(200).json({ status: "success", message: "logout" });
};
