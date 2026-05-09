<script setup lang="ts">
import type { PasswordOptions } from '../utils/password'

const props = defineProps<{
  options: PasswordOptions
  canGenerate: boolean
}>()

const emit = defineEmits<{
  'update:options': [value: PasswordOptions]
  generate: []
}>()

function update<K extends keyof PasswordOptions>(key: K, value: PasswordOptions[K]) {
  emit('update:options', { ...props.options, [key]: value })
}
</script>

<template>
  <div class="options">
    <div class="option-row">
      <label class="checkbox-label">
        <input type="checkbox" :checked="options.uppercase" @change="update('uppercase', ($event.target as HTMLInputElement).checked)" />
        Mayúsculas (A-Z)
      </label>
      <label class="checkbox-label">
        <input type="checkbox" :checked="options.lowercase" @change="update('lowercase', ($event.target as HTMLInputElement).checked)" />
        Minúsculas (a-z)
      </label>
    </div>
    <div class="option-row">
      <label class="checkbox-label">
        <input type="checkbox" :checked="options.numbers" @change="update('numbers', ($event.target as HTMLInputElement).checked)" />
        Números (0-9)
      </label>
      <label class="checkbox-label">
        <input type="checkbox" :checked="options.symbols" @change="update('symbols', ($event.target as HTMLInputElement).checked)" />
        Símbolos (!@#$%...)
      </label>
    </div>
    <label class="checkbox-label">
      <input type="checkbox" :checked="options.excludeAmbiguous" @change="update('excludeAmbiguous', ($event.target as HTMLInputElement).checked)" />
      Excluir ambiguos (oO0, l1I, |)
    </label>
    <label class="checkbox-label">
      <input type="checkbox" :checked="options.noConsecutive" @change="update('noConsecutive', ($event.target as HTMLInputElement).checked)" />
      Evitar repeticiones consecutivas
    </label>
    <div class="length-row">
      <label for="length">Longitud: {{ options.length }}</label>
      <input id="length" type="range" min="4" max="128" :value="options.length" @input="update('length', Number(($event.target as HTMLInputElement).value))" />
      <input type="number" min="4" max="128" :value="options.length" @input="update('length', Number(($event.target as HTMLInputElement).value))" class="length-input" />
    </div>
    <button class="btn btn-gen" :disabled="!canGenerate" @click="$emit('generate')">
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

.option-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 14px;
}

.length-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.length-row label {
  min-width: 80px;
  font-size: 14px;
}

.length-row input[type="range"] {
  flex: 1;
}

.length-input {
  width: 64px;
  padding: 4px 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg);
  color: var(--text);
  text-align: center;
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

.btn-gen:hover:not(:disabled) {
  background: var(--accent-hover);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
