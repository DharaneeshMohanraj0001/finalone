const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// GET all messages (Admin only - read-only)
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
});

module.exports = router;
