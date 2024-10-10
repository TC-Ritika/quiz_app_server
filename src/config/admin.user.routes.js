const express = require("express");
const { adminUserController } = require("../api/controller");
const {
  adminAuthenticate,
  supremeAuthenticate,
} = require("../middleware/access.authenticate");

const adminUserRouter = express.Router();

adminUserRouter.get("/", supremeAuthenticate, adminUserController.getAllUsers); // supreme route
adminUserRouter.post("/add", adminUserController.addUser); // open route
adminUserRouter.post("/login", adminUserController.loginUser); // open route

module.exports = {
  adminUserRouter,
};
