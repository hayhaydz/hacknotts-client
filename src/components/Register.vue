<script setup>
  import { ref } from 'vue'
  import { useStateStore } from '../stores/state'
  const state = useStateStore()

  const username = ref(null)
  const email = ref(null)
  const password = ref(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    let data = { username: username.value, email: email.value, password: password.value }
    const response = await fetch('https://1b5f-128-243-2-19.eu.ngrok.io/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => err.response)
    
    response.json().then(async (data) => {
      if(data.status == 'success') {
        state.isError = false
        state.incrementProgress()
      } else {
        state.isError = true
      }

      state.message = data.message
    })
  }
</script>

<template>
  <h4 class="mb-4">register</h4>
  <form action="#" @submit="handleSubmit">
    <div class="flex flex-col gap-2 mb-2 [&>input]:border [&>input]:p-2">
      <input type="text" placeholder="username" v-model="username" required>
      <input type="email" placeholder="email" v-model="email" required>
      <input type="password" placeholder="password" v-model="password" required>
    </div>
    <button type="submit">submit</button>
    <button @click="state.incrementProgress()" class="block">login</button>
  </form>
</template>
