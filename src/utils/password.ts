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
  noConsecutive?: boolean
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

  const array = new Uint32Array(opts.length * 2)
  crypto.getRandomValues(array)
  let password = ''
  let lastChar = ''
  for (let i = 0, j = 0; i < opts.length; i++, j++) {
    if (j >= array.length) {
      const extra = new Uint32Array(opts.length)
      crypto.getRandomValues(extra)
      array.set(extra)
      j = 0
    }
    let ch = charset[array[j] % charset.length]
    if (opts.noConsecutive && ch === lastChar && charset.length > 1) {
      const offset = array[(j + 1) % array.length] % (charset.length - 1)
      ch = charset[(charset.indexOf(ch) + 1 + offset) % charset.length]
    }
    password += ch
    lastChar = ch
  }
  return password
}
