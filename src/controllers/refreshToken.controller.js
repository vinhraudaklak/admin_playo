import { refreshTokenService } from "../services/index.js";

export const getAllRefreshTokens = async (req, res) => {
  try {
    const tokens = await RefreshTokenRepository.findAll();
    return res.json(tokens);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getRefreshTokenById = async (req, res) => {
  try {
    const token = await RefreshTokenRepository.findById(req.params.id);
    if (!token) return res.status(404).json({ message: "RefreshToken not found" });
    return res.json(token);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const createRefreshToken = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserRepository.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user.id }, AppConfig.jwt.refreshSecret, {
      expiresIn: AppConfig.jwt.refreshExpiration,
    });

    const refreshToken = await RefreshTokenRepository.create({
      userId,
      token,
      expiryDate: new Date(Date.now() + AppConfig.jwt.refreshExpirationMs),
    });

    return res.status(201).json(refreshToken);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteRefreshToken = async (req, res) => {
  try {
    const deleted = await RefreshTokenRepository.remove(req.params.id);
    if (!deleted) return res.status(404).json({ message: "RefreshToken not found" });
    return res.json({ message: "RefreshToken deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
