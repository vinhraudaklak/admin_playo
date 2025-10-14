import { ReviewService } from "../services/index.js";

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewRepository.findAll();
    return res.json(reviews);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await ReviewRepository.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    return res.json(review);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { fieldId, userId, rating, comment } = req.body;

    const field = await FieldRepository.findById(fieldId);
    if (!field) return res.status(404).json({ message: "Field not found" });

    const user = await UserRepository.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const review = await ReviewRepository.create({
      fieldId,
      userId,
      rating,
      comment,
    });

    return res.status(201).json(review);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const updated = await ReviewRepository.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Review not found" });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const deleted = await ReviewRepository.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Review not found" });
    return res.json({ message: "Review deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
