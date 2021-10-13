exports.isLoggedIn = (req, res, next) => {
  console.log("req.isAuthenticated() ::", req.isAuthenticated());
  console.log("req.isUnauthenticated() ::", req.isUnauthenticated());
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ loginSuccess: false, message: "로그인 필요" });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ message: "이미 로그인 한 상태입니다." });
  }
};
