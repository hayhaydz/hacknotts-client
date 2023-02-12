import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', {
  state: () => {
    return {
      progress: 0,
      token: '',
      isError: false,
      message: '',
      isAuthenticated: false,
      difficulty: 'relaxed',
      incrementProgress() {
        this.progress++
      }
    }
  },
  persist: true
})
