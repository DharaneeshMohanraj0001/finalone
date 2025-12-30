const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const sendEmail = require("../utils/sendEmail");

// POST /api/contact
router.post("/contact", async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    if (!name || !email || !mobile || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 1️⃣ Save to MongoDB
    await Message.create({
      name,
      email,
      mobile,
      subject,
      message,
    });

    // 2️⃣ Send email to your Gmail
    await sendEmail({ name, email, mobile, subject, message });

    // 3️⃣ Respond to frontend
    res.status(201).json({
      success: true,
      message: "Message saved & email sent 🚀",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
