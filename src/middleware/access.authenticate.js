const { ADMIN_AUTH } = process.env;
const jwt = require("jsonwebtoken");
const { AdminUser } = require("../api/model/admin.user.model");

const adminAuthenticate = async (req, res, next) => {
  try {
    let token = req.header("rx-a");
    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }
    let decoded = jwt.verify(token, ADMIN_AUTH);
    const adminUser = await AdminUser.findOne({
      _id: decoded._id,
      token,
    });
    if (!adminUser) {
      return res.status(401).json({
        message: "No user found, authorization denied",
      });
    }
    next();
  } catch (error) {
    res.status(401).send({
      error: "Unauthorized",
    });
    return;
  }
};
const supremeAuthenticate = async (req, res, next) => {
  try {
    console.log("supremeAuthenticate is called");
    let token = req.header("rx-a");
    if (!token) {
      return res.status(401).json({
        message: "No token, authorization denied",
      });
    }
    let decoded = jwt.verify(token, ADMIN_AUTH);
    const adminUser = await AdminUser.findOne({
      _id: decoded._id,
      token,
    });
    console.log("decoded");
    console.log(decoded);
    if (!adminUser) {
      return res.status(401).json({
        message: "No user found, authorization denied",
      });
    }
    if (!decoded.isSupremeUser) {
      return res.status(401).json({
        message: "No user found, authorization denied",
      });
    }
    next();
  } catch (error) {
    res.status(401).send({
      error: "Unauthorized",
    });
    return;
  }
};

module.exports = { adminAuthenticate, supremeAuthenticate };
