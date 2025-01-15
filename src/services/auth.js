/* eslint-disable comma-dangle */
/* eslint-disable no-console */
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030/api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      return response.data;
    } catch (error) {
      console.error("Détails de l'erreur:", {
        message: error.message,
        response: error.response,
        config: error.config,
      });
      throw new Error(
        error.response?.data?.message || 'Erreur de connexion au serveur'
      );
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getToken: () => localStorage.getItem('token'),

  isAuthenticated: () => !!localStorage.getItem('token'),
};
