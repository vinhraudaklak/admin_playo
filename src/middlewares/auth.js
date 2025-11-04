import jwt from "jsonwebtoken";
import AppConfig from "../config/index.js";
import db from "../database/models/index.js";

const { User } = db;

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      console.warn("⚠️ Thiếu Authorization header");
      return res.status(401).json({ message: "Thiếu Authorization header" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
      console.warn("⚠️ Không tìm thấy token trong header");
      return res.status(401).json({ message: "Không tìm thấy token trong header" });
    }

    // ✅ Giải mã token
    const decoded = jwt.verify(token, AppConfig.jwt.secret);

    if (!decoded || !decoded.id) {
      console.error("❌ Token không chứa id:", decoded);
      return res.status(401).json({ message: "Token không hợp lệ hoặc không có id" });
    }

    // ✅ Lấy user từ DB
    const user = await User.findByPk(decoded.id);

    if (!user) {
      console.error("❌ Không tìm thấy user:", decoded.id);
      return res.status(401).json({ message: "User không tồn tại hoặc token hết hạn" });
    }

    // ✅ Gắn user vào req
    req.user = {
      id: user.id.toString(),
      email: user.email,
      role: user.role,
    };

    console.log("✅ Authenticated user:", req.user);

    next();
  } catch (err) {
    console.error("❌ authMiddleware error:", err.message);
    res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
};
