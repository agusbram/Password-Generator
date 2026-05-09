<script setup lang="ts">
import { usePasswordGenerator } from '../composables/usePasswordGenerator'
import PasswordOptions from './PasswordOptions.vue'
import PasswordDisplay from './PasswordDisplay.vue'
import HistoryList from './HistoryList.vue'

const { password, copied, options, entropyBits, history, generate, copy, clearHistory } = usePasswordGenerator()

function hasSelectedTypes(): boolean {
  return options.value.uppercase || options.value.lowercase || options.value.numbers || options.value.symbols
}
</script>

<template>
  <div class="generator">
    <PasswordDisplay :password :copied :entropy-bits="entropyBits" @generate="generate" @copy="copy" />
    <PasswordOptions :options :can-generate="hasSelectedTypes()" @update:options="options = $event" @generate="generate" />
    <HistoryList :items="history" @clear="clearHistory" />
  </div>
</template>

<style scoped>
.generator {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
