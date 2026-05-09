import { ref, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { generatePassphrase } from '../utils/passphrase'
import type { PassphraseOptions } from '../utils/passphrase'
import { calcPassphraseEntropy } from '../utils/entropy'
import { dictionary } from '../utils/dictionary'

const MAX_HISTORY = 10

export function usePassphraseGenerator() {
  const passphrase = ref('')
  const copied = ref(false)
  const history = ref<string[]>([])

  const options = useLocalStorage<PassphraseOptions>('pwdgen-passphrase-options', {
    wordCount: 4,
    capitalize: false,
  })

  const entropyBits = computed(() =>
    calcPassphraseEntropy(options.value.wordCount, dictionary.length)
  )

  function generate() {
    const phrase = generatePassphrase(options.value)
    passphrase.value = phrase
    history.value = [phrase, ...history.value].slice(0, MAX_HISTORY)
  }

  async function copy() {
    if (!passphrase.value) return
    try {
      await navigator.clipboard.writeText(passphrase.value)
      copied.value = true
      setTimeout(() => { copied.value = false }, 2000)
    } catch {
      // fallback silencioso
    }
  }

  function clearHistory() {
    history.value = []
  }

  generate()

  return { passphrase, copied, options, entropyBits, history, generate, copy, clearHistory }
}
