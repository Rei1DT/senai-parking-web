import axios from 'axios';

// Centraliza a URL base da API para uso em toda a aplicação
export const API_BASE_URL = "https://parkingapisenai.azurewebsites.net";

// Função utilitária para obter o token salvo
export function getToken() {
  return localStorage.getItem('token');
}

// Função utilitária para salvar o token
export function setToken(token) {
  localStorage.setItem('token', token);
}

// Função utilitária para remover o token
export function removeToken() {
  localStorage.removeItem('token');
}

// Função utilitária para criar um axios com o header Authorization correto
export function getAxiosWithToken() {
  const token = getToken();
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
  });
  return instance;
}
