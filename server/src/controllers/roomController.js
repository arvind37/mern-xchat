const Room = require("../models/Room");

/**
 * Create or return existing room
 * ALSO update updatedAt so it becomes the latest room
 */
exports.initRoom = async (req, res) => {
  const { otheruser } = req.body;

  // 1️⃣ Check if room already exists
  let room = await Room.findOne({
    users: { $all: [req.user._id, otheruser] },
  });

  // 2️⃣ Create only if not exists
  if (!room) {
    room = await Room.create({
      users: [req.user._id, otheruser],
    });
  }

  // 3️⃣ 🔥 VERY IMPORTANT: update timestamp
  await Room.findByIdAndUpdate(room._id, { updatedAt: Date.now() });

  res.json({ success: true, data: room });
};

/**
 * Get user rooms SORTED by updatedAt (latest first)
 */
exports.userRooms = async (req, res) => {
  const rooms = await Room.find({ users: req.user._id })
    .sort({ updatedAt: -1 }); // 🔥 CRITICAL

  res.json({ success: true, data: rooms });
};
