import { create } from 'zustand'
import { notificationService } from '../services/notificationService'

interface Notification {
  _id: string
  recipient: string
  type: string
  message: string
  isRead: boolean
  createdAt: string
}

interface NotifState {
  notifications: Notification[]
  unreadCount: number
  isLoading: boolean
  fetchAll: () => Promise<void>
  markRead: (id: string) => Promise<void>
  markAllRead: () => Promise<void>
}

export const useNotifStore = create<NotifState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  fetchAll: async () => {
    set({ isLoading: true })
    try {
      const res = await notificationService.getAll()
      const notifs: Notification[] = res.data.data || res.data
      set({
        notifications: notifs,
        unreadCount: notifs.filter((n) => !n.isRead).length,
      })
    } catch (e) {
      console.error(e)
    } finally {
      set({ isLoading: false })
    }
  },

  markRead: async (id) => {
    await notificationService.markRead(id)
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n._id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }))
  },

  markAllRead: async () => {
    await notificationService.markAllRead()
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    }))
  },
}))
