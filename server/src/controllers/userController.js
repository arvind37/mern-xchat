const User = require("../models/User");

exports.getMe = (req, res) => {
  res.json({ success: true, data: req.user });
};

exports.searchUsers = async (req, res) => {
  const { searchTerm } = req.query;

  const users = await User.find({
    username: { $regex: searchTerm, $options: "i" },
  }).select("-password");

  res.json({ success: true, data: users });
};
