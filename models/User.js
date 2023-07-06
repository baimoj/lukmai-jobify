import mongoose from "mongoose";
import validator from "validator";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "กรุณา ใส่ ชื่อ"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "กรุณา ใส่  อีเมล์"],
    validate: {
      validator: validator.isEmail,
      message: "อีเมล์ ซ้ำ",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "กรุณา ใส่  รหัสผ่าน"],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "lastName",
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: "my city",
  },
});

UserSchema.pre("save", async function () {
  //console.log(this.isModified("password"));
  //isModified("password")  ถ้า  register จะเป็น true
  if (!this.isModified("password")) return;

  //hash  password  เข้า รหัส ไว้
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Compare json web token
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

//Compare Password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  // console.log("candiddate Pass :", candidatePassword);
  //console.log("this pass :", this.password);
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
