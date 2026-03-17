import { create } from 'zustand'
import { goalService } from '../services/goalService'

interface Goal {
  _id: string
  title: string
  description: string
  assignedTo: string[]
  createdBy: string
  status: string
  deadline: string
  points: number
  week: number
  createdAt: string
}

interface GoalState {
  goals: Goal[]
  selectedGoal: Goal | null
  isLoading: boolean
  fetchGoals: () => Promise<void>
  setSelectedGoal: (goal: Goal | null) => void
  createGoal: (data: Partial<Goal>) => Promise<void>
  updateStatus: (id: string, status: string) => Promise<void>
}

export const useGoalStore = create<GoalState>((set, get) => ({
  goals: [],
  selectedGoal: null,
  isLoading: false,

  fetchGoals: async () => {
    set({ isLoading: true })
    try {
      const res = await goalService.getMyGoals()
      set({ goals: res.data.data || res.data })
    } catch (e) {
      console.error(e)
    } finally {
      set({ isLoading: false })
    }
  },

  setSelectedGoal: (goal) => set({ selectedGoal: goal }),

  createGoal: async (data) => {
    const res = await goalService.createGoal(data)
    set((state) => ({ goals: [res.data.data, ...state.goals] }))
  },

  updateStatus: async (id, status) => {
    await goalService.updateGoalStatus(id, status)
    set((state) => ({
      goals: state.goals.map((g) => (g._id === id ? { ...g, status } : g)),
    }))
  },
}))
