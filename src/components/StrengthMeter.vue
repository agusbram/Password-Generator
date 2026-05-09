<script setup lang="ts">
import { computed } from 'vue'
import { classifyEntropy, strengthLabels } from '../utils/entropy'
import type { StrengthLevel } from '../utils/entropy'

const props = defineProps<{
  bits: number
}>()

const level = computed<StrengthLevel>(() => classifyEntropy(props.bits))
const label = computed(() => strengthLabels[level.value])
const pct = computed(() => Math.min(100, (props.bits / 100) * 100))

const barColors: Record<StrengthLevel, string> = {
  'very-weak': '#ef4444',
  'weak': '#f97316',
  'medium': '#eab308',
  'strong': '#22c55e',
  'very-strong': '#16a34a',
}
</script>

<template>
  <div v-if="bits > 0" class="meter">
    <div class="bar-track">
      <div class="bar-fill" :style="{ width: pct + '%', background: barColors[level] }" />
    </div>
    <span class="label" :style="{ color: barColors[level] }">{{ bits }} bits — {{ label }}</span>
  </div>
</template>

<style scoped>
.meter {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.bar-track {
  flex: 1;
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s, background 0.3s;
}

.label {
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  min-width: 120px;
  text-align: right;
}
</style>
