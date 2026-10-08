import { useEffect, useMemo, useRef, useState } from 'react'
import { Frame } from '../components/Frame.jsx'
import { StillIndex, useMedia } from '../components/StillIndex.jsx'
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

export function Projects() {
  usePageTitle('Projects')
  const compact = useMedia('(max-width: 760px)')
  return compact ? <CompactProjects /> : <StillIndex heading="Projects" items={projects} base="/projects" filters={categories} />
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
