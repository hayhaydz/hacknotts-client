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
    let ending = 0
    switch (state.difficulty) {
      case 'relaxed':
        ending = 5
        break;
      case 'challenging':
        ending = 9
        break;
      case 'extreme':
        ending = 14
        break;
    }

    if(state.progress == ending) {
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
    <!-- RELAXED END -->
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
      <TileMemory :cols="8" :duration="4" />
    </template>
    <!-- CHALLENGING END -->
    <template v-if="state.progress == 10">
      <NumberMemory :difficulty="9" />
    </template>
    <template v-if="state.progress == 11">
      <TileMemory :cols="8" :duration="6" />
    </template>
    <template v-if="state.progress == 12">
      <NumberMemory :difficulty="11" />
    </template>
    <template v-if="state.progress == 13">
      <TileMemory :cols="9" :duration="5" />
    </template>
    <!-- EXTREME END -->
  </div>
  <div>
    <template v-if="state.isError">
      <p>{{ state.message }}</p>
    </template>
  </div>
</template>
