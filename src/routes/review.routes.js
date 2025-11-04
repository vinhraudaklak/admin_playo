import express from "express";
import {
	createReview,
	getAllReviews,
	getReviewById,
	updateReview,
	deleteReview,
} from "../controllers/review.controller.js";
import { authMiddleware } from "../middlewares/index.js";
import { validate } from "../middlewares/validate.js";
import {
	createReviewSchema,
	updateReviewSchema,
} from "../validators/review.validator.js";

const router = express.Router();

router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.post("/", authMiddleware, validate(createReviewSchema), createReview);
router.put("/:id", authMiddleware, validate(updateReviewSchema), updateReview);
router.delete("/:id", authMiddleware, deleteReview);

export default router;
