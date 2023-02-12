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
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
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
    <div class="flex flex-col gap-2 mb-4 [&>input]:border [&>input]:p-2">
      <input type="text" placeholder="username" v-model="username" required>
      <input type="email" placeholder="email" v-model="email" required>
      <input type="password" placeholder="password" v-model="password" required>
    </div>
    <div class="relative">
      <button type="submit" class="block bg-black text-white w-full p-2 mb-2">submit</button>
      <button @click="state.incrementProgress()" class="block underline text-blue-500">login</button>
      <img src="https://www.pngmart.com/files/1/Gold-Star-Sticker-PNG-Image.png" alt="" class="absolute top-[-10px] right-[-10px] w-[60px] h-auto">
    </div>
  </form>
  <img src="https://banner2.cleanpng.com/20180501/ffq/kisspng-sticker-wall-decal-paper-polyvinyl-chloride-encouragement-5ae8c6b4662736.8898442415252046604184.jpg" alt="" class="absolute bottom-[60px] left-[170px] z-[-1] w-[300px] h-auto">
  <img src="https://img.favpng.com/8/11/1/sticker-teacher-paper-job-school-png-favpng-y0VypupMZdbxHYCVx610BRx9d.jpg" alt="" class="absolute top-[30px] left-[60px] z-[-1] w-[300px] h-auto">
  <img src="https://i.redd.it/x95uxs9s6pha1.jpg" alt="" class="absolute bottom-[41px] right-[38px] z-[-1] w-[420px] h-auto">
  <img src="https://preview.redd.it/nzkdkyfr2hz41.jpg?width=640&crop=smart&auto=webp&v=enabled&s=6f3a1c539af9c11b836ec818861e13feef6ca9ae" alt="" class="absolute bottom-[190px] left-[40px] z-[-1] w-[400px] h-auto">
  <img src="https://i.redd.it/4gju47kt3hb61.jpg" alt="" class="absolute top-[20px] right-[30px] z-[-1] w-[400px] h-auto">
  <img src="https://i.kym-cdn.com/entries/icons/mobile/000/018/929/graphic_design_is_my_passion.jpg" alt="" class="absolute bottom-[20px] right-[40%] z-[-1] w-[400px] h-auto">
  <img src="https://preview.redd.it/4u76zs43h8h61.jpg?width=640&crop=smart&auto=webp&v=enabled&s=193dd25c5778fee83288a6b19a8681c19aba6826" alt="" class="absolute top-[20px] left-[40%] z-[-1] w-[300px] h-auto">
</template>
