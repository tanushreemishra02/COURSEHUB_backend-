const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");


// Enroll in a Course

exports.enrollCourse = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { courseId } = req.body;

    // Validate input
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check duplicate enrollment
    const alreadyEnrolled = await Enrollment.findOne({
      studentId,
      courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      studentId,
      courseId,
    });

    res.status(201).json({
      success: true,
      message: "Course enrolled successfully",
      enrollment,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get My Enrolled Courses

exports.getMyCourses = async (req, res) => {
  try {
    const studentId = req.user._id;

    const enrollments = await Enrollment.find({ studentId })
      .populate("courseId");

    res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


// Unenroll from Course

exports.unenrollCourse = async (req, res) => {
  try {

    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    // Student can delete only their own enrollment
    if (enrollment.studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    await Enrollment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Successfully unenrolled",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};