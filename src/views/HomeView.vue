<script setup lang="ts">
import { ref } from 'vue'
import PasswordGenerator from '../components/PasswordGenerator.vue'
import PassphraseGenerator from '../components/PassphraseGenerator.vue'

type Tab = 'password' | 'passphrase'
const activeTab = ref<Tab>('password')
</script>

<template>
  <div class="home">
    <div class="tabs">
      <button :class="['tab', { active: activeTab === 'password' }]" @click="activeTab = 'password'">
        Contraseña
      </button>
      <button :class="['tab', { active: activeTab === 'passphrase' }]" @click="activeTab = 'passphrase'">
        Passphrase
      </button>
    </div>
    <PasswordGenerator v-if="activeTab === 'password'" />
    <PassphraseGenerator v-if="activeTab === 'passphrase'" />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.tabs {
  display: flex;
  gap: 4px;
  border-bottom: 2px solid var(--border);
  padding-bottom: 0;
}

.tab {
  flex: 1;
  padding: 10px 16px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
  transition: color 0.2s, border-color 0.2s;
}

.tab.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.tab:hover:not(.active) {
  color: var(--text);
}
</style>
