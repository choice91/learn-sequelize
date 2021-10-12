exports.isLoggedIn = (req, res, next) => {
  console.log("req.isAuthenticated() ::", req.isAuthenticated());
  console.log("req.isUnauthenticated() ::", req.isUnauthenticated());
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ loginSuccess: false, message: "로그인 필요" });
  }
};
