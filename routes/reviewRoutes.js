const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { isAdmin, isStudent } = require("../middleware/roleMiddleware");

const {
  addReview,
  getCourseReviews,
  deleteReview,
} = require("../controllers/reviewController");

// Add Review (Student Only)

router.post(
  "/",
  authMiddleware,
  isStudent,
  addReview
);

// Get Reviews of a Course (Public)

router.get(
  "/:courseId",
  getCourseReviews
);

// Delete Review (Admin Only)

router.delete(
  "/:id",
  authMiddleware,
  isAdmin,
  deleteReview
);

module.exports = router;