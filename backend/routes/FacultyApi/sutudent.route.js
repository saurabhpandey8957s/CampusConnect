const express = require("express");
const router = express.Router();
const User = require("../../models/User"); // Ensure this is your student model

// GET /api/students - Fetch all students (or filtered by faculty, if needed)
router.get("/", async (req, res) => {
  try {
    const students = await User.find({ role: "student" }); // Adjust if 'role' isn't present
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

