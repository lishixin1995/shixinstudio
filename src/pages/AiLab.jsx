import { RippleImage } from '../components/Ripple.jsx'
import { StillIndex, useMedia } from '../components/StillIndex.jsx'
import { pad } from '../components/WorkDetail.jsx'
import { aiEntries, aiLabIntro } from '../data/aiLab.js'
import { Link, usePageTitle } from '../router.jsx'

// Computers get the same quiet list and rippling preview as Projects;
// phones keep a simple column of entries.
export function AiLab() {
  usePageTitle('AI Lab')
  const compact = useMedia('(max-width: 760px)')
  if (!compact) return <StillIndex heading="AI Lab" intro={aiLabIntro} items={aiEntries} base="/ai-lab" />
  return (
    <main className="page">
      <section className="page-head page-pad">
        <p className="eyebrow">AI Lab</p>
        <h1 className="page-title">Architecture, imagined with machines.</h1>
        <p className="page-lede">{aiLabIntro}</p>
      </section>

      <section className="lab-list page-pad" aria-label="AI Lab entries">
        {aiEntries.map((entry, index) => {
          const soon = entry.status === 'soon'
          const body = (
            <>
              {soon ? null : <RippleImage image={entry.cover} ratio="16 / 10" />}
              <span className="lab-row">
                <span className="index-number">{pad(index + 1)}</span>
                <span className="lab-text">
                  <span className="eyebrow">{entry.category}{soon ? ' — Coming soon' : ''}</span>
                  <span className="lab-title">{entry.title}</span>
                  <span className="lab-sub">{entry.subtitle}</span>
                </span>
              </span>
            </>
          )
          return soon ? (
            <div key={entry.slug} className="lab-card is-soon">{body}</div>
          ) : (
            <Link key={entry.slug} to={`/ai-lab/${entry.slug}`} className="lab-card">{body}</Link>
          )
        })}
      </section>
    </main>
  )
}
