<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <header>
    <h1>Password Generator</h1>
    <button class="theme-toggle" @click="toggleDark()" :title="isDark ? 'Modo claro' : 'Modo oscuro'">
      <span v-if="isDark">☀️</span>
      <span v-else>🌙</span>
    </button>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
  position: relative;
}

h1 {
  font-size: 28px;
  margin: 0;
}

.theme-toggle {
  position: absolute;
  right: 0;
  background: none;
  border: 2px solid var(--border);
  border-radius: 8px;
  padding: 6px 10px;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  transition: border-color 0.2s;
}

.theme-toggle:hover {
  border-color: var(--accent);
}
</style>
