const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // req.body.email
        passwordField: "pwd", // req.body.pwd
      },
      async (email, pwd, done) => {
        try {
          const user = await User.findOne({
            where: {
              email: email,
            },
          });
          if (user) {
            const ok = await bcrypt.compare(pwd, user.dataValues.password);
            if (ok) {
              done(null, user);
            } else {
              done(null, false, {
                loginSuccess: false,
                message: "비밀번호가 일치하지 않습니다.",
              });
            }
          } else {
            done(null, false, {
              loginSuccess: false,
              message: "가입되지 않은 회원입니다.",
            });
          }
        } catch (err) {
          console.log(err);
          done(err);
        }
      }
    )
  );
};
