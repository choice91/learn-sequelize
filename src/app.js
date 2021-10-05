const express = require("express");
const morgan = require("morgan");

const app = express();
const logger = morgan("dev");

const PORT = 4000;

app.use(logger);

app.use("/", (req, res) => {
  return res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
