<script setup lang="ts">
defineProps<{
  passphrase: string
  copied: boolean
}>()

const emit = defineEmits<{
  generate: []
  copy: []
}>()
</script>

<template>
  <div class="display">
    <div class="passphrase-box">
      <span class="passphrase-text">{{ passphrase || '—' }}</span>
    </div>
    <div class="actions">
      <button class="btn btn-copy" :disabled="!passphrase" @click="$emit('copy')">
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

.passphrase-box {
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

.passphrase-text {
  font-family: 'Courier New', Courier, monospace;
  font-size: 20px;
  font-weight: 600;
  word-break: break-all;
  color: var(--text);
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
