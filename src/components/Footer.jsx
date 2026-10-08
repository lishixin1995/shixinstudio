import { nav, site } from '../data/site.js'
import { Link } from '../router.jsx'

export function Footer() {
  return (
    <footer className="site-footer">
      {/* One quiet line: the brand, the menu and the year. The email lives on the Contact page. */}
      <div className="footer-grid">
        <p className="footer-brand">{site.brand}</p>
        <nav className="footer-nav" aria-label="Footer">
          {nav.map((item) => <Link key={item.path} to={item.path}>{item.label}</Link>)}
        </nav>
        <p className="muted footer-copy">© {new Date().getFullYear()} {site.brand}</p>
      </div>
    </footer>
  )
}
