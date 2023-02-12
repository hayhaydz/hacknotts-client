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
      <fieldset>
          <legend class="mb-2">Select a difficulty:</legend>
          <div class="space-x-4">
            <div class="inline-block space-x-1">
              <input type="radio" id="relaxed" name="relaxed" value="relaxed" v-model="state.difficulty">
              <label for="relaxed">Relaxed</label>
            </div>
            <div class="inline-block space-x-1">
              <input type="radio" id="challenging" name="challenging" value="challenging" v-model="state.difficulty">
              <label for="challenging">Challenging</label>
            </div>
            <div class="inline-block space-x-1">
              <input type="radio" id="extreme" name="extreme" value="extreme" v-model="state.difficulty">
              <label for="extreme">Extreme</label>
            </div>
          </div>
      </fieldset>
    </div>
    <button type="submit" class="block bg-black text-white w-full p-2 mb-2">login</button>
  </form>
  <img src="https://preview.redd.it/991g1cgy3do61.png?width=640&crop=smart&auto=webp&v=enabled&s=19efafd043aa562a0394c3174104cd061ab910d6" alt="" class="absolute bottom-[50px] right-[10%] z-[-1] w-[300px] h-auto">
</template>
