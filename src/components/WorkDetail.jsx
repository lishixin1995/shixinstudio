import { RippleImage } from './Ripple.jsx'
import { Link, usePageTitle } from '../router.jsx'

export const pad = (number) => String(number).padStart(2, '0')

// One project page; AI Lab entries use the same layout. Kept quiet: a title,
// the cover, a short text with the facts beside it, then each drawing on its
// own with plenty of air, fading in as it comes into view.
export function WorkDetail({ item, list, base, backLabel }) {
  usePageTitle(item.title)
  const index = list.indexOf(item)
  const next = list[(index + 1) % list.length]
  const facts = [['Type', item.label], ['Location', item.location], ['Year', item.year], ...(item.credits || [])].filter(([, value]) => value)

  return (
    <main className="work">
      <section className="work-intro page-pad">
        <p className="work-kicker">
          <span className="index-number">{pad(index + 1)}</span>
          {item.category}
        </p>
        <h1 className="work-title">{item.title}</h1>
        <p className="work-subtitle">{item.subtitle}</p>
      </section>

      <div className="work-cover page-pad">
        <RippleImage image={item.cover} fit="natural" play="now" effect="fade" eager />
      </div>

      <section className="work-about page-pad">
        <div className="work-words">
          {item.heading ? <h2>{item.heading}</h2> : null}
          {item.tagline ? <p className="tagline">{item.tagline}</p> : null}
          {item.text.map((paragraph) => <p key={paragraph} className="work-text">{paragraph}</p>)}
        </div>
        {facts.length ? (
          <dl className="work-facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </section>

      <section className="work-gallery page-pad" aria-label="Drawings and images">
        {item.images.map((image) => (
          <figure key={image.src} className={`work-figure size-${image.size}`}>
            <RippleImage image={image} fit="natural" effect="fade" />
            <figcaption>{image.caption}</figcaption>
          </figure>
        ))}
      </section>

      <nav className="work-end page-pad" aria-label="More work">
        <Link to={base} className="work-back">← {backLabel}</Link>
        {list.length > 1 ? (
          <Link to={`${base}/${next.slug}`} className="work-next">
            <span className="work-next-label">Next</span>
            <span className="work-next-title">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </main>
  )
}
