import { useLayoutEffect, useRef, useState } from 'react'
import { hyphenate } from '../hyphenate.js'

const SHY = '\u00AD'

// The places a word may break: at a soft hyphen (a hyphen then shows at the
// line end) or just after a hyphen it already has (waste-to-energy).
function pieces(word) {
  const out = []
  let current = ''
  for (const char of word) {
    if (char === SHY) {
      out.push({ text: current, mark: '-' })
      current = ''
    } else {
      current += char
      if (char === '-' && current.length > 1) {
        out.push({ text: current, mark: '' })
        current = ''
      }
    }
  }
  out.push({ text: current, mark: '' })
  return out.filter((piece) => piece.text)
}

// Each break costs the square of the room left on its line, plus a little
// for a hyphen, and the breaks are chosen for the whole paragraph at once
// (the way typesetting programs do), so the slack is shared out evenly
// rather than piling up on a few loose lines. The last line costs nothing.
const HYPHEN_COST = 4

export function breakLines(text, capacity) {
  const items = []
  for (const word of hyphenate(text).split(' ')) {
    const parts = pieces(word)
    parts.forEach((piece, index) => items.push({ ...piece, endsWord: index === parts.length - 1 }))
  }
  const n = items.length
  const best = new Array(n + 1).fill(Infinity)
  const from = new Array(n + 1).fill(0)
  best[0] = 0
  for (let i = 0; i < n; i += 1) {
    if (best[i] === Infinity) continue
    let length = 0
    for (let j = i + 1; j <= n; j += 1) {
      const item = items[j - 1]
      length += item.text.length
      const total = length + (item.endsWord ? 0 : item.mark.length)
      if (total > capacity && j > i + 1) break
      const slack = Math.max(0, capacity - total)
      const cost = (j === n ? 0 : slack * slack) + (!item.endsWord && item.mark ? HYPHEN_COST : 0)
      if (best[i] + cost < best[j]) {
        best[j] = best[i] + cost
        from[j] = i
      }
      if (item.endsWord) length += 1
    }
  }
  const lines = []
  for (let j = n; j > 0; j = from[j]) {
    let line = ''
    for (let k = from[j]; k < j; k += 1) line += items[k].text + (items[k].endsWord && k < j - 1 ? ' ' : '')
    if (!items[j - 1].endsWord) line += items[j - 1].mark
    lines.unshift(line)
  }
  return lines
}

// Body copy set flush on both edges with even word spaces. The text is in a
// monospaced face, so a line's width is its length in characters: the copy
// is broken into lines of at most `capacity` characters (at spaces, or inside
// a long word at a hyphenation point), and each full line takes up the few
// pixels it is short of the edge as a hair of extra letter spacing, shared
// evenly by every character and space. Before it has measured, and if
// scripts fail, the text falls back to the browser's own justification.
// The lines sit in one block (`.justified-text`), so they stay together
// inside a parent laid out as a grid, like the dash and text of a CV point.
export function Justified({ as: Tag = 'p', className, text }) {
  const ref = useRef(null)
  const [layout, setLayout] = useState(null)

  useLayoutEffect(() => {
    const el = ref.current
    let width = 0
    const measure = () => {
      const inner = el.clientWidth
      if (!inner || Math.abs(inner - width) < 0.5) return
      width = inner
      const probe = document.createElement('span')
      probe.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;letter-spacing:normal'
      probe.textContent = '0'.repeat(40)
      el.appendChild(probe)
      const char = probe.getBoundingClientRect().width / 40
      probe.remove()
      if (!char) return
      const capacity = Math.max(8, Math.floor((inner + 0.01) / char))
      setLayout({ lines: breakLines(text, capacity), inner, char })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    document.fonts?.ready.then(() => { width = 0; measure() })
    return () => observer.disconnect()
  }, [text])

  if (!layout) {
    return (
      <Tag className={className}>
        <span ref={ref} className="justified-text">{hyphenate(text)}</span>
      </Tag>
    )
  }
  const { lines, inner, char } = layout
  return (
    <Tag className={className} data-justified="">
      <span ref={ref} className="justified-text">
        {lines.map((line, index) => {
          const last = index === lines.length - 1
          const spread = !last && line.length > 1 ? Math.max(0, (inner - line.length * char) / (line.length - 1)) : 0
          return (
            <span key={index} className="justified-line" style={spread ? { letterSpacing: `${spread}px`, marginRight: `${-spread}px` } : undefined}>
              {line}
            </span>
          )
        })}
      </span>
    </Tag>
  )
}
