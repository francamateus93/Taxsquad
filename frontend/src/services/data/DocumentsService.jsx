import api from "./Api";

// Criar documento
export const createDocument = (data) => api.post("/documents", data);

// Obter documento por ID
export const getDocumentById = (id) => api.get(`/documents/${id}`);

// Atualizar documento
export const updateDocument = (id, data) => api.put(`/documents/${id}`, data);

// Deletar documento
export const deleteDocument = (id) => api.delete(`/documents/${id}`);
