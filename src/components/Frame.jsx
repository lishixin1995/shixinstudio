import { useState } from 'react'

// An image slot. Until the file exists it shows a grey placeholder with the
// caption and the path to upload to, crossed like a void in a drawing.
// fit 'cover' crops to the ratio (cards, slices); 'natural' keeps the image's
// own shape once loaded (project pages, so drawings are never cropped).
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
      {missing ? (
        <div className="frame-void" aria-hidden="true">
          <span className="frame-caption">{image?.caption}</span>
          <span className="frame-path">{image?.src}</span>
        </div>
      ) : (
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
