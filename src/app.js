const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");

// Models
const { sequelize } = require("../models/index");

// Routers
const rootRouter = require("../routes/rootRouter");
const postRouter = require("../routes/postRouter");
const userRouter = require("../routes/userRouter");

const passportConfig = require("../passport/index");

const app = express();
const logger = morgan("dev");

app.set("port", process.env.PORT || 4000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("✅ DB 연결 성공 😊");
  })
  .catch((err) => {
    console.log("❗ DB 연결 실패 😱");
    console.error(err);
  });
passportConfig();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "secret_key",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser("secret_key"));

app.use("/", rootRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen(app.get("port"), () => {
  console.log(`✅ Server listening on http://localhost:${app.get("port")} 👈`);
});
