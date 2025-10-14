import db from "../database/models/index.js";

const Profile = db.Profile;

export const create = async (data) => Profile.create(data);

export const findById = async (id) => Profile.findByPk(id);

export const findByUserId = async (userId) =>
  Profile.findOne({ where: { userId } });

export const findAll = async () => Profile.findAll();

export const update = async (id, data) => {
  const profile = await Profile.findByPk(id);
  if (!profile) return null;
  return profile.update(data);
};

export const remove = async (id) => {
  const profile = await Profile.findByPk(id);
  if (!profile) return null;
  await profile.destroy();
  return true;
};