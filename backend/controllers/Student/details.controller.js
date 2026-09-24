/*const studentDetails = require("../../models/Students/details.model.js")*/






/*const getDetails = async (req, res) => {
    try {
        let user = await studentDetails.find(req.body);
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "No Student Found" });
        }
        const data = {
            success: true,
            message: "Student Details Found!",
            user,
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}*/



/*const getDetails = async (req, res) => {
    try {
        const query = req.body.enrollmentNo
            ? { enrollmentNo: req.body.enrollmentNo }
            : { _id: req.body.id };

        let user = await studentDetails.find(query);
        if (!user || user.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No Student Found",
            });
        }

        res.json({
            success: true,
            message: "Student Details Found!",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



const updateDetails = async (req, res) => {
    try {
        let user;
        if (req.file) {
            user = await studentDetails.findByIdAndUpdate(req.params.id, { ...req.body, profile: req.file.filename });
        } else {
            user = await studentDetails.findByIdAndUpdate(req.params.id, req.body);
        }
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Student Found",
            });
        }
        const data = {
            success: true,
            message: "Updated Successfull!",
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteDetails = async (req, res) => {
    let { id } = req.body;
    try {
        let user = await studentDetails.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Student Found",
            });
        }
        const data = {
            success: true,
            message: "Deleted Successfull!",
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getCount = async (req, res) => {
    try {
        let user = await studentDetails.count(req.body);
        const data = {
            success: true,
            message: "Count Successfull!",
            user,
        };
        res.json(data);
    } catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Internal Server Error", error });
    }
}

module.exports = { getDetails, addDetails, updateDetails, deleteDetails, getCount }*/














const studentDetails = require("../../models/Students/details.model.js");
const mongoose = require("mongoose");

// ✅ Get Details (by enrollmentNo or id)

/*const getDetails = async (req, res) => {
    try {
        console.log("📥 Incoming body:", req.body);

        let query = {};

        if (req.body.enrollmentNo) {
            query = { enrollmentNo: req.body.enrollmentNo };
        } else if (req.body.id) {
            // Validate ObjectId
            if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
                console.log("❌ Invalid ObjectId:", req.body.id);
                return res.status(400).json({
                    success: false,
                    message: "Invalid student ID format",
                });
            }
            query = { _id: req.body.id };
        } else {
            return res.status(400).json({
                success: false,
                message: "No identifier provided (enrollmentNo or id)",
            });
        }

        console.log("🔍 Running query:", query);

        const user = await studentDetails.find(query);
        console.log("✅ Query result:", user);

        if (!user || user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Student Found",
            });
        }

        return res.json({
            success: true,
            message: "Student Details Found!",
            user,
        });

    } catch (error) {
        console.error("🔥 Error in getDetails:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};*/




const getDetails = async (req, res) => {
    try {
        console.log("📥 Incoming body:", req.body);

        let query = {};

        if (req.body.enrollmentNo) {
            query = { enrollmentNo: req.body.enrollmentNo };
        } else if (req.body.id) {
            if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
                console.log("❌ Invalid ObjectId:", req.body.id);
                return res.status(400).json({
                    success: false,
                    message: "Invalid student ID format",
                });
            }
            query = { _id: req.body.id };
        } else if (req.body.branch && req.body.semester) {
            query = {
                branch: req.body.branch,
                semester: req.body.semester
            };
        } else {
            return res.status(400).json({
                success: false,
                message: "No valid filter provided (enrollmentNo, id, or branch & semester)",
            });
        }

        console.log("🔍 Running query:", query);

        const user = await studentDetails.find(query);
        console.log("✅ Query result:", user);

        if (!user || user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Student Found",
            });
        }

        return res.json({
            success: true,
            message: "Student Details Found!",
            user,
        });

    } catch (error) {
        console.error("🔥 Error in getDetails:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};









// ✅ Add Details (with image)
const addDetails = async (req, res) => {
    try {
        const existing = await studentDetails.findOne({ enrollmentNo: req.body.enrollmentNo });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Student With This Enrollment Already Exists",
            });
        }

        const newStudent = await studentDetails.create({
            ...req.body,
            profile: req.file?.filename || "default-avatar.png"
        });

        res.json({
            success: true,
            message: "Student Details Added!",
            user: newStudent,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ Update Details (optionally with image)
const updateDetails = async (req, res) => {
    try {
        const updateData = req.file
            ? { ...req.body, profile: req.file.filename }
            : req.body;

        const user = await studentDetails.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Student Found",
            });
        }

        res.json({
            success: true,
            message: "Updated Successfully!",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ Delete Details
const deleteDetails = async (req, res) => {
    try {
        const user = await studentDetails.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Student Found",
            });
        }

        res.json({
            success: true,
            message: "Deleted Successfully!",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// ✅ Get Count (by filters if any)
const getCount = async (req, res) => {
    try {
        const count = await studentDetails.countDocuments(req.body);
        res.json({
            success: true,
            message: "Count Successful!",
            user: count,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { getDetails, addDetails, updateDetails, deleteDetails, getCount };
