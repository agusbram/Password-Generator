<script setup lang="ts">
import { usePasswordGenerator } from '../composables/usePasswordGenerator'
import PasswordOptions from './PasswordOptions.vue'
import PasswordDisplay from './PasswordDisplay.vue'

const { password, copied, options, generate, copy } = usePasswordGenerator()

function hasSelectedTypes(): boolean {
  return options.value.uppercase || options.value.lowercase || options.value.numbers || options.value.symbols
}
</script>

<template>
  <div class="generator">
    <PasswordDisplay :password :copied @generate="generate" @copy="copy" />
    <PasswordOptions :options :can-generate="hasSelectedTypes()" @update:options="options = $event" @generate="generate" />
  </div>
</template>

<style scoped>
.generator {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
