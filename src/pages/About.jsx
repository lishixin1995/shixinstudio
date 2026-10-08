import { RippleImage } from '../components/Ripple.jsx'
import { education, experience, languages, portrait, profile, site, skills, statement } from '../data/site.js'
import { usePageTitle } from '../router.jsx'

export function About() {
  usePageTitle('About')
  return (
    <main className="page">
      <section className="page-head page-pad">
        <p className="eyebrow">About</p>
        <h1 className="page-title">{statement.title}</h1>
      </section>

      <section className="about-intro page-pad">
        <figure className="about-portrait">
          <RippleImage image={{ src: portrait, caption: 'Portrait' }} ratio="4 / 5" play="now" eager />
          <figcaption>
            <span className="about-name">{site.name}</span>
            <span className="muted">{site.role} — {site.location}</span>
          </figcaption>
        </figure>
        <div className="about-text">
          <p className="about-profile">{profile}</p>
          <p>{statement.text}</p>
        </div>
      </section>

      <section className="cv page-pad" aria-label="Experience and education">
        <div className="cv-block">
          <h2 className="eyebrow">Experience</h2>
          <ol className="cv-list">
            {experience.map((job) => (
              <li key={job.firm + job.years} className="cv-row">
                <span className="cv-years">{job.years}</span>
                <div>
                  <p className="cv-title">{job.firm}</p>
                  <p className="muted">{job.role}</p>
                  <ul className="cv-points">
                    {job.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="cv-block">
          <h2 className="eyebrow">Education</h2>
          <ol className="cv-list">
            {education.map((item) => (
              <li key={item.school} className="cv-row">
                <span className="cv-years">{item.years}</span>
                <div>
                  <p className="cv-title">{item.school}</p>
                  <p className="muted">{item.degree}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="cv-block cv-columns">
          {skills.map((group) => (
            <div key={group.group}>
              <h2 className="eyebrow">{group.group}</h2>
              <ul className="tag-list">{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          ))}
          <div>
            <h2 className="eyebrow">Languages</h2>
            <ul className="tag-list">{languages.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>
    </main>
  )
}
