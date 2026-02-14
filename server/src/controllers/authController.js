const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

exports.registerUser = async (req, res) => {
  const { fullName, username, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({ success: false });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    username,
    email,
    password: hashed,
  });

  res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    },
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
  return res.status(404).json({ success: false, message: "User not found" });
}

const match = await bcrypt.compare(password, user.password);
if (!match) {
  return res.status(401).json({ success: false, message: "Invalid password" });
}

  const accessToken = generateToken(user._id);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "strict",
  });

  res.json({
    success: true,
    data: {
      accessToken,
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      },
    },
  });
};

exports.logoutUser = (req, res) => {
  res.clearCookie("accessToken");
  res.json({ success: true });
};
