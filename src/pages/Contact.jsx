import { site } from '../data/site.js'
import { Link, usePageTitle } from '../router.jsx'

export function Contact() {
  usePageTitle('Contact')
  return (
    <main className="page contact-page">
      <section className="page-head page-pad">
        <p className="eyebrow">Contact</p>
        <h1 className="page-title">For work inquiries and collaborations.</h1>
      </section>
      <section className="contact-grid page-inset">
        <div>
          <p className="eyebrow">Email</p>
          <a className="contact-mail" href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <div>
          <p className="eyebrow">Based in</p>
          <p className="contact-value">{site.location}</p>
        </div>
        <div>
          <p className="eyebrow">More</p>
          <p className="contact-value"><Link to="/about" className="text-link">About and CV →</Link></p>
        </div>
      </section>
    </main>
  )
}
