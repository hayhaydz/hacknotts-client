<script setup>
  import { useRouter } from 'vue-router'
  import { useStateStore } from '../stores/state'
  const state = useStateStore()
  const router = useRouter()

  const handleClick = () => {
    state.isAuthenticated = false
    router.push('/login')
  }
</script>

<template>
  <div>
    <p>hello world!</p>
    <p>congratulations you made it in</p>
    <button @click="handleClick">logout</button>
  </div>
</template>