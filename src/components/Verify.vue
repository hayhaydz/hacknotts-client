<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStateStore } from '../stores/state'
  const state = useStateStore()
  const router = useRouter()

  const passcode = ref(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = { passcode: passcode.value, token: state.token }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(err => err.response)
    
    response.json().then(async (data) => {
      if(data.status == 'success') {
        state.isError = false
        state.isAuthenticated = true
        router.push('/dashboard')
      } else {
        state.isError = true
      }

      state.message = data.message
    })
  }
</script>

<template>
  <h4 class="mb-4">verify</h4>
  <form action="#" @submit="handleSubmit">
    <div class="flex flex-col gap-2 mb-2 [&>input]:border [&>input]:p-2">
      <input type="number" placeholder="passcode" v-model="passcode">
    </div>
    <a :href="`http://localhost:3080/verify?token=${state.token}`" target="_blank" class="block border border-black bg-transparent text-center w-full p-2 mb-2">retrieve passcode</a>
    <button type="submit" class="block bg-black text-white w-full p-2">submit</button>
  </form>
</template>
