import { useEffect, useMemo, useRef, useState } from 'react'
import { Frame } from './Frame.jsx'
import { RippleImage } from './Ripple.jsx'
import { pad } from './WorkDetail.jsx'
import { Link, useRouter } from '../router.jsx'
import { Justified } from './Justified.jsx'

export function useMedia(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])
  return matches
}

// A quiet list of names beside one preview, all on one screen (computers).
// The item under the pointer ripples into the preview from the side of its
// name, and a red hairline led by a dot draws under the name. Arrow keys
// browse and Enter opens. Items with status 'soon' are listed but not linked.
// filters: category names to filter by (optional); intro: a line under the heading.
const live = (item) => item.status !== 'soon'
const pick = (items, filter) => (filter === 'All' ? items : items.filter((item) => item.category === filter))
// The preview opens on the first item that has a page.
const firstLive = (list) => Math.max(0, list.findIndex(live))

export function StillIndex({ heading, intro, items, base, filters }) {
  const { navigate } = useRouter()
  const [filter, setFilter] = useState('All')
  const list = useMemo(() => pick(items, filter), [filter, items])
  // index: the item showing; previous: the one it ripples over; drop: counts
  // ripples so each new one remounts; y: where on the preview's edge it lands.
  const [shown, setShown] = useState(() => ({ index: firstLive(items), previous: -1, drop: 0, y: '50%' }))
  const rows = useRef([])
  const preview = useRef(null)
  const latest = useRef({})
  latest.current = { shown, list }

  const current = list[Math.min(shown.index, list.length - 1)]
  const below = shown.previous >= 0 ? list[shown.previous] : null

  // The drop lands on the preview's near edge, level with the name.
  const landing = (index) => {
    const row = rows.current[index]?.getBoundingClientRect()
    const box = preview.current?.getBoundingClientRect()
    if (!row || !box) return '50%'
    const share = (row.top + row.height / 2 - box.top) / box.height
    return `${(Math.min(0.92, Math.max(0.08, share)) * 100).toFixed(1)}%`
  }

  const show = (index) => {
    setShown((state) => (state.index === index ? state : { index, previous: state.index, drop: state.drop + 1, y: landing(index) }))
  }

  const pickFilter = (name) => {
    setFilter(name)
    setShown((state) => ({ index: firstLive(pick(items, name)), previous: -1, drop: state.drop + 1, y: '50%' }))
  }

  const open = (item) => live(item) && navigate(`${base}/${item.slug}`)

  useEffect(() => {
    const onKey = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const { shown: state, list: names } = latest.current
      const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key]
      if (step) {
        event.preventDefault()
        const next = (state.index + step + names.length) % names.length
        show(next)
        if (document.activeElement?.closest('.still-list')) rows.current[next]?.focus()
      } else if (event.key === 'Enter' && !event.target.closest?.('a, button')) {
        open(names[state.index])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // show and open only read refs, props and the state setter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  const count = (name) => (name === 'All' ? items.length : items.filter((item) => item.category === name).length)

  return (
    <main className="still">
      <header className="still-head">
        <h1 className="still-title">{heading}</h1>
        {filters ? (
          <div className="still-filters" role="group" aria-label="Filter">
            {['All', ...filters].map((name) => (
              <button key={name} type="button" aria-pressed={filter === name} onClick={() => pickFilter(name)}>
                {name}
                <sup>{pad(count(name))}</sup>
              </button>
            ))}
          </div>
        ) : null}
        {intro ? <Justified className="still-intro" text={intro} /> : null}
      </header>

      <div className="still-body">
        <nav className="still-list" aria-label={heading}>
          <ol>
            {list.map((item, index) => {
              const props = {
                ref: (element) => {
                  rows.current[index] = element
                },
                className: `still-row${index === shown.index ? ' is-active' : ''}${live(item) ? '' : ' is-soon'}`,
                onPointerEnter: (event) => event.pointerType === 'mouse' && show(index),
                onFocus: (event) => event.currentTarget.matches(':focus-visible') && show(index)
              }
              const body = (
                <>
                  <span className="still-num">{pad(items.indexOf(item) + 1)}</span>
                  <span className="still-name">{item.title}</span>
                  {live(item) ? null : <span className="still-soon">Soon</span>}
                </>
              )
              return (
                <li key={item.slug}>
                  {live(item) ? <Link to={`${base}/${item.slug}`} {...props}>{body}</Link> : <span tabIndex={0} {...props}>{body}</span>}
                </li>
              )
            })}
          </ol>
          <p className="still-count">
            <span>{pad(shown.index + 1)}</span> / {pad(list.length)}
          </p>
        </nav>

        <figure className="still-preview">
          <div className={`still-stage${live(current) ? '' : ' is-soon'}`} ref={preview} onClick={() => open(current)} aria-hidden="true">
            {below?.cover ? (
              <div className="still-layer" key={`below-${below.slug}`}>
                <Frame image={below.cover} eager />
              </div>
            ) : null}
            <RippleImage key={`drop-${shown.drop}`} className="still-layer" image={current.cover} play="now" origin={['0%', shown.y]} eager />
          </div>
          <figcaption className="still-caption" key={`caption-${shown.drop}`}>
            <span className="still-kicker">{live(current) ? [current.category, current.label].filter(Boolean).join(' — ') : `${current.category} — Coming soon`}</span>
            <span className="still-sub">{current.subtitle}</span>
            <span className="still-meta">{[current.location, current.year].filter(Boolean).join(' · ')}</span>
          </figcaption>
        </figure>
      </div>
    </main>
  )
}
