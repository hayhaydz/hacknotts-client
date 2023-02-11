<script setup></script>

<template>
  <h4 class="mb-4">verify</h4>
  <form action="#">
    <div class="flex flex-col gap-2 mb-2 [&>input]:border [&>input]:p-2">
      <input type="number" placeholder="passcode">
    </div>
    <button type="submit" @click="handleClick" class="block bg-black text-white w-full p-2">submit</button>
  </form>
</template>
