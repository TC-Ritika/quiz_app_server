const express = require("express");
const { PORT } = process.env;
const { initDB } = require("../src/config/db.config");
const { initAPIs } = require("./api");
const { initCors } = require("../src/config/cors.config");
const app = express();

// initialize db
initDB();

// initialize cors
initCors(app);

// initialize all APIs
initAPIs(app);

app.get("/", (req, res) => {
  res.status(200).send("Base url hit");
  return;
});

app.listen(PORT, () => {
  console.log(`Backend server started on ${PORT}`);
});

module.exports = { app };
