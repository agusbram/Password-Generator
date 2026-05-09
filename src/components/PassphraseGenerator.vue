<script setup lang="ts">
import { usePassphraseGenerator } from '../composables/usePassphraseGenerator'
import PassphraseOptions from './PassphraseOptions.vue'
import PassphraseDisplay from './PassphraseDisplay.vue'

const { passphrase, copied, options, generate, copy } = usePassphraseGenerator()
</script>

<template>
  <div class="generator">
    <PassphraseDisplay :passphrase :copied @generate="generate" @copy="copy" />
    <PassphraseOptions :options @update:options="options = $event" @generate="generate" />
  </div>
</template>

<style scoped>
.generator {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
