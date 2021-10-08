const User = require("../models/user");
const bcrypt = require("bcrypt");

const postJoin = async (req, res) => {
  const { email, pwd, username } = req.body;
  const bcryptPwd = await bcrypt.hash(pwd, 5);
  try {
    await User.create({
      email: email,
      password: bcryptPwd,
      username: username,
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  postJoin,
};
