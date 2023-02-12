<script setup>
  import Register from './Register.vue'
  import Login from './Login.vue'
  import Verify from './Verify.vue'
  import NumberMemory from './NumberMemory.vue'
  import TileMemory from './TileMemory.vue'

  import { useRouter } from 'vue-router'
  import { useStateStore } from '../stores/state'
  const state = useStateStore()
  const router = useRouter()

  state.progress = 0

  state.$subscribe(() => {
    if(state.progress == 10) {
      state.isAuthenticated = true
      router.push('/dashboard')
    }
  })
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
      <TileMemory :cols="3" :duration="3" />
    </template>
    <template v-if="state.progress == 4">
      <NumberMemory :difficulty="3" />
    </template>
    <template v-if="state.progress == 5">
      <TileMemory :cols="6" :duration="3" />
    </template>
    <template v-if="state.progress == 6">
      <NumberMemory :difficulty="6" />
    </template>
    <template v-if="state.progress == 7">
      <TileMemory :cols="6" :duration="6" />
    </template>
    <template v-if="state.progress == 8">
      <NumberMemory :difficulty="7" />
    </template>
    <template v-if="state.progress == 9">
      <TileMemory :cols="7" :duration="4" />
    </template>
  </div>
  <div>
    <template v-if="state.isError">
      <p>{{ state.message }}</p>
    </template>
  </div>
</template>
