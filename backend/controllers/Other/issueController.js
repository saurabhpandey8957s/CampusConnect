const submitIssue = async (req, res) => {
  try {
    const { title, description } = req.body;

    res.status(200).json({
      success: true,
      message: "Issue submitted successfully",
      data: {
        title,
        description,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { submitIssue };