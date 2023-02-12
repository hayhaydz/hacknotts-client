<script setup>
  import { ref } from 'vue'
  import { useStateStore } from '../stores/state'
  const state = useStateStore()

  const username = ref(null)
  const password = ref(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = { username: username.value, password: password.value }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => err.response)
    
    response.json().then(async (data) => {
      if(data.status == 'success') {
        state.isError = false
        state.token = data.token
        state.incrementProgress()
      } else {
        state.isError = true
      }

      state.message = data.message
    })
  }
</script>

<template>
  <h4 class="mb-4">login</h4>
  <form action="#" @submit="handleSubmit">
    <div class="flex flex-col gap-2 mb-2 [&>input]:border [&>input]:p-2">
      <input type="text" placeholder="username" v-model="username">
      <input type="password" placeholder="password" v-model="password">
    </div>
    <button type="submit" class="block bg-black text-white w-full p-2 mb-2">login</button>
  </form>
</template>
