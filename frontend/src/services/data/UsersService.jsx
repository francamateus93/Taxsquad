// frontend/src/services/usersService.js
import api from "./Api";

// Criar novo usuário
export const createUser = (data) => api.post("/users", data);

// Obter usuário por ID
export const getUserById = (id) => api.get(`/users/${id}`);

// Atualizar usuário
export const updateUser = (id, data) => api.put(`/users/${id}`, data);

// Deletar usuário
export const deleteUser = (id) => api.delete(`/users/${id}`);
