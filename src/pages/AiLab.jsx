import { Frame } from '../components/Frame.jsx'
import { pad } from '../components/WorkDetail.jsx'
import { aiEntries, aiLabIntro } from '../data/aiLab.js'
import { Link, usePageTitle } from '../router.jsx'

export function AiLab() {
  usePageTitle('AI Lab')
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
              {soon ? null : <Frame image={entry.cover} ratio="16 / 10" />}
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
