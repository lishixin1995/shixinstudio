import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'
import { ClickRipples } from './components/Ripple.jsx'
import { WorkDetail } from './components/WorkDetail.jsx'
import { aiEntries, findEntry } from './data/aiLab.js'
import { findProject, projects } from './data/projects.js'
import { About } from './pages/About.jsx'
import { AiLab } from './pages/AiLab.jsx'
import { Contact } from './pages/Contact.jsx'
import { Gallery } from './pages/Gallery.jsx'
import { Home } from './pages/Home.jsx'
import { NotFound } from './pages/NotFound.jsx'
import { Projects } from './pages/Projects.jsx'
import { useRouter } from './router.jsx'

const liveEntries = aiEntries.filter((entry) => entry.status !== 'soon')

function page(path) {
  if (path === '/') return <Home />
  if (path === '/about') return <About />
  if (path === '/projects') return <Projects />
  if (path === '/gallery') return <Gallery />
  if (path === '/ai-lab') return <AiLab />
  if (path === '/contact') return <Contact />

  const [, section, slug] = path.split('/')
  if (section === 'projects') {
    const project = findProject(slug)
    if (project) return <WorkDetail key={slug} item={project} list={projects} base="/projects" backLabel="All projects" />
  }
  if (section === 'ai-lab') {
    const entry = findEntry(slug)
    if (entry) return <WorkDetail key={slug} item={entry} list={liveEntries} base="/ai-lab" backLabel="AI Lab" />
  }
  return <NotFound />
}

export function App() {
  const { path } = useRouter()
  return (
    <>
      <Header />
      <ClickRipples />
      <div className="page-fade" key={path}>
        {page(path)}
      </div>
      <Footer />
    </>
  )
}
