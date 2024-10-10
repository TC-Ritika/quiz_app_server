const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { ADMIN_USER } = require("../../utils/constants");
const Schema = mongoose.Schema;
const AdminUserSchema = Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Entered userEmail is not a valid email",
    },
  },
  userPassword: {
    type: String,
    required: true,
  },
  token: { type: String },
});

// Password hashing before saving
AdminUserSchema.pre("save", async function (next) {
  if (!this.isModified("userPassword")) return next();

  const salt = await bcrypt.genSalt(10);
  this.userPassword = await bcrypt.hash(this.userPassword, salt);
  next();
});

// Method to compare password for login
AdminUserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.userPassword);
};

const AdminUser = mongoose.model(ADMIN_USER, AdminUserSchema);
module.exports = { AdminUser };
