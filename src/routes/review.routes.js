import express from "express";
import { createReview, getAllReviews, updateReview, deleteReview } from "../controllers/review.controller.js";
import { authMiddleware } from "../middlewares/index.js";
import { validate } from "../middlewares/validate.js";
import { createReviewSchema, updateReviewSchema } from "../validators/index.js";

const router = express.Router();

router.post("/", authMiddleware, validate(createReviewSchema), createReview);
router.get("/", getAllReviews);
router.put("/:id", authMiddleware, validate(updateReviewSchema), updateReview);
router.delete("/:id", authMiddleware, deleteReview);

export default router;
