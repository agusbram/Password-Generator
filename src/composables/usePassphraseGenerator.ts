import { ref } from 'vue'
import { generatePassphrase } from '../utils/passphrase'
import type { PassphraseOptions } from '../utils/passphrase'

export function usePassphraseGenerator() {
  const passphrase = ref('')
  const copied = ref(false)

  const options = ref<PassphraseOptions>({
    wordCount: 4,
    capitalize: false,
  })

  function generate() {
    passphrase.value = generatePassphrase(options.value)
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

  generate()

  return { passphrase, copied, options, generate, copy }
}
