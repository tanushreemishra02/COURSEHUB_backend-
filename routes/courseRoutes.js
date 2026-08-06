const express = require("express");

const router = express.Router();

const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse,} = require("../controllers/courseController");

const verifyToken = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

// Public/Protected Read Routes
router.get("/", verifyToken, getAllCourses);
router.get("/:id", verifyToken, getCourseById);

// Admin Routes
router.post("/", verifyToken, isAdmin, createCourse);
router.put("/:id", verifyToken, isAdmin, updateCourse);
router.delete("/:id", verifyToken, isAdmin, deleteCourse);

module.exports = router;
