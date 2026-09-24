const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin/credential.model");
const Faculty = require("../models/Faculty/credential.model");
const Student = require("../models/Students/credential.model");

// Middleware to verify token
// const verifyToken = async (req, res, next) => {
//     const token = req.header("Authorization");
//     if (!token) return res.status(401).json({ message: "Access Denied" });

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);

//         // Check if the user exists in any of the models
//         let user = await Admin.findById(verified.id)
//             || await Faculty.findById(verified.id)
//             || await Student.findById(verified.id);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         req.user = { id: user._id, role: user.role }; // Attach user info to request
//         next();
//     } catch (err) {
//         res.status(400).json({ message: "Invalid Token" });
//     }
// };

// const verifyToken = async (req, res, next) => {
//   const authHeader = req.header("Authorization");

//   if (!authHeader) {
//     return res.status(401).json({ message: "Access Denied" });
//   }

//   // Remove "Bearer " if present
//   const token = authHeader.startsWith("Bearer ")
//     ? authHeader.substring(7)
//     : authHeader;

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);

//     let user =
//       (await Admin.findById(verified.id)) ||
//       (await Faculty.findById(verified.id)) ||
//       (await Student.findById(verified.id));

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     req.user = {
//       id: user._id,
//       role: user.role,
//     };

//     next();
//   } catch (err) {
//     console.log(err);
//     return res.status(401).json({ message: "Invalid Token" });
//   }
// };

const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied - No Header" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : authHeader;

  console.log("Extracted Token:", token);

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified JWT:", verified);

    let user =
      (await Admin.findById(verified.id)) ||
      (await Faculty.findById(verified.id)) ||
      (await Student.findById(verified.id));

    console.log("User Found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = {
      id: user._id,
      role: user.role,
    };

    console.log("req.user:", req.user);

    next();
  } catch (err) {
    console.log("JWT Error:", err.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

// Middleware to check user role
const checkRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  next();
};

module.exports = { verifyToken, checkRole };
