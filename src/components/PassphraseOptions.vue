<script setup lang="ts">
import type { PassphraseOptions } from '../utils/passphrase'

const props = defineProps<{
  options: PassphraseOptions
}>()

const emit = defineEmits<{
  (e: 'update:options', value: PassphraseOptions): void
  (e: 'generate'): void
}>()

function update<K extends keyof PassphraseOptions>(key: K, value: PassphraseOptions[K]) {
  emit('update:options', { ...props.options, [key]: value })
}
</script>

<template>
  <div class="options">
    <div class="length-row">
      <label for="wordCount">Palabras: {{ options.wordCount }}</label>
      <input id="wordCount" type="range" min="2" max="12" :value="options.wordCount" @input="update('wordCount', Number(($event.target as HTMLInputElement).value))" />
      <input type="number" min="2" max="12" :value="options.wordCount" @input="update('wordCount', Number(($event.target as HTMLInputElement).value))" class="word-count-input" />
    </div>
    <label class="checkbox-label">
      <input type="checkbox" :checked="options.capitalize" @change="update('capitalize', ($event.target as HTMLInputElement).checked)" />
      Capitalizar primera letra de cada palabra
    </label>
    <button class="btn btn-gen" @click="$emit('generate')">
      Generar
    </button>
  </div>
</template>

<style scoped>
.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.length-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.length-row label {
  min-width: 100px;
  font-size: 14px;
}

.length-row input[type="range"] {
  flex: 1;
}

.word-count-input {
  width: 64px;
  padding: 4px 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  text-align: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-gen {
  background: var(--accent);
  color: #fff;
}

.btn-gen:hover {
  background: var(--accent-hover);
}
</style>
