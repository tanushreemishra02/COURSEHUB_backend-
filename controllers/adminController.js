const User = require("../models/User");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });

    const totalCourses = await Course.countDocuments();

    const totalEnrollments = await Enrollment.countDocuments();

    res.status(200).json({
      totalStudents,
      totalCourses,
      totalEnrollments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard statistics",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};