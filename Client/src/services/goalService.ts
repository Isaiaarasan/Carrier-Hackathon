import api from './api'

export const goalService = {
  getMyGoals: () => api.get('/goals/mine'),
  getAllGoals: () => api.get('/goals'),
  getGoalById: (id: string) => api.get(`/goals/${id}`),
  createGoal: (data: object) => api.post('/goals', data),
  updateGoalStatus: (id: string, status: string) =>
    api.patch(`/goals/${id}/status`, { status }),
  deleteGoal: (id: string) => api.delete(`/goals/${id}`),
  getInternGoals: (internId: string) => api.get(`/goals/intern/${internId}`),
}
