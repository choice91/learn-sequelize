const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postJoin = async (req, res) => {
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

const postLogin = async (req, res) => {
  const { email, pwd } = req.body;
  try {
    // 요청한 이메일이 데이터베이스에 있는지 확인
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    console.log("user :: ", user.dataValues);
    // 요청한 비밀번호와 데이터베이스에 있는 비밀번호와 비교
    const ok = await bcrypt.compare(pwd, user.dataValues.password);
    // 비밀번호가 서로 일치하지 않음
    if (!ok) {
      return res
        .status(403)
        .json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
    }
    // 비밀번호가 서로 일치함
    const payload = {
      email: user.dataValues.email,
      username: user.dataValues.username,
    };
    const options = { expiresIn: "1h" };
    const token = jwt.sign(payload, "secretKey", options);
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(401).json(error);
  }
};

const logout = (req, res) => {
  console.log(req.session);
  return res.end();
};

module.exports = {
  postJoin,
  postLogin,
  logout,
};
