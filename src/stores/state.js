import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', () => {
  const progress = ref(0)
  const authenticated = ref(false)

  const incrementProgress = () => {
    progress.value++
  }

  return { progress, incrementProgress, authenticated }
})
