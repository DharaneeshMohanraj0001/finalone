const express = require("express");
const router = express.Router();
const Message = require("../models/message");
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

    // 1️⃣ SAVE TO MONGODB (CRITICAL)
    const savedMessage = await Message.create({
      name,
      email,
      mobile,
      subject,
      message,
    });

    console.log("✅ Message saved to MongoDB:", savedMessage._id);

    // 2️⃣ RESPOND TO FRONTEND IMMEDIATELY
    res.status(201).json({
      success: true,
      message: "Message saved successfully ✅",
    });

    // 3️⃣ SEND EMAIL (NON-BLOCKING)
    try {
      await sendEmail({ name, email, mobile, subject, message });
      console.log("📧 Email sent successfully");
    } catch (emailErr) {
      console.error("❌ Email failed:", emailErr.message);
    }

  } catch (error) {
    console.error("❌ Contact API error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
