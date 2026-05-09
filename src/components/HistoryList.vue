<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  items: string[]
}>()

const emit = defineEmits<{
  clear: []
}>()

const copiedIndex = ref<number | null>(null)

async function copyItem(text: string, index: number) {
  try {
    await navigator.clipboard.writeText(text)
    copiedIndex.value = index
    setTimeout(() => { copiedIndex.value = null }, 2000)
  } catch {
    // fallback silencioso
  }
}
</script>

<template>
  <div v-if="items.length > 0" class="history">
    <div class="history-header">
      <h3>Historial</h3>
      <button class="btn-clear" @click="$emit('clear')">Limpiar</button>
    </div>
    <ul class="history-list">
      <li v-for="(item, i) in items" :key="i" class="history-item">
        <span class="history-text">{{ item }}</span>
        <button class="btn-copy-small" @click="copyItem(item, i)">
          {{ copiedIndex === i ? '✓' : 'Copiar' }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.history {
  margin-top: 8px;
}

.history-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.history-header h3 {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.btn-clear {
  background: none;
  border: none;
  color: var(--accent);
  font-size: 13px;
  cursor: pointer;
  padding: 2px 6px;
}

.btn-clear:hover {
  text-decoration: underline;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
}

.history-text {
  font-family: 'Courier New', Courier, monospace;
  font-size: 13px;
  word-break: break-all;
  color: var(--text);
  flex: 1;
  min-width: 0;
}

.btn-copy-small {
  padding: 4px 10px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--bg);
  color: var(--text);
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.2s;
}

.btn-copy-small:hover {
  border-color: var(--accent);
}
</style>
