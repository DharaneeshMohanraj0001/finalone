const express = require("express");
const router = express.Router();
const Message = require("../models/message");
const sendEmail = require("../utils/sendEmail");

// POST /api/contact
router.post("/contact", async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    // 1️⃣ Validate input
    if (!name || !email || !mobile || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ SAVE TO MONGODB (MOST IMPORTANT)
    const savedMessage = await Message.create({
      name,
      email,
      mobile,
      subject,
      message,
    });

    // 3️⃣ TRY TO SEND EMAIL (OPTIONAL – SHOULD NOT BREAK APP)
    try {
      await sendEmail({
        name,
        email,
        mobile,
        subject,
        message,
      });
    } catch (emailError) {
      console.error("❌ Email sending failed:", emailError.message);
      // ❗ DO NOT return error here
    }

    // 4️⃣ ALWAYS RESPOND SUCCESS TO FRONTEND
    res.status(201).json({
      success: true,
      message: "Message saved successfully ✅",
      data: savedMessage,
    });

  } catch (error) {
    console.error("❌ Contact API error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
