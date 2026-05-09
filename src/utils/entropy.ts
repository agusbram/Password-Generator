import type { PasswordOptions } from './password'

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'
const AMBIGUOUS = 'oO0l1I|'

export function getCharsetSize(opts: PasswordOptions): number {
  let chars = ''
  if (opts.uppercase) chars += UPPERCASE
  if (opts.lowercase) chars += LOWERCASE
  if (opts.numbers) chars += NUMBERS
  if (opts.symbols) chars += SYMBOLS
  if (opts.excludeAmbiguous) {
    for (const ch of AMBIGUOUS) {
      chars = chars.replace(ch, '')
    }
  }
  return chars.length
}

export function calcPasswordEntropy(charsetSize: number, length: number): number {
  if (charsetSize === 0 || length === 0) return 0
  return Math.round(Math.log2(charsetSize) * length)
}

export function calcPassphraseEntropy(wordCount: number, dictSize: number): number {
  if (dictSize === 0 || wordCount === 0) return 0
  return Math.round(Math.log2(dictSize) * wordCount)
}

export type StrengthLevel = 'very-weak' | 'weak' | 'medium' | 'strong' | 'very-strong'

export function classifyEntropy(bits: number): StrengthLevel {
  if (bits < 20) return 'very-weak'
  if (bits < 40) return 'weak'
  if (bits < 60) return 'medium'
  if (bits < 80) return 'strong'
  return 'very-strong'
}

export const strengthLabels: Record<StrengthLevel, string> = {
  'very-weak': 'Muy débil',
  'weak': 'Débil',
  'medium': 'Media',
  'strong': 'Fuerte',
  'very-strong': 'Muy fuerte',
}
