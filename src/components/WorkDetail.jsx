import { Frame } from './Frame.jsx'
import { Link, usePageTitle } from '../router.jsx'

export const pad = (number) => String(number).padStart(2, '0')

// One project page; AI Lab entries use the same layout.
export function WorkDetail({ item, list, base, backLabel }) {
  usePageTitle(item.title)
  const index = list.indexOf(item)
  const prev = list[(index - 1 + list.length) % list.length]
  const next = list[(index + 1) % list.length]
  const meta = [['Type', item.label], ['Location', item.location], ['Year', item.year], ...(item.credits || [])].filter(([, value]) => value)

  return (
    <main className="work">
      <section className="work-head page-pad">
        <div className="work-index">
          <span className="index-number">{pad(index + 1)}</span>
          <span className="eyebrow">{item.category}</span>
        </div>
        <div>
          <h1 className="work-title">{item.title}</h1>
          <p className="work-subtitle">{item.subtitle}</p>
        </div>
      </section>

      {meta.length ? (
        <dl className="work-meta page-inset">
          {meta.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="page-pad">
        <Frame image={item.cover} fit="natural" className="work-hero" eager />
      </div>

      <section className="work-statement page-pad">
        <div>
          {item.heading ? <h2>{item.heading}</h2> : null}
          {item.tagline ? <p className="tagline">{item.tagline}</p> : null}
        </div>
        <div className="work-text">
          {item.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="work-images page-pad" aria-label="Drawings and images">
        {item.images.map((image, number) => (
          <figure key={image.src} className={`work-figure size-${image.size}`}>
            <Frame image={image} fit="natural" />
            <figcaption>
              <span>{pad(number + 1)}</span>
              {image.caption}
            </figcaption>
          </figure>
        ))}
      </section>

      <nav className="work-nav page-inset" aria-label="More work">
        {list.length > 1 ? (
          <Link to={`${base}/${prev.slug}`} className="work-nav-link">
            <span className="eyebrow">← Previous</span>
            <span className="work-nav-title">{prev.title}</span>
          </Link>
        ) : <span />}
        <Link to={base} className="work-nav-all eyebrow">{backLabel}</Link>
        {list.length > 1 ? (
          <Link to={`${base}/${next.slug}`} className="work-nav-link is-next">
            <span className="eyebrow">Next →</span>
            <span className="work-nav-title">{next.title}</span>
          </Link>
        ) : <span />}
      </nav>
    </main>
  )
}
