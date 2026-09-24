/*const facultyDetails = require("../../models/Faculty/details.model.js")

const getDetails = async (req, res) => {
    try {
        let user = await facultyDetails.find(req.body);
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "No Faculty Found" });
        }
        const data = {
            success: true,
            message: "Faculty Details Found!",
            user,
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const addDetails = async (req, res) => {
    try {
        let user = await facultyDetails.findOne({ ID: req.body.ID });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Faculty With This ID Already Exists",
            });
        }
        user = await facultyDetails.create({ ...req.body, profile: req.file.filename });
        const data = {
            success: true,
            message: "Faculty Details Added!",
            user,
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const updateDetails = async (req, res) => {
    try {
        let user;
        if (req.file) {
            user = await facultyDetails.findByIdAndUpdate(req.params.id, { ...req.body, profile: req.file.filename });
        } else {
            user = await facultyDetails.findByIdAndUpdate(req.params.id, req.body);
        }
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Faculty Found",
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
    try {
        let user = await facultyDetails.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Faculty Found",
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
        let user = await facultyDetails.count(req.body);
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






const facultyDetails = require("../../models/Faculty/details.model.js");

const getDetails = async (req, res) => {
  try {
    const { ID } = req.body;

    if (!ID) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    const user = await facultyDetails.find({ ID: Number(ID) });

    if (!user || user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Faculty Found",
      });
    }

    res.json({
      success: true,
      message: "Faculty Details Found!",
      user,
    });
  } catch (error) {
    console.error("❌ Error in getDetails:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const addDetails = async (req, res) => {
  try {
    const existing = await facultyDetails.findOne({ ID: req.body.ID });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Faculty with this ID already exists",
      });
    }

    const newFaculty = new facultyDetails({
      ...req.body,
      profile: req.file ? req.file.filename : "default.jpg",
    });

    await newFaculty.save();

    res.json({
      success: true,
      message: "Faculty Details Added!",
      user: newFaculty,
    });
  } catch (error) {
    console.error("❌ Error in addDetails:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateDetails = async (req, res) => {
  try {
    const updateData = req.file
      ? { ...req.body, profile: req.file.filename }
      : req.body;

    const updated = await facultyDetails.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    res.json({
      success: true,
      message: "Updated Successfully!",
      user: updated,
    });
  } catch (error) {
    console.error("❌ Error in updateDetails:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteDetails = async (req, res) => {
  try {
    const deleted = await facultyDetails.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    res.json({
      success: true,
      message: "Deleted Successfully!",
    });
  } catch (error) {
    console.error("❌ Error in deleteDetails:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getCount = async (req, res) => {
  try {
    const count = await facultyDetails.countDocuments(req.body);
    res.json({
      success: true,
      message: "Count Successful!",
      user: count,
    });
  } catch (error) {
    console.error("❌ Error in getCount:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getDetails,
  addDetails,
  updateDetails,
  deleteDetails,
  getCount,
};
