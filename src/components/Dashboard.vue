<script setup>
  import { useRouter } from 'vue-router'
  import { useStateStore } from '../stores/state'
  const state = useStateStore()
  const router = useRouter()

  const handleClick = () => {
    state.isAuthenticated = false
    router.push('/')
  }
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div>
      <div class="mb-2">
        <h1 class="text-4xl font-bold mb-2">hello world!</h1>
        <p>congratulations you made it here...</p>
      </div>
      <button @click="handleClick" class="underline text-blue-500">logout</button>
    </div>
  </div>
</template>