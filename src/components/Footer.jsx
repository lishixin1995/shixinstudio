import { nav, site } from '../data/site.js'
import { Link } from '../router.jsx'
import { Logo } from './Logo.jsx'

export function Footer() {
  return (
    <footer className="site-footer">
      {/* One quiet line: the mark, the menu and the year. The email lives on the Contact page. */}
      <div className="footer-grid">
        <Link to="/" className="footer-brand" aria-label={`${site.name} — home`}><Logo /></Link>
        <nav className="footer-nav" aria-label="Footer">
          {nav.map((item) => <Link key={item.path} to={item.path}>{item.label}</Link>)}
        </nav>
        <p className="muted footer-copy">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  )
}
