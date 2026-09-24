/*const express = require("express");
const Attendance = require("../../models/Other/Attendance");
const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");// Middleware for authentication & role check
const router = express.Router();

// 📌 Faculty Marks Attendance
router.post("/mark", verifyToken, checkRole("faculty"), async (req, res) => {
  try {
    const { studentId, status } = req.body;

    const attendance = new Attendance({
      studentId,
      status,
      markedBy: req.user.id, // Faculty ID from JWT
    });

    await attendance.save();
    res.status(201).json({ message: "Attendance marked successfully", attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Faculty Edits Attendance
router.put("/edit/:id", verifyToken, checkRole("faculty"), async (req, res) => {
  try {
    const { status } = req.body;
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) return res.status(404).json({ message: "Attendance record not found" });

    attendance.status = status;
    await attendance.save();
    res.json({ message: "Attendance updated successfully", attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Student Views Attendance
router.get("/view", verifyToken, checkRole("student"), async (req, res) => {
  try {
    const attendance = await Attendance.find({ studentId: req.user.id });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;*/








/*const express = require("express");
const Attendance = require("../../models/Other/Attendance");

//const Student = require("../../models/Auth/Student"); // ✅ Import Student Model
const Student = require("../../models/Students/credential.model");
const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");

const router = express.Router();

// ✅ Fetch Students (Required by frontend)
router.get("/fetchstudents", verifyToken, checkRole("faculty"), async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 📌 Mark Attendance
router.post("/mark", verifyToken, checkRole("faculty"), async (req, res) => {
  try {
    const { studentId, status } = req.body;

    const attendance = new Attendance({
      studentId,
      status,
      markedBy: req.user.id,
    });

    await attendance.save();
    res.status(201).json({ message: "Attendance marked successfully", attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 Edit Attendance
router.put("/edit/:id", verifyToken, checkRole("faculty"), async (req, res) => {
  try {
    const { status } = req.body;
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) return res.status(404).json({ message: "Attendance record not found" });

    attendance.status = status;
    await attendance.save();
    res.json({ message: "Attendance updated successfully", attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 View Attendance (for student)
router.get("/view", verifyToken, checkRole("student"), async (req, res) => {
  try {
    const attendance = await Attendance.find({ studentId: req.user.id });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;*/












const express = require("express");
const Attendance = require("../../models/Other/Attendance");
const Student = require("../../models/Students/credential.model");
const { verifyToken, checkRole } = require("../../middlewares/authMiddleware");

const router = express.Router();

// ✅ Fetch all students
router.get("/fetchstudents", verifyToken, checkRole("faculty"), async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Mark multiple attendances
router.post("/mark", verifyToken, checkRole("faculty"), async (req, res) => {
  try {
    const attendanceArray = req.body;

    const records = attendanceArray.map((entry) => ({
      studentId: entry.studentId,
      status: entry.status,
      date: entry.date || new Date().toISOString().split("T")[0],
      markedBy: req.user.id,
    }));

    await Attendance.insertMany(records);

    res.status(201).json({ success: true, message: "Attendance submitted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Optional: Edit attendance
router.put("/edit/:id", verifyToken, checkRole("faculty"), async (req, res) => {
  try {
    const { status } = req.body;
    const attendance = await Attendance.findById(req.params.id);

    if (!attendance) return res.status(404).json({ message: "Record not found" });

    attendance.status = status;
    await attendance.save();

    res.json({ message: "Attendance updated", attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ View student's own attendance
router.get("/view", verifyToken, checkRole("student"), async (req, res) => {
  try {
    const attendance = await Attendance.find({ studentId: req.user.id });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

