import api from './api'

export const reportService = {
  submitReport: (data: { goalId: string; content: string }) =>
    api.post('/reports', data),
  getMyReports: () => api.get('/reports/mine'),
  getReviewQueue: () => api.get('/reports/queue'),
  getReportById: (id: string) => api.get(`/reports/${id}`),
  reviewReport: (id: string, data: { status: string; score: number; feedback: string }) =>
    api.patch(`/reports/${id}/review`, data),
  summarizeReport: (id: string) => api.post(`/reports/${id}/summarize`),
}
