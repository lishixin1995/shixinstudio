import { nav, site } from '../data/site.js'
import { Link } from '../router.jsx'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-call">
        <p className="eyebrow">Contact</p>
        <a className="footer-mail" href={`mailto:${site.email}`}>{site.email}</a>
      </div>
      <div className="footer-grid">
        <div>
          <p className="footer-brand">{site.brand}</p>
          <p className="muted">{site.name} — {site.role}, {site.location}</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          {nav.map((item) => <Link key={item.path} to={item.path}>{item.label}</Link>)}
        </nav>
        <p className="muted footer-copy">© {new Date().getFullYear()} {site.brand}</p>
      </div>
    </footer>
  )
}
