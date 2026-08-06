const Review = require("../models/Review");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");


exports.addReview = async (req, res) => {

    try {
        const { courseId, rating, comment } = req.body;
        // Check required fields
        if (!courseId || !rating || !comment) {
            return res.status(400).json({
                success: false,
                message: "Please provide all fields"
            });
        }
        // Check if course exists
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        // Check enrollment
        const enrolled = await Enrollment.findOne({
            studentId: req.user._id,
            courseId: courseId
        });

        if (!enrolled) {
            return res.status(403).json({
                success: false,
                message: "Enroll in the course before reviewing"
            });
        }

        // Check duplicate review
        const alreadyReviewed = await Review.findOne({
            studentId: req.user._id,
            courseId: courseId
        });

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this course"
            });
        }

        // Create Review
        const review = await Review.create({
            studentId: req.user._id,
            courseId,
            rating,
            comment

        });

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            review
        });

    }

    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error"

        });

    }

};

// Get Reviews of a Course

exports.getCourseReviews = async (req, res) => {

    try {

        const reviews = await Review.find({

            courseId: req.params.courseId

        })

        .populate("studentId", "name email")

        .sort({ createdAt: -1 });

        res.status(200).json({

            success: true,

            count: reviews.length,

            reviews

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

// Delete Review

exports.deleteReview = async (req, res) => {

    try {

        const review = await Review.findById(req.params.id);

        if (!review) {

            return res.status(404).json({

                success: false,

                message: "Review not found"

            });

        }

        await review.deleteOne();

        res.status(200).json({

            success: true,

            message: "Review deleted successfully"

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};