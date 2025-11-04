import { Op, QueryTypes } from "sequelize";
import db from "../database/models/index.js";

class ReviewRepository {
  constructor() {
    this.model = db.Review;
  }

  // 🧭 Phân trang + tìm kiếm
  async findAll(query) {
    const {
      page = 1,
      pageSize = 10,
      search = "",
      sortField = "createdAt",
      sortOrder = "DESC",
    } = query;

    const limit = Math.max(parseInt(pageSize), 1);
    const offset = (Math.max(parseInt(page), 1) - 1) * limit;

    const where = search
      ? {
          comment: { [Op.like]: `%${search}%` },
        }
      : {};

    const count = await this.model.count({ where });

    const rows = await db.sequelize.query(
      `
        SELECT id, bookingId, userId, venueId, rating, comment, createdAt, updatedAt
        FROM reviews
        WHERE comment LIKE $search
        ORDER BY ${sortField} ${sortOrder}
        LIMIT $offset, $limit
      `,
      {
        bind: { search: `%${search}%`, offset, limit },
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
  }

  async findById(id) {
    return this.model.findByPk(id, {
      include: [
        { model: db.User, as: "user", attributes: ["id", "name", "email"] },
        { model: db.Venue, as: "venue", attributes: ["id", "name"] },
        { model: db.Booking, as: "booking" },
      ],
    });
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    const review = await this.model.findByPk(id);
    if (!review) return null;
    return review.update(data);
  }

  async remove(id) {
    const review = await this.model.findByPk(id);
    if (!review) return null;
    return review.destroy();
  }
}

export default new ReviewRepository();
