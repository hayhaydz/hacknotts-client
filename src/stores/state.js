import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', () => {
  const progress = ref(0)
  const token = ref('')
  const isError = ref(false)
  const message = ref('')
  const authenticated = ref(false)

  const incrementProgress = () => {
    progress.value++
  }

  return { progress, isError, message, token, incrementProgress, authenticated }
})
