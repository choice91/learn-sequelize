const express = require("express");
const morgan = require("morgan");

const app = express();
const logger = morgan("dev");

const { sequelize } = require("../models/index.js");

app.set("port", process.env.PORT || 4000);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("✅ DB 연결 성공 😊");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(logger);

app.use("/", (req, res) => {
  return res.send("Hello");
});

app.listen(app.get("port"), () => {
  console.log(`✅ Server listening on http://localhost:${app.get("port")} 👈`);
});
