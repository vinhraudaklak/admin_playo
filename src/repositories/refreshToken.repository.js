import db from "../database/models/index.js";

const RefreshToken = db.RefreshToken;

export const create = async (data) => RefreshToken.create(data);

export const findByToken = async (token) => RefreshToken.findOne({ where: { token } });

export const findAll = async () => RefreshToken.findAll();

export const remove = async (id) => {
  const refresh = await RefreshToken.findByPk(id);
  if (!refresh) return null;
  await refresh.destroy();
  return true;
};

export const removeByUserId = async (userId) => {
  return await RefreshToken.destroy({ where: { userId } });
};
