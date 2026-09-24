/*const connectToMongo = require("./Database/db");
const express = require("express");
const app = express();
const path = require("path")
connectToMongo();
const port = process.env.PORT || 5001;
var cors = require("cors");
const attendanceRoutes = require("./routes/FacultyApi/attendanceRoutes");
app.use(cors({
  origin: process.env.FRONTEND_API_LINK
}));
const chatbotRoutes = require("./routes/Other Api/chatbotRoutes");
const issueRoutes = require("./routes/Other Api/issueRoutes");

app.use(express.json()); //to convert request data to json

app.get("/", (req, res) => {
  res.send("Hello 👋 I am Working Fine 🚀")
})

app.use('/media', express.static(path.join(__dirname, 'media')));


// Credential Apis
app.use("/api/student/auth", require("./routes/StudentApi/credential.route"));
app.use("/api/faculty/auth", require("./routes/FacultyApi/credential.route"));
app.use("/api/admin/auth", require("./routes/Admin Api/credential.route"));
// Details Apis
app.use("/api/student/details", require("./routes/StudentApi/details.route"));
app.use("/api/faculty/details", require("./routes/FacultyApi/details.route"));
app.use("/api/admin/details", require("./routes/Admin Api/details.route"));
// Other Apis
app.use("/api/timetable", require("./routes/Other Api/timetable.route"));
app.use("/api/material", require("./routes/Other Api/material.route"));
app.use("/api/notice", require("./routes/Other Api/notice.route"));
app.use("/api/subject", require("./routes/Other Api/subject.route"));
app.use("/api/marks", require("./routes/Other Api/marks.route"));
app.use("/api/branch", require("./routes/Other Api/branch.route"));
app.use("/api/attendance", attendanceRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/issues", issueRoutes);
app.listen(port, () => {
  console.log(`Server Listening On http://localhost:${port}`);
});*/

const connectToMongo = require("./Database/db");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectToMongo();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_API_LINK || "http://localhost:3000", // fallback for dev
  }),
);
app.use(express.json());

app.use("/media", express.static(path.join(__dirname, "media")));

// Health Check Route
app.get("/", (req, res) => {
  res.send("✅ Server is running fine.");
});

// 📌 Credential APIs
app.use("/api/student/auth", require("./routes/StudentApi/credential.route"));
app.use("/api/faculty/auth", require("./routes/FacultyApi/credential.route"));
app.use("/api/admin/auth", require("./routes/AdminApi/credential.route"));

// 📌 Details APIs
app.use("/api/student/details", require("./routes/StudentApi/details.route"));
app.use("/api/faculty/details", require("./routes/FacultyApi/details.route"));
app.use("/api/admin/details", require("./routes/AdminApi/details.route"));

// 📌 Other APIs
app.use("/api/timetable", require("./routes/otherApi/timetable.route"));
app.use("/api/material", require("./routes/otherApi/material.route"));
app.use("/api/notice", require("./routes/otherApi/notice.route"));
app.use("/api/subject", require("./routes/otherApi/subject.route"));
app.use("/api/marks", require("./routes/otherApi/marks.route"));
app.use("/api/branch", require("./routes/otherApi/branch.route"));
app.use("/api/attendance", require("./routes/facultyApi/attendanceRoutes"));
app.use("/api/chatbot", require("./routes/otherApi/chatbotRoutes"));
app.use("/api/issues", require("./routes/otherApi/issueRoutes"));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
