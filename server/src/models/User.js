const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    avatar: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.avatar) {
    this.avatar = `https://avatar.iran.liara.run/username?username=${this.username}`;
  }
});

module.exports = mongoose.model("User", userSchema);
