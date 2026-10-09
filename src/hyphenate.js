import { hyphenateSync } from 'hyphen/en-us'

const SHY = '­'
const letters = (part) => part.replace(/[^\p{L}]/gu, '').length

// A word may break only with at least two letters before the break and
// three after it, and names with capitals inside (AutoCAD, NYC) never break.
function tidy(word) {
  if (/\p{Lu}.*\p{Lu}/u.test(word)) return word.replaceAll(SHY, '')
  const parts = word.split(SHY)
  while (parts.length > 1 && letters(parts[0]) < 2) parts.splice(0, 2, parts[0] + parts[1])
  while (parts.length > 1 && letters(parts.at(-1)) < 3) parts.splice(-2, 2, parts.at(-2) + parts.at(-1))
  return parts.join(SHY)
}

// Marks where long words may break (soft hyphens, shown only at a line end),
// so justified body copy can fill each line without stretching the spaces
// between words. Done here rather than by the browser, which only hyphenates
// where it has a dictionary.
export const hyphenate = (text) => hyphenateSync(text, { minWordLength: 6 }).split(' ').map(tidy).join(' ')
