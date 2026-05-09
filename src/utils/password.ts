const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'
const AMBIGUOUS = 'oO0l1I|'

export interface PasswordOptions {
  length: number
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
  excludeAmbiguous: boolean
}

function getCharset(opts: PasswordOptions): string {
  let charset = ''
  if (opts.uppercase) charset += UPPERCASE
  if (opts.lowercase) charset += LOWERCASE
  if (opts.numbers) charset += NUMBERS
  if (opts.symbols) charset += SYMBOLS
  if (opts.excludeAmbiguous) {
    for (const ch of AMBIGUOUS) {
      charset = charset.replace(ch, '')
    }
  }
  return charset
}

export function generatePassword(opts: PasswordOptions): string {
  const charset = getCharset(opts)
  if (!charset) return ''

  const array = new Uint32Array(opts.length)
  crypto.getRandomValues(array)
  let password = ''
  for (let i = 0; i < opts.length; i++) {
    password += charset[array[i] % charset.length]
  }
  return password
}
