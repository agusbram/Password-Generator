<script setup lang="ts">
import { usePassphraseGenerator } from '../composables/usePassphraseGenerator'
import PassphraseOptions from './PassphraseOptions.vue'
import PassphraseDisplay from './PassphraseDisplay.vue'
import HistoryList from './HistoryList.vue'

const { passphrase, copied, options, entropyBits, history, generate, copy, clearHistory } = usePassphraseGenerator()
</script>

<template>
  <div class="generator">
    <PassphraseDisplay :passphrase :copied :entropy-bits="entropyBits" @generate="generate" @copy="copy" />
    <PassphraseOptions :options @update:options="options = $event" @generate="generate" />
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
