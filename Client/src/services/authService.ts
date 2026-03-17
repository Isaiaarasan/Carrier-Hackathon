import api from './api'

export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  register: (data: {
    name: string
    email: string
    password: string
    role: string
    department?: string
  }) => api.post('/auth/register', data),

  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),

  getProfile: () => api.get('/auth/me'),

  updateProfile: (data: FormData) =>
    api.put('/auth/profile', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
}
