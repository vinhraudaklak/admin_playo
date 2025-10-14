import { RefreshTokenRepository, UserRepository } from "../repositories/index.js";
import jwt from "jsonwebtoken";
import AppConfig from "../config/index.js";

export const getAllRefreshTokens = async () => RefreshTokenRepository.findAll();

export const getRefreshTokenById = async (id) => RefreshTokenRepository.findById(id);

export const createRefreshToken = async (userId) => {
  const user = await UserRepository.findById(userId);
  if (!user) throw new Error("User not found");

  const token = jwt.sign({ id: user.id }, AppConfig.jwt.refreshSecret, {
    expiresIn: AppConfig.jwt.refreshExpiration,
  });

  return RefreshTokenRepository.create({
    userId,
    token,
    expiryDate: new Date(Date.now() + AppConfig.jwt.refreshExpirationMs),
  });
};

export const deleteRefreshToken = async (id) => RefreshTokenRepository.remove(id);
