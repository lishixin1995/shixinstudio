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

// A quiet list of names and one preview, all on one screen. On a computer
// the list sits beside the preview and the item under the pointer ripples
// into it from the side of its name; on a phone the preview sits under the
// list, and a first tap shows an item (rippling down from its name) while a
// second tap opens it. A red hairline led by a dot draws under the chosen
// name. Arrow keys browse and Enter opens. Items with status 'soon' are
// listed but not linked.
// filters: category names to filter by (optional); intro: a line under the heading.
const live = (item) => item.status !== 'soon'
const pick = (items, filter) => (filter === 'All' ? items : items.filter((item) => item.category === filter))
// The preview opens on the first item that has a page.
const firstLive = (list) => Math.max(0, list.findIndex(live))

export function StillIndex({ heading, intro, items, base, filters }) {
  const { navigate } = useRouter()
  const stacked = useMedia('(max-width: 760px)')
  const [filter, setFilter] = useState('All')
  const list = useMemo(() => pick(items, filter), [filter, items])
  // index: the item showing; previous: the one it ripples over; drop: counts
  // ripples so each new one remounts; at: where on the preview's edge it lands.
  const [shown, setShown] = useState(() => ({ index: firstLive(items), previous: -1, drop: 0, at: null }))
  const rows = useRef([])
  const preview = useRef(null)
  const latest = useRef({})
  latest.current = { shown, list }

  const current = list[Math.min(shown.index, list.length - 1)]
  const below = shown.previous >= 0 ? list[shown.previous] : null

  // The drop lands on the preview's near edge, level with the name: its left
  // edge beside the list, or its top edge, under the name, below it.
  const landing = (index) => {
    const row = rows.current[index]?.querySelector('.still-name')?.getBoundingClientRect()
    const box = preview.current?.getBoundingClientRect()
    if (!row || !box) return ['0%', '50%']
    const clamp = (share) => `${(Math.min(0.92, Math.max(0.08, share)) * 100).toFixed(1)}%`
    if (stacked) return [clamp((row.left + row.width / 2 - box.left) / box.width), '0%']
    return ['0%', clamp((row.top + row.height / 2 - box.top) / box.height)]
  }

  const show = (index) => {
    setShown((state) => (state.index === index ? state : { index, previous: state.index, drop: state.drop + 1, at: landing(index) }))
  }

  // Touch: the first tap on a name shows it, the next one opens it.
  const lastPointer = useRef('mouse')
  const onTap = (index) => (event) => {
    if (lastPointer.current !== 'mouse' && index !== latest.current.shown.index) {
      event.preventDefault()
      show(index)
    }
  }

  const pickFilter = (name) => {
    setFilter(name)
    setShown((state) => ({ index: firstLive(pick(items, name)), previous: -1, drop: state.drop + 1, at: null }))
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
                onPointerDown: (event) => {
                  lastPointer.current = event.pointerType
                },
                onClick: onTap(index),
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
            <RippleImage key={`drop-${shown.drop}`} className="still-layer" image={current.cover} play="now" origin={shown.at ?? (stacked ? ['50%', '0%'] : ['0%', '50%'])} eager />
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
