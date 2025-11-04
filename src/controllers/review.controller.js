import ReviewService from "../services/review.service.js";

export const getAllReviews = async (req, res) => {
  try {
    const result = await ReviewService.findAll(req.query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const review = await ReviewService.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const review = await ReviewService.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const updated = await ReviewService.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await ReviewService.remove(req.params.id);
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
