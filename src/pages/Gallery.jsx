import { useEffect, useState } from 'react'
import { Frame } from '../components/Frame.jsx'
import { Story } from '../components/Story.jsx'
import { pad } from '../components/WorkDetail.jsx'
import { gallery } from '../data/gallery.js'
import { usePageTitle } from '../router.jsx'

const RATIOS = ['4 / 5', '1 / 1', '16 / 10', '3 / 4', '4 / 3', '1 / 1']

export function Gallery() {
  usePageTitle('Gallery')
  const [open, setOpen] = useState(-1)
  const blocks = gallery.map((image, index) => ({ src: image.src, label: image.caption, size: 'half', ratio: RATIOS[index % RATIOS.length], index }))

  useEffect(() => {
    if (open < 0) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(-1)
      if (event.key === 'ArrowRight') setOpen((index) => (index + 1) % gallery.length)
      if (event.key === 'ArrowLeft') setOpen((index) => (index - 1 + gallery.length) % gallery.length)
    }
    document.body.classList.add('menu-open')
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <main className="page">
      <section className="page-head page-pad">
        <p className="eyebrow">Gallery</p>
        <h1 className="page-title">Fragments, renders and studies.</h1>
      </section>

      {/* Staggered pairs with plenty of air, like the project pages; each opens full screen. */}
      <section className="gallery-story page-pad" aria-label="Gallery">
        <Story blocks={blocks} effect="ripple" onOpen={(image) => setOpen(image.index)} />
      </section>

      {open >= 0 ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[open].caption} onClick={() => setOpen(-1)}>
          <div className="lightbox-image" onClick={(event) => event.stopPropagation()}>
            <Frame image={gallery[open]} fit="natural" ratio="4 / 3" eager />
          </div>
          <div className="lightbox-bar" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setOpen((open - 1 + gallery.length) % gallery.length)}>← Prev</button>
            <span>{pad(open + 1)} / {pad(gallery.length)}</span>
            <button type="button" onClick={() => setOpen((open + 1) % gallery.length)}>Next →</button>
            <button type="button" onClick={() => setOpen(-1)}>Close</button>
          </div>
        </div>
      ) : null}
    </main>
  )
}
