const express = require("express");
const router = express.Router();

const { enrollCourse, getMyCourses, unenrollCourse,} = require("../controllers/enrollmentController");

const authMiddleware = require("../middleware/authMiddleware");
const { isStudent } = require("../middleware/roleMiddleware");

// Student Routes
// Enroll in a course
router.post("/",authMiddleware,isStudent,enrollCourse);

// Get all enrolled courses
router.get( "/my",authMiddleware,isStudent,getMyCourses);

// Unenroll from a course
router.delete("/:id",authMiddleware,isStudent,unenrollCourse);

module.exports = router;