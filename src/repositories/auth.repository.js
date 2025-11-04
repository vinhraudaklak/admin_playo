import db from "../database/models/index.js";
const User = db.User;

export const findByEmail = async (email) => {
  return await User.findOne({
    where: { email },
    attributes: ["id", "name", "email", "password", "role", "phone"],
  });
};

export const findById = async (id) => {
  return await User.findByPk(id, {
    attributes: ["id", "name", "email", "role", "phone"],
  });
};
