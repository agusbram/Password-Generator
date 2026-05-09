import { ref, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { generatePassword } from '../utils/password'
import type { PasswordOptions } from '../utils/password'
import { getCharsetSize, calcPasswordEntropy } from '../utils/entropy'

const MAX_HISTORY = 10

export function usePasswordGenerator() {
  const password = ref('')
  const copied = ref(false)
  const history = useLocalStorage<string[]>('pwdgen-password-history', [])

  const options = useLocalStorage<PasswordOptions>('pwdgen-options', {
    length: 20,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
    noConsecutive: false,
  })

  const entropyBits = computed(() => {
    const size = getCharsetSize(options.value)
    return calcPasswordEntropy(size, options.value.length)
  })

  function generate() {
    const pwd = generatePassword(options.value)
    password.value = pwd
    history.value = [pwd, ...history.value].slice(0, MAX_HISTORY)
  }

  async function copy() {
    if (!password.value) return
    try {
      await navigator.clipboard.writeText(password.value)
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

  return { password, copied, options, entropyBits, history, generate, copy, clearHistory }
}
