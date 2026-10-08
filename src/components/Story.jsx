import { RippleImage } from './Ripple.jsx'

// Lays out a project's images and text with air between them, never as a
// tight grid. Each row holds one idea, rows alternate sides, and no two rows
// line up the same way:
//   two half-width images in a row  → a staggered pair, one larger and lower
//   one half-width image on its own → beside its caption and note
//   a run of third-width images     → a stepped series, each a little lower
//   two-thirds and full width       → shifted left or right in turn;
//                                     panoramas (2:1 or wider) span the row
//   a text block ({ heading, text })→ a narrow column, left or right in turn
// An image may carry a `note`: a short description shown with its caption.

const wide = (ratio = '') => {
  const [w, h] = String(ratio).split('/').map(Number)
  return w && h ? w / h >= 2 : false
}

export function arrange(blocks) {
  const rows = []
  let turn = 0
  for (let i = 0; i < blocks.length; ) {
    const block = blocks[i]
    const side = turn % 2
    turn += 1
    if (block.text && !block.src) {
      rows.push({ kind: 'text', side, blocks: [block] })
      i += 1
    } else if (block.size === 'third') {
      const series = []
      while (i < blocks.length && blocks[i].size === 'third' && blocks[i].src) series.push(blocks[i++])
      for (let k = 0; k < series.length; k += 3) {
        const group = series.slice(k, k + 3)
        rows.push(group.length === 1 ? { kind: 'single', side, blocks: group } : { kind: 'series', side: (side + k / 3) % 2, blocks: group })
      }
    } else if (block.size === 'half' && blocks[i + 1]?.size === 'half' && blocks[i + 1]?.src) {
      rows.push({ kind: 'pair', side, blocks: [block, blocks[i + 1]] })
      i += 2
    } else if (block.size === 'half') {
      rows.push({ kind: 'single', side, blocks: [block] })
      i += 1
    } else if (block.size === 'two-thirds') {
      rows.push({ kind: 'two-thirds', side, blocks: [block] })
      i += 1
    } else {
      rows.push({ kind: wide(block.ratio) ? 'panorama' : 'full', side, blocks: [block] })
      i += 1
    }
  }
  return rows
}

// With onOpen the image is a button (the gallery opens it full screen).
function Media({ image, effect, onOpen }) {
  const picture = <RippleImage image={image} fit="natural" effect={effect} />
  if (!onOpen) return <div className="story-media">{picture}</div>
  return (
    <button type="button" className="story-media story-open" onClick={() => onOpen(image)} aria-label={`Open ${image.label || 'image'}`}>
      {picture}
    </button>
  )
}

function Caption({ image }) {
  if (!image.caption && !image.note) return null
  return (
    <figcaption className="story-caption">
      {image.caption ? <span>{image.caption}</span> : null}
      {image.note ? <p className="story-note">{image.note}</p> : null}
    </figcaption>
  )
}

export function Story({ blocks, effect = 'fade', onOpen }) {
  return (
    <div className="story">
      {arrange(blocks).map((row, index) => {
        const className = `story-row story-${row.kind} side-${row.side}`
        if (row.kind === 'text') {
          const [block] = row.blocks
          return (
            <div key={`text-${index}`} className={className}>
              <div className="story-text">
                {block.heading ? <h3>{block.heading}</h3> : null}
                {[].concat(block.text).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          )
        }
        if (row.kind === 'single') {
          // The caption sits in the open half beside the image.
          const [image] = row.blocks
          return (
            <figure key={image.src} className={className}>
              <Media image={image} effect={effect} onOpen={onOpen} />
              <Caption image={image} />
            </figure>
          )
        }
        return (
          <div key={row.blocks[0].src} className={className}>
            {row.blocks.map((image) => (
              <figure key={image.src} className="story-figure">
                <Media image={image} effect={effect} onOpen={onOpen} />
                <Caption image={image} />
              </figure>
            ))}
          </div>
        )
      })}
    </div>
  )
}
