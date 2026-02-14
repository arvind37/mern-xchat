console.log("SERVER.JS STARTED");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const connectDB = require("./config/db");

dotenv.config();

// CONNECT DATABASE
connectDB();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
