import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const aiService = {
  chat: async (message: string, history: { role: 'user' | 'assistant'; content: string }[]) => {
    const token = localStorage.getItem('token');
    return axios.post(`${API_URL}/ai/chat`, {
      message,
      history,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
