<script setup>
  import { useStateStore } from '../stores/state'
  const state = useStateStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    state.incrementProgress()
    console.log(state.progress)
  }
</script>

<template>
  <h4 class="mb-4">register</h4>
  <form action="#" @submit="handleSubmit">
    <div class="flex flex-col gap-2 mb-2 [&>input]:border [&>input]:p-2">
      <input type="text" placeholder="username">
      <input type="email" placeholder="email">
      <input type="password" placeholder="password">
    </div>
  </form>
</template>
