import jwt from "jsonwebtoken";
import AppConfig from "../config/index.js";
import db from "../database/models/index.js";

const { User, Role, UserRole } = db;

/**
 * Middleware xác thực JWT
 * - Kiểm tra token hợp lệ
 * - Gắn user vào req.user
 * - Kèm theo roles của user
 */
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // format: "Bearer <token>"

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, AppConfig.jwt.secret);

    // Tìm user
    const user = await User.findByPk(decoded.id, {
      include: [
        {
          model: Role,
          through: { attributes: [] }, // bỏ qua UserRole
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Gắn thông tin user vào request
    req.user = {
      id: user.id,
      email: user.email,
      roles: user.Roles.map((r) => r.name), // ["admin", "manager", "player"]
    };

    next();
  } catch (err) {
    console.error("authMiddleware error:", err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
