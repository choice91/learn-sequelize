const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.verifyToken = async (req, res, next) => {
  console.log("auth req.headers ::", req.headers);
  try {
    const [authType, authToken] = req.headers.authorization.split(" ");
    req.decoded = jwt.verify(authToken, "secretKey");
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({ code: 419, message: "토큰 만료" });
    }
    return res.status(401).json({ code: 401, message: "유효하지 않은 토큰" });
  }
  // const { authorization } = req.headers;
  // const [tokenType, tokenValue] = authorization.split(" ");
  // if (tokenType !== "Bearer") {
  //   return res.status(401).json({ errorMessage: "로그인 후 사용하세요" });
  // }
  // try {
  //   const { uid } = jwt.verify(tokenValue, "secretKey");
  //   const user = await User.findOne({
  //     where: {
  //       id: uid,
  //     },
  //   });
  //   res.locals.user = user;
  //   next();
  // } catch (err) {
  //   console.error(err);
  //   return res.status(401).json({ errorMessage: "로그인 후 사용하세요" });
  // }
};
