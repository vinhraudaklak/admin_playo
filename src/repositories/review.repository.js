import { Op, QueryTypes } from "sequelize";
import db from "../database/models/index.js";

class ReviewRepository {
  constructor() {
    this.model = db.Review;
  }

  async getAllReviews(req) {
    try {
      const {
        page = 1,
        pageSize = 5,
        search = "",
        sortField = "createdAt",
        sortOrder = "DESC",
      } = req.query;

      const limit = Math.max(parseInt(pageSize), 1);
      const offset = (Math.max(parseInt(page), 1) - 1) * limit;

      const count = await this.model.count({
        where: {
          [Op.or]: {
            comment: { [Op.like]: `%${search}%` },
          },
        },
      });

      const rows = await db.sequelize.query(
        `
          SELECT id, userId, fieldId, rating, comment, createdAt, updatedAt
          FROM reviews
          WHERE comment LIKE $search
          ORDER BY ${sortField} ${sortOrder}
          LIMIT $offset, $limit
        `,
        {
          bind: { limit, offset, search: `%${search}%` },
          type: QueryTypes.SELECT,
        }
      );

      return {
        data: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          pageSize: limit,
          totalPages: Math.ceil(count / limit) || 1,
        },
      };
    } catch (error) {
      throw new Error("Error fetching reviews: " + error.message);
    }
  }

  async getReviewById(id) {
    try {
      return await this.model.findByPk(id);
    } catch (error) {
      throw new Error("Error fetching review: " + error.message);
    }
  }

  async createReview(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw new Error("Error creating review: " + error.message);
    }
  }

  async editReview(id, data) {
    try {
      const review = await this.getReviewById(id);
      if (!review) throw new Error("Review not found");
      return await review.update(data);
    } catch (error) {
      throw new Error("Error updating review: " + error.message);
    }
  }

  async deleteReview(id) {
    try {
      const review = await this.getReviewById(id);
      if (!review) throw new Error("Review not found");
      return await review.destroy();
    } catch (error) {
      throw new Error("Error deleting review: " + error.message);
    }
  }
}

export default ReviewRepository;
