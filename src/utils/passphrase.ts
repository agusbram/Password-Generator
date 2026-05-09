import { dictionary } from './dictionary'

export interface PassphraseOptions {
  wordCount: number
  capitalize: boolean
}

export function generatePassphrase(opts: PassphraseOptions): string {
  const array = new Uint32Array(opts.wordCount)
  crypto.getRandomValues(array)
  const words: string[] = []
  for (let i = 0; i < opts.wordCount; i++) {
    let word = dictionary[array[i] % dictionary.length]
    if (opts.capitalize) {
      word = word.charAt(0).toUpperCase() + word.slice(1)
    }
    words.push(word)
  }
  return words.join('-')
}
