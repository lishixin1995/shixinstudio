import { Link, usePageTitle } from '../router.jsx'

export function NotFound() {
  usePageTitle('Not found')
  return (
    <main className="page">
      <section className="page-head page-pad">
        <p className="eyebrow">404</p>
        <h1 className="page-title">This page doesn’t exist.</h1>
        <p className="page-lede"><Link to="/" className="text-link">Back to home →</Link></p>
      </section>
    </main>
  )
}
