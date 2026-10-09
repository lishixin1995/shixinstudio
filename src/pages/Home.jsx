import { useEffect, useState } from 'react'
import { RippleField, RippleImage } from '../components/Ripple.jsx'
import { pad } from '../components/WorkDetail.jsx'
import { findEntry } from '../data/aiLab.js'
import { findProject } from '../data/projects.js'
import { profile, site, statement } from '../data/site.js'
import { Link, usePageTitle } from '../router.jsx'

// The three works shown under the cover; each opens its own page.
const featured = [
  { item: findProject('the-pixel-cloud'), base: '/projects' },
  { item: findProject('si-linc'), base: '/projects' },
  { item: findEntry('render-exploration'), base: '/ai-lab' }
]

const nyTime = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })

function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  return <time>{nyTime.format(now)}</time>
}

export function Home() {
  usePageTitle('')
  return (
    <main>
      <section className="cover" aria-label={site.name}>
        <RippleField className="cover-water" />
        <div className="cover-center">
          {/* The rule runs exactly under the name. */}
          <div className="cover-name">
            <h1 className="wordmark">{site.name}</h1>
            <span className="cover-rule" aria-hidden="true" />
          </div>
          <div className="cover-lines">
            <p className="cover-titles">
              {site.titles.map((title, index) => (
                <span key={title}>{index ? <span className="cover-slash" aria-hidden="true">/</span> : null}{title}</span>
              ))}
            </p>
            <p className="cover-fields">
              {site.fields.map((field, index) => (
                <span key={field}>{index ? <span className="cover-dot" aria-hidden="true">·</span> : null}{field}</span>
              ))}
            </p>
            <p className="cover-place">{site.location}</p>
          </div>
        </div>
        <div className="cover-foot page-pad">
          <span>Local time <Clock /></span>
          <a className="cover-scroll" href="#featured">
            Scroll
            <span aria-hidden="true" />
          </a>
          <span>Selected work {site.selectedWork}</span>
        </div>
      </section>

      <section className="featured page-pad" id="featured" aria-labelledby="featured-title">
        <div className="section-head">
          <h2 className="eyebrow" id="featured-title">Featured Projects</h2>
          <span className="eyebrow muted">( {pad(featured.length)} )</span>
          <Link to="/projects" className="text-link">All projects →</Link>
        </div>

        {featured.map(({ item, base }, index) => {
          const to = `${base}/${item.slug}`
          return (
            <article key={item.slug} className={`feature${index % 2 ? ' is-flipped' : ''}`}>
              <Link to={to} className="feature-image" aria-label={`Open ${item.title}`}>
                {/* The drop lands on the side facing the text. */}
                <RippleImage image={item.cover} ratio="16 / 10" origin={index % 2 ? ['0%', '72%'] : ['100%', '72%']} />
              </Link>
              <div className="feature-text">
                <span className="index-number">{pad(index + 1)}</span>
                <p className="eyebrow">{item.category} — {item.label}</p>
                <h3 className="feature-title"><Link to={to}>{item.title}</Link></h3>
                <p className="feature-subtitle">{item.subtitle}</p>
                {item.tagline ? <p className="feature-tagline">{item.tagline}</p> : null}
                <Link to={to} className="text-link">View project →</Link>
              </div>
            </article>
          )
        })}
      </section>

      <section className="statement-band" aria-label="About">
        <div className="statement-inner page-pad">
          <p className="eyebrow">About</p>
          <blockquote>{statement.title}</blockquote>
          <div className="statement-side">
            <p>{profile}</p>
            <Link to="/about" className="text-link">About Shixin →</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
