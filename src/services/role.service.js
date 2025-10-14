import { RoleRepository } from "../repositories/index.js";

export const getAllRoles = async () => RoleRepository.findAll();

export const getRoleById = async (id) => RoleRepository.findById(id);

export const createRole = async (data) => RoleRepository.create(data);

export const updateRole = async (id, data) => RoleRepository.update(id, data);

export const deleteRole = async (id) => RoleRepository.remove(id);

export const getRoleByName = async (name) => RoleRepository.findByName(name);
