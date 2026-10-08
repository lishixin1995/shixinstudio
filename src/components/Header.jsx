import { useEffect, useState } from 'react'
import { nav, site } from '../data/site.js'
import { Link, useRouter } from '../router.jsx'

// Fixed menu bar. On the home cover it stays clear and drops the brand,
// since the cover already shows it; past the cover it turns solid.
export function Header() {
  const { path } = useRouter()
  const home = path === '/'
  const [past, setPast] = useState(!home)
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [path])

  useEffect(() => {
    if (!home) {
      setPast(true)
      return undefined
    }
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.72)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [home])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    if (!open) return undefined
    const onKey = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const active = (item) => path === item.path || path.startsWith(`${item.path}/`)

  return (
    <header className={`site-header${past ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
      <Link to="/" className={`brand${home && !past && !open ? ' is-hidden' : ''}`} aria-label={`${site.brand} — home`}>
        {site.brand}
      </Link>
      <nav className="site-nav" aria-label="Main">
        {nav.map((item) => (
          <Link key={item.path} to={item.path} className={active(item) ? 'is-active' : ''} aria-current={active(item) ? 'page' : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>
      <button type="button" className="menu-button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
        {open ? 'Close' : 'Menu'}
      </button>
      <div className="mobile-menu" id="mobile-menu" hidden={!open}>
        {nav.map((item, index) => (
          <Link key={item.path} to={item.path} className={active(item) ? 'is-active' : ''}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {item.label}
          </Link>
        ))}
        <a className="mobile-mail" href={`mailto:${site.email}`}>{site.email}</a>
      </div>
    </header>
  )
}
