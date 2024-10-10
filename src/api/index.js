const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { adminUserRouter, quizRouter } = require("./../config");

const initAPIs = (app) => {
  //bodyParser as middleware
  //extended body size to avoid 413 error(payload too large)
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  // creating public directory for putting game related assets
  app.use(express.static(path.join(__dirname, "../../public")));

  //define Routes
  app.use("/adminusers", adminUserRouter);
  app.use("/quiz", quizRouter);
  // app.get("/*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "../../public", "index.html"));
  // });
};

module.exports = { initAPIs };
