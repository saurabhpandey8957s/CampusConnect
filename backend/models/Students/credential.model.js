/*const mongoose = require("mongoose");

const studentCredential = new mongoose.Schema({
  loginid: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Student Credential", studentCredential);*/




/*const mongoose = require("mongoose");

const studentCredential = new mongoose.Schema({
  loginid: {
    type: Number,
    required: true,
    unique: true, // ✅ prevent duplicate login IDs
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("StudentCredential", studentCredential); // ✅ no space in model name*/



const mongoose = require("mongoose");

const studentCredential = new mongoose.Schema({
  loginid: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("StudentCredential", studentCredential);


