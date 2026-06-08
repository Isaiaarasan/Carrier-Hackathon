import api from './api'

export const userService = {
  getInterns: () => api.get('/users/interns'),
  createIntern: (data: object) => api.post('/users/interns', data),
  getInternById: (id: string) => api.get(`/users/${id}`),
  getInternProgress: (id: string) => api.get(`/users/${id}/progress`),
  getAllUsers: () => api.get('/users'),
  updateUser: (id: string, data: object) => api.put(`/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/users/${id}`),
  getLeaderboard: () => api.get('/users/leaderboard'),
  getAnalytics: () => api.get('/users/analytics'),
}
