import { ref } from 'vue'
import { generatePassword } from '../utils/password'
import type { PasswordOptions } from '../utils/password'

export function usePasswordGenerator() {
  const password = ref('')
  const copied = ref(false)

  const options = ref<PasswordOptions>({
    length: 20,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  })

  function generate() {
    password.value = generatePassword(options.value)
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

  generate()

  return { password, copied, options, generate, copy }
}
