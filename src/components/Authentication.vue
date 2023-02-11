<script setup>
  import { ref } from 'vue' 
  import Register from './Register.vue'
  import Login from './Login.vue'
  import Verify from './Verify.vue'

  import { useStateStore } from '../stores/state'
  const state = useStateStore()
</script>

<template>
  <h2 class="mb-1">welcome</h2>
  <div>
    <template v-if="state.progress == 0">
      <Register />
    </template>
    <template v-if="state.progress == 1">
      <Login />
    </template>
    <template v-if="state.progress == 2">
      <Verify />
    </template>
  </div>

</template>
