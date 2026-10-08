import { useState } from 'react'

// An image slot. Until the file is uploaded it stays a plain, very light grey
// block in the image's shape. fit 'cover' crops to the ratio (cards, previews);
// 'natural' keeps the image's own shape once loaded (project pages, so
// drawings are never cropped).
export function Frame(props) {
  return <FrameSlot key={props.image?.src} {...props} />
}

function FrameSlot({ image, fit = 'cover', ratio, className = '', eager = false }) {
  const [state, setState] = useState('loading')
  const shape = ratio || image?.ratio || '16 / 10'
  const missing = !image?.src || state === 'missing'
  const classes = ['frame', `frame--${fit}`, missing ? 'is-missing' : '', state === 'loaded' ? 'is-loaded' : '', className].filter(Boolean).join(' ')

  return (
    <div className={classes} style={{ '--ratio': shape }}>
      {missing ? null : (
        <img
          src={image.src}
          alt={image.caption || ''}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('loaded')}
          onError={() => setState('missing')}
        />
      )}
    </div>
  )
}
