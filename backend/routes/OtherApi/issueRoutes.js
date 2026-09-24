const express = require("express");
const { submitIssue } = require("../../controllers/Other/issueController");

const router = express.Router();

// Route for submitting a grievance
router.post("/submit", submitIssue);

module.exports = router;
