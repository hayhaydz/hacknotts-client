<script setup>
  import { ref, reactive } from 'vue'
  import { useStateStore } from '../stores/state'

  const props = defineProps(['cols', 'duration'])
  const state = useStateStore()
  const isDisabled = ref(true)
  const countdown = ref(5)
  const index = ref(0)
  const sequence = ref([])
  const msg = ref('')
  const activeTile = ref(null)
  const userSequence = ref([])
  const attempts = ref(0)

  const handleClick = (i) => {
    if(isDisabled.value) return
    if(sequence.value[userSequence.value.length] !== i) {
      if(attempts.value < 2) {
        attempts.value++
        index.value = 0
        countdown.value = 5
        msg.value = 'Try again'
        isDisabled.value = true
        activeTile.value = null
        sequence.value = generateSequence()
        userSequence.value = []
        sequenceIterator = 0
        int = setInterval(intervalEvent, 1000)
        return
      } else {
        state.progress = 0
      }
    }

    userSequence.value.push(i)

    if(userSequence.value.length >= sequence.value.length) {
      state.incrementProgress()
    }   
  }

  const generateSequence = () => {
    let seq = []
    for(let i=0;i<props.duration;i++) {
      seq.push(Math.floor(Math.random() * (((props.cols ** 2) - 1) - 0 + 1) + 0))
    }

    return seq
  }
  
  let sequenceIterator = 0
  const intervalEvent = () => {
    console.log(`${countdown.value} seconds remaining`)
    if(countdown.value > 0) {
      if(index.value == 0) {
        msg.value = countdown.value
      }

      countdown.value--
    } else {
      if(msg.value !== '') msg.value = ''
      if(index.value < sequence.value.length * 2) {
        if(index.value % 2) {
          activeTile.value = null
        } else {
          activeTile.value = sequence.value[sequenceIterator]
          sequenceIterator++
        }

        index.value++
        countdown.value = 1
      } else {
        activeTile.value = null
        isDisabled.value = false
        clearInterval(int)
      }
    }
  }

  sequence.value = generateSequence()
  let int = setInterval(intervalEvent, 1000)
</script>

<template>
  <div class="relative">
    <div :style="{ '--cols': props.cols }" class="grid [grid-template-columns:repeat(var(--cols),minmax(0,1fr));] gap-4 m-auto w-full">
      <span v-for="i in props.cols ** 2" :key="i - 1" @click="handleClick(i-1)" class="w-full h-full aspect-square" :class="[ activeTile === i - 1 ? 'bg-blue-500' : 'bg-gray-200', isDisabled ? 'cursor-default pointer-events-none select-none' : 'cursor-pointer' ]"></span>
    </div>
    <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-4xl pointer-events-none select-none">{{ msg }}</span>
    <div class="absolute left-0 -bottom-8">
      <div class="inline-block mr-4 space-x-2">
        <span v-for="i in 3" :key="i" class="w-4 h-4 rounded-full inline-block" :class="attempts >= i ? 'bg-red-600' : 'bg-red-300'"></span>
      </div>
      <div class="inline-block space-x-2">
        <span v-for="i in props.duration" :key="i" class="w-4 h-4 rounded-full inline-block" :class="userSequence.length > props.duration - i ? 'bg-green-600' : 'bg-green-300'"></span>
      </div>
    </div>
  </div>
  <img src="https://1gamerdash.com/wp-content/uploads/2020/10/among-us-imposter.jpg" alt="" class="absolute bottom-[30px] right-[12%] z-[-1] w-[300px] h-auto">
</template>
