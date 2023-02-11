<script setup>
  import { ref, reactive } from 'vue'
  import { useStateStore } from '../stores/state'

  const props = defineProps(['difficulty'])
  const state = useStateStore()
  const input = ref(null)
  const form = reactive({
    error: false,
    msg: 'Remember the number'
  })
  const isDisabled = ref(true)
  const countdown = ref(3)
  const index = ref(0)
  const number = ref(0)
  const attempts = ref(0)
  const inputEl = ref(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(input.value == number.value) {
      state.incrementProgress()
    } else {
      if(attempts.value < 2) {
        attempts.value++
        index.value = 1
        countdown.value = 5
        form.msg = 'Try again'
        isDisabled.value = true
        input.value = ''
        int = setInterval(intervalEvent, 1000)
      } else {
        state.progress = 0
      }
    }
  }

  const handleKeypress = (e) => {
    e = (e) ? e : window.event;
    let charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      e.preventDefault()
    } else {
      return true;
    }
  }

  let max = 9
  let min = 1
  for(let i=0;i<props.difficulty;i++) {
    max = max + "" + 9
    min = min + "" + 1
  }

  const generateNumber = () => Math.floor(Math.random() * (max - min + 1) + min)

  const intervalEvent = () => {
    console.log(`${countdown.value} seconds remaining`)
    if(countdown.value > 0) {
      if(index.value == 1) {
        form.msg = countdown.value
      }

      countdown.value--
    } else {
      switch (index.value) {
        case 0:
          index.value++;
          countdown.value = 5
          break;
        case 1:
          index.value++
          countdown.value = 5
          number.value = generateNumber()
          form.msg = number.value
          break;
        case 2:
          index.value++
          form.msg = 'What was the number?'
          isDisabled.value = false
          console.log(inputEl.value)
          inputEl.value.focus()
          clearInterval(int)
          break;
      }
    }
  }

  let int = setInterval(intervalEvent, 1000)
</script>

<template>
  <form action="#" @submit="handleSubmit">
    <div class="flex flex-col gap-2 mb-2 [&>input]:border [&>input]:p-2">
      <h3 class="text-center text-4xl font-bold mb-4 pointer-events-none select-none">{{ form.msg }}</h3>
      <input type="number" class="list-none" placeholder="answer" @keypress="handleKeypress" v-model="input" :disabled="isDisabled" ref="inputEl">
    </div>
    <div class="space-x-2">
      <span v-for="i in attempts" :key="i" class="w-4 h-4 rounded-full bg-red-600 inline-block"></span>
    </div>
  </form>
</template>
