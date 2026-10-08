import { useEffect, useMemo, useRef, useState } from 'react'
import { Frame } from '../components/Frame.jsx'
import { RippleImage } from '../components/Ripple.jsx'
import { pad } from '../components/WorkDetail.jsx'
import { categories, projects } from '../data/projects.js'
import { Link, usePageTitle, useRouter } from '../router.jsx'

// Every project fits on one screen.
// Computers: a quiet list of names beside one preview; the project under the
// pointer ripples into the preview from the side of its name.
// Phones: Slices (one strip per project, tap to open it up) or Index.
// Arrow keys browse and Enter opens, whether or not anything has focus yet.

const VIEWS = [
  { key: 'slices', label: 'Slices' },
  { key: 'index', label: 'Index' }
]
const VIEW_KEY = 'sx.projects.view'

function readView() {
  try {
    const saved = localStorage.getItem(VIEW_KEY)
    return VIEWS.some((view) => view.key === saved) ? saved : 'slices'
  } catch {
    return 'slices'
  }
}

function saveView(view) {
  try {
    localStorage.setItem(VIEW_KEY, view)
  } catch {
    // The view just won't be remembered.
  }
}

const hoverable = () => window.matchMedia?.('(hover: hover)').matches ?? true

function useMedia(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setMatches(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export function Projects() {
  usePageTitle('Projects')
  const compact = useMedia('(max-width: 760px)')
  return compact ? <CompactProjects /> : <StillWaterIndex />
}

const countIn = (name) => (name === 'All' ? projects.length : projects.filter((project) => project.category === name).length)

function StillWaterIndex() {
  const { navigate } = useRouter()
  const [filter, setFilter] = useState('All')
  const list = useMemo(() => (filter === 'All' ? projects : projects.filter((project) => project.category === filter)), [filter])
  // index: the project showing; previous: the one it ripples over; drop: counts
  // ripples so each new one remounts; y: where on the preview's edge it lands.
  const [shown, setShown] = useState({ index: 0, previous: -1, drop: 0, y: '50%' })
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
    setShown((state) => ({ index: 0, previous: -1, drop: state.drop + 1, y: '50%' }))
  }

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
        navigate(`/projects/${names[state.index].slug}`)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // show only reads refs and the state setter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  return (
    <main className="still">
      <header className="still-head">
        <h1 className="still-title">Projects</h1>
        <div className="still-filters" role="group" aria-label="Filter projects">
          {['All', ...categories].map((name) => (
            <button key={name} type="button" aria-pressed={filter === name} onClick={() => pickFilter(name)}>
              {name}
              <sup>{pad(countIn(name))}</sup>
            </button>
          ))}
        </div>
      </header>

      <div className="still-body">
        <nav className="still-list" aria-label="Projects">
          <ol>
            {list.map((project, index) => (
              <li key={project.slug}>
                <Link
                  to={`/projects/${project.slug}`}
                  ref={(element) => {
                    rows.current[index] = element
                  }}
                  className={`still-row${index === shown.index ? ' is-active' : ''}`}
                  onPointerEnter={(event) => event.pointerType === 'mouse' && show(index)}
                  onFocus={(event) => event.currentTarget.matches(':focus-visible') && show(index)}
                >
                  <span className="still-num">{pad(projects.indexOf(project) + 1)}</span>
                  <span className="still-name">{project.title}</span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="still-count">
            <span>{pad(shown.index + 1)}</span> / {pad(list.length)}
          </p>
        </nav>

        <figure className="still-preview">
          <div className="still-stage" ref={preview} onClick={() => navigate(`/projects/${current.slug}`)} aria-hidden="true">
            {below ? (
              <div className="still-layer" key={`below-${below.slug}`}>
                <Frame image={below.cover} eager />
              </div>
            ) : null}
            <RippleImage key={`drop-${shown.drop}`} className="still-layer" image={current.cover} play="now" origin={['0%', shown.y]} eager />
          </div>
          <figcaption className="still-caption" key={`caption-${shown.drop}`}>
            <span className="still-kicker">{current.category} — {current.label}</span>
            <span className="still-sub">{current.subtitle}</span>
            <span className="still-meta">{[current.location, current.year].filter(Boolean).join(' · ')}</span>
          </figcaption>
        </figure>
      </div>
    </main>
  )
}

function CompactProjects() {
  const { navigate } = useRouter()
  const [filter, setFilter] = useState('All')
  const [view, setView] = useState(readView)
  const [active, setActive] = useState(0)
  const [canHover] = useState(hoverable)
  const items = useRef([])
  const latest = useRef({})

  const list = useMemo(() => (filter === 'All' ? projects : projects.filter((project) => project.category === filter)), [filter])
  const current = list[Math.min(active, list.length - 1)]

  latest.current = { active, list, view }

  useEffect(() => setActive(0), [filter, view])

  useEffect(() => {
    const onKey = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return
      const { active: index, list: shown, view: mode } = latest.current
      const keys = mode === 'index' ? { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 } : { ArrowRight: 1, ArrowLeft: -1 }
      const step = keys[event.key]
      if (step) {
        event.preventDefault()
        const next = (index + step + shown.length) % shown.length
        setActive(next)
        // Keep keyboard focus on the item that is showing, if it was in the list.
        if (document.activeElement?.closest('.projects-stage')) items.current[next]?.focus()
      } else if (event.key === 'Enter' && !event.target.closest?.('a, button')) {
        navigate(`/projects/${shown[index].slug}`)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  // With a mouse the item under the pointer opens up and a click goes in.
  // On touch the first tap opens it up and the second tap goes in.
  const handlers = (index) => ({
    ref: (element) => {
      items.current[index] = element
    },
    onPointerEnter: (event) => event.pointerType === 'mouse' && setActive(index),
    // Only keyboard focus moves the selection; a tap also focuses the link,
    // which must not count as the first tap.
    onFocus: (event) => event.currentTarget.matches(':focus-visible') && setActive(index),
    onClick: (event) => {
      if (!canHover && index !== active) {
        event.preventDefault()
        setActive(index)
      }
    }
  })

  const switchView = (key) => {
    setView(key)
    saveView(key)
  }

  return (
    <main className="projects-page">
      <div className="projects-bar page-pad">
        <h1 className="projects-heading">
          Projects <span className="muted">{pad(projects.length)}</span>
        </h1>
        <div className="chips" role="group" aria-label="Filter projects">
          {['All', ...categories].map((name) => (
            <button key={name} type="button" aria-pressed={filter === name} onClick={() => setFilter(name)}>
              {name}
              <span>{pad(name === 'All' ? projects.length : projects.filter((project) => project.category === name).length)}</span>
            </button>
          ))}
        </div>
        <p className="projects-hint">
          <span className="projects-count">
            {pad(active + 1)} / {pad(list.length)}
          </span>
          <span className="projects-hint-text">{canHover ? 'Hover to preview · Click to open · ← → to browse' : 'Tap to preview · Tap again to open'}</span>
        </p>
        <div className="view-switch" role="group" aria-label="View">
          {VIEWS.map((option) => (
            <button key={option.key} type="button" aria-pressed={view === option.key} onClick={() => switchView(option.key)}>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-stage page-pad">
        {view === 'slices' ? (
          <nav className="slices" aria-label="Projects" style={{ '--count': list.length }}>
            {list.map((project, index) => (
              <Link key={project.slug} to={`/projects/${project.slug}`} className={`slice${index === active ? ' is-active' : ''}`} {...handlers(index)}>
                <Frame image={project.cover} className="slice-image" />
                <span className="slice-shade" aria-hidden="true" />
                <span className="slice-index">{pad(projects.indexOf(project) + 1)}</span>
                <span className="slice-label" aria-hidden={index === active}>{project.title}</span>
                <span className="slice-info">
                  <span className="eyebrow">{project.category} — {project.label}</span>
                  <span className="slice-title">{project.title}</span>
                  <span className="slice-sub">{project.subtitle}</span>
                  <span className="slice-meta">{[project.location, project.year].filter(Boolean).join(' · ')}</span>
                  <span className="text-link">Open project →</span>
                </span>
              </Link>
            ))}
          </nav>
        ) : (
          <div className="index-view">
            <nav aria-label="Projects">
              <ol className="index-list">
                {list.map((project, index) => (
                  <li key={project.slug}>
                    <Link to={`/projects/${project.slug}`} className={`index-row${index === active ? ' is-active' : ''}`} {...handlers(index)}>
                      <span className="index-row-num">{pad(projects.indexOf(project) + 1)}</span>
                      <span className="index-row-title">{project.title}</span>
                      <span className="index-row-meta">{project.category} · {project.location}</span>
                      <span className="index-row-go" aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="index-preview" aria-hidden="true" onClick={() => navigate(`/projects/${current.slug}`)}>
              {list.map((project, index) => (
                <div key={project.slug} className={`preview-layer${index === active ? ' is-active' : ''}`}>
                  <Frame image={project.cover} />
                </div>
              ))}
              <div className="preview-caption">
                <span>{current.label}</span>
                <span>{current.subtitle}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
