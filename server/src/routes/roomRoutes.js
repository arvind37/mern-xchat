const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  initRoom,
  userRooms,
} = require("../controllers/roomController");

router.post("/init", protect, initRoom);
router.get("/userrooms", protect, userRooms);

module.exports = router;
