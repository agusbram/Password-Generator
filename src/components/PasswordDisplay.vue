<script setup lang="ts">
defineProps<{
  password: string
  copied: boolean
}>()

const emit = defineEmits<{
  generate: []
  copy: []
}>()
</script>

<template>
  <div class="display">
    <div class="password-box">
      <span class="password-text">{{ password || '—' }}</span>
    </div>
    <div class="actions">
      <button class="btn btn-copy" :disabled="!password" @click="$emit('copy')">
        {{ copied ? '¡Copiado!' : 'Copiar' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.password-box {
  width: 100%;
  padding: 16px 20px;
  border: 2px solid var(--border);
  border-radius: 10px;
  background: var(--bg-card);
  text-align: center;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.password-text {
  font-family: 'Courier New', Courier, monospace;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 1px;
  word-break: break-all;
  color: var(--text);
}

.actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-copy {
  background: var(--accent);
  color: #fff;
}

.btn-copy:hover:not(:disabled) {
  background: var(--accent-hover);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
