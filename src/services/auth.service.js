import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Op } from "sequelize";
import AppConfig from "../config/index.js";
import {
  UserRepository,
  AuthRepository,
  RefreshTokenRepository,
} from "../repositories/index.js";
import sendEmail from "../utils/sendEmail.js";

/**
 * 🟢 Đăng nhập
 */
export const login = async ({ email, password }) => {
  const user = await AuthRepository.findByEmail(email);
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  // ✅ Tạo Access Token và Refresh Token
  const accessToken = jwt.sign({ id: user.id }, AppConfig.jwt.secret, {
    expiresIn: AppConfig.jwt.expiresIn,
  });

  const refreshToken = jwt.sign({ id: user.id }, AppConfig.jwt.refreshSecret, {
    expiresIn: AppConfig.jwt.refreshExpiresIn,
  });

  // Xoá mật khẩu khỏi user object trước khi trả về
  const { password: _, ...userWithoutPassword } = user.dataValues || user;

  return {
    message: "Login successful",
    user: userWithoutPassword,
    accessToken,
    refreshToken,
  };
};

/**
 * 🟢 Đăng ký
 */
export const register = async ({ email, password, name, phone }) => {
  const existingUser = await AuthRepository.findByEmail(email);
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserRepository.create({
    email,
    password: hashedPassword,
    name,
    phone,
  });

  return {
    message: "Register successful",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  };
};

/**
 * 🟢 Làm mới token
 */
export const refreshToken = async (token) => {
  if (!token) throw new Error("Refresh token required");

  const savedToken = await RefreshTokenRepository.findByToken(token);
  if (!savedToken) throw new Error("Invalid refresh token");

  const decoded = jwt.verify(token, AppConfig.jwt.refreshSecret);
  const newAccessToken = jwt.sign({ id: decoded.id }, AppConfig.jwt.secret, {
    expiresIn: AppConfig.jwt.expiresIn,
  });

  return {
    message: "Token refreshed successfully",
    data: { accessToken: newAccessToken },
  };
};

/**
 * 🟢 Đăng xuất
 */
export const logout = async (token) => {
  if (!token) throw new Error("Refresh token required");

  const savedToken = await RefreshTokenRepository.findByToken(token);
  if (!savedToken) throw new Error("Invalid refresh token");

  await savedToken.destroy();

  return { message: "Logout successful" };
};

/**
 * 🟢 Quên mật khẩu (Gửi email đặt lại)
 */
export const forgotPassword = async (email) => {
  const user = await AuthRepository.findByEmail(email);
  if (!user) {
    // Không tiết lộ thông tin user tồn tại hay không
    return { message: "Nếu email tồn tại, liên kết đặt lại mật khẩu đã được gửi." };
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 phút
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  const message = `
Bạn đã yêu cầu đặt lại mật khẩu.
Nhấp vào liên kết bên dưới để đặt lại mật khẩu:
${resetUrl}

Liên kết có hiệu lực trong 15 phút.`;

  await sendEmail(user.email, "Đặt lại mật khẩu Playo", message);

  return { message: "Nếu email tồn tại, liên kết đặt lại mật khẩu đã được gửi." };
};

/**
 * 🟢 Đặt lại mật khẩu (Reset Password)
 */
export const resetPassword = async (token, newPassword) => {
  const user = await UserRepository.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { [Op.gt]: new Date() },
    },
  });

  if (!user) throw new Error("Token không hợp lệ hoặc đã hết hạn");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  return { message: "Đặt lại mật khẩu thành công!" };
};
