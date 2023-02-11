<script setup>
  import { reactive, ref } from 'vue' 
  import Register from './Register.vue'
  import Login from './Login.vue'
  import Verify from './Verify.vue'
  import NumberMemory from './NumberMemory.vue'

  import { useStateStore } from '../stores/state'
  const state = useStateStore()
  state.progress = 0
</script>

<template>
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
    <template v-if="state.progress == 3">
      <NumberMemory :difficulty="3" />
    </template>
    <template v-if="state.progress == 4">
      <NumberMemory :difficulty="6" />
    </template>
    <template v-if="state.progress == 5">
      <NumberMemory :difficulty="9" />
    </template>
  </div>
  <div>
    <template v-if="state.isError">
      <p>{{ state.message }}</p>
    </template>
  </div>
</template>
