const { ADMIN_AUTH, USER_ONE, USER_TWO } = process.env;
const { AdminUser } = require("../model/admin.user.model");
const { isEmpty } = require("lodash");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// login to admin panel
const loginUser = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    let adminDoc = await AdminUser.findOne({ userEmail: userEmail });
    if (!adminDoc) {
      return res.status(400).json({
        message: "Invalid Email Id",
      });
    }
    const isMatch = await adminDoc.comparePassword(userPassword);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
    let decodedData = jwt.verify(adminDoc.token, ADMIN_AUTH);
    console.log(decodedData);
    let dataTosend = {
      _id: adminDoc._id,
      userName: adminDoc.userName,
      userEmail: adminDoc.userEmail,
      isSupremeUser: decodedData.isSupremeUser,
    };
    //successfull login
    // send token to client
    res
      .set({ "rx-a": adminDoc.token })
      .status(200)
      .json({ message: "Login successfully", data: dataTosend });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// add User
const addUser = async (req, res) => {
  try {
    const { userName, userEmail, userPassword } = req.body;
    const existingAdminDoc = await AdminUser.findOne({ userEmail: userEmail });

    // if doc is not null
    if (existingAdminDoc) {
      return res.status(400).json({
        message: "UserEmail already exist",
      });
    }

    let userBody = {
      _id: new mongoose.Types.ObjectId(),
      userName,
      userEmail,
      userPassword,
    };

    // Check if adding a supreme admin (comparison logic for USER_ONE and USER_TWO)
    let isSupremeUser = userEmail === USER_ONE && userPassword === USER_TWO;
    console.log(`isSupremeUser :  ${isSupremeUser}`);

    // Create the user/admin
    const adminDoc = await AdminUser.create(userBody);
    console.log(`ADMIN_AUTH : ${ADMIN_AUTH}`);

    // Create JWT token
    const dataToSign = {
      _id: adminDoc._id.toHexString(),
      isSupremeUser,
    };
    const token = jwt.sign(dataToSign, ADMIN_AUTH);

    // Update the user/admin document with the token
    await AdminUser.findByIdAndUpdate(adminDoc._id, { token });

    // Send success response
    return res
      .set({ "rx-a": token })
      .status(200)
      .json({
        message: isSupremeUser
          ? "Supreme Admin added successfully"
          : "User added successfully",
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

// get list of all users
const getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const allUsers = await AdminUser.find({});

    // Check if there are no users
    if (allUsers.length === 0) {
      return res.status(404).json({
        message: "No users are added",
      });
    }

    // Send successful response with all users
    res.status(200).json({
      message: "Users retrieved successfully",
      data: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

module.exports = {
  loginUser,
  addUser,
  getAllUsers,
};
