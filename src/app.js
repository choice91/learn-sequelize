const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Models
const { sequelize } = require("../models/index.js");

// Routers
const rootRouter = require("../routes/rootRouter.js");
const postRouter = require("../routes/postRouter.js");

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

app.use(cors());
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", rootRouter);
app.use("/post", postRouter);

app.listen(app.get("port"), () => {
  console.log(`✅ Server listening on http://localhost:${app.get("port")} 👈`);
});
