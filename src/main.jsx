import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Contact', path: '/contact' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Gallery', path: '/gallery' }
]

const projects = [
  {
    title: 'The Pixel Cloud',
    slug: 'the-pixel-cloud',
    category: 'Feature Project',
    year: 'Spring 2024',
    type: 'Adaptive Reuse · Data Center · Public Library',
    location: 'Haverstraw, New York',
    role: 'Design, research, visualization, drawings',
    cover: '/images/projects/pixel-cloud-cover.jpg',
    summary:
      'A proposal transforming a retired power plant into a social infrastructure hub that connects adaptive reuse, cloud data center architecture, waterfront access, exhibition spaces, research facilities, and a public library.',
    notes: [
      'Retains the industrial structure as spatial memory while inserting new public programs.',
      'Combines data infrastructure, library spaces, exhibitions, community programs, and waterfront landscape.',
      'Developed through research, diagrams, renderings, plans, sections, and atmospheric visual storytelling.'
    ]
  },
  {
    title: 'S.I LINC',
    slug: 'si-linc',
    category: 'Award Project',
    year: 'Selected Project',
    type: 'Energy Education · Public Infrastructure · Urban System',
    location: 'Staten Island, New York',
    role: 'Design, diagrams, drawings, visualization',
    cover: '/images/projects/si-linc-cover.jpg',
    summary:
      'An award-selected project exploring energy education, public systems, and architectural experience through spatial sequencing and environmental infrastructure.',
    notes: [
      'Frames infrastructure as an educational and spatial experience.',
      'Uses section-driven sequences to connect visitors with environmental systems.',
      'Combines public circulation, exhibition, learning, and urban infrastructure.'
    ]
  },
  {
    title: 'Farragut Housing',
    slug: 'farragut-housing',
    category: 'Award Project',
    year: 'Selected Project',
    type: 'Housing · Urban Design · Community Infrastructure',
    location: 'Brooklyn, New York',
    role: 'Design, research, housing strategy, drawings',
    cover: '/images/projects/farragut-housing-cover.jpg',
    summary:
      'A housing and urban design project examining community infrastructure, density, public ground, and new spatial relationships within an existing residential context.',
    notes: [
      'Studies housing as a larger social and infrastructural system.',
      'Focuses on public ground, circulation, shared programs, density, and neighborhood connections.',
      'Explores how residential architecture can strengthen community life.'
    ]
  },
  {
    title: 'Museum of Emotion',
    slug: 'museum-of-emotion',
    category: 'Feature Project',
    year: 'Academic Project',
    type: 'Museum · Experiential Space · Narrative Design',
    location: 'New York, New York',
    role: 'Concept, design, drawings, visualization',
    cover: '/images/projects/museum-of-emotion-cover.jpg',
    summary:
      'A museum project exploring emotion as spatial sequence, using architecture to translate memory, perception, atmosphere, and movement into an experiential narrative.',
    notes: [
      'Treats emotion as a spatial condition shaped by light, scale, threshold, circulation, and material atmosphere.',
      'Creates a sequence from intimate to open, quiet to intense, and abstract to immersive.',
      'Uses architectural storytelling to build a museum around experience and perception.'
    ]
  },
  {
    title: 'Duplex Apartment Renovation',
    slug: 'duplex-apartment-renovation',
    category: 'Latest Project',
    year: 'Professional Work',
    type: 'Residential Renovation · Interior Architecture',
    location: 'New York, New York',
    role: 'Drawings, coordination, technical documentation',
    cover: '/images/projects/duplex-apartment-renovation-cover.jpg',
    summary:
      'A professional residential renovation project focused on technical coordination, interior organization, construction documentation, and material resolution.',
    notes: [
      'Includes plans, elevations, coordination updates, and technical documentation.',
      'Focuses on renovation logic, existing conditions, interior layout, and construction drawing clarity.'
    ]
  },
  {
    title: 'Townhouse Renovation',
    slug: 'townhouse-renovation',
    category: 'Latest Project',
    year: 'Professional Work',
    type: 'Residential Renovation · Facade · Interiors',
    location: 'New York, New York',
    role: 'Drawings, modeling, coordination, visualization',
    cover: '/images/projects/townhouse-renovation-cover.jpg',
    summary:
      'A professional townhouse renovation project involving residential design development, documentation, coordination, and visualization support.',
    notes: [
      'Addresses existing conditions, residential upgrades, facade coordination, and interior organization.',
      'Supports design development and documentation through drawings, modeling, and coordination.'
    ]
  },
  {
    title: 'School S of Delavan Street',
    slug: 'school-s-of-delavan-street',
    category: 'Latest Project',
    year: 'Academic Project',
    type: 'Education · Public Architecture',
    location: 'New York, New York',
    role: 'Design, drawings, visualization',
    cover: '/images/projects/school-s-of-delavan-street-cover.jpg',
    summary:
      'An academic school project exploring educational space, community use, circulation, and the relationship between learning environments and urban context.',
    notes: [
      'Studies learning environments through gathering, movement, daylight, and flexibility.',
      'Connects school program with public use and urban context.'
    ]
  }
]

const masterSlides = [
  {
    title: 'The Pixel Cloud',
    label: 'Master Render 01',
    image: '/images/master/master-01.jpg',
    projectSlug: 'the-pixel-cloud'
  },
  {
    title: 'S.I LINC',
    label: 'Master Render 02',
    image: '/images/master/master-02.jpg',
    projectSlug: 'si-linc'
  },
  {
    title: 'Farragut Housing',
    label: 'Master Render 03',
    image: '/images/master/master-03.jpg',
    projectSlug: 'farragut-housing'
  },
  {
    title: 'Museum of Emotion',
    label: 'Master Render 04',
    image: '/images/master/master-04.jpg',
    projectSlug: 'museum-of-emotion'
  }
]

const galleryItems = Array.from({ length: 12 }, (_, index) => `/images/gallery/gallery-${String(index + 1).padStart(2, '0')}.jpg`)

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (path) => {
    if (window.location.pathname === path) return
    window.history.pushState({}, '', path)
    setPathname(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { pathname, navigate }
}

function Header({ pathname, navigate }) {
  const [open, setOpen] = useState(false)
  const go = (path) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => go('/')} aria-label="Go to home">
        <span className="brand-mark">S</span>
        <span>
          <strong>Shixin Studio</strong>
          <em>Architecture · Design · Visualization</em>
        </span>
      </button>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <span />
        <span />
        <span />
      </button>
      <nav className={open ? 'site-nav open' : 'site-nav'}>
        {navItems.map((item) => (
          <button
            key={item.path}
            type="button"
            className={pathname === item.path || (item.path === '/projects' && pathname.startsWith('/projects')) ? 'active' : ''}
            onClick={() => go(item.path)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  )
}

function MasterSlideshow({ navigate }) {
  const [current, setCurrent] = useState(0)
  const slide = masterSlides[current]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % masterSlides.length)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="master-hero">
      {masterSlides.map((item, index) => (
        <div
          key={item.image}
          className={index === current ? 'master-slide active' : 'master-slide'}
          style={{ '--image': `url(${item.image})` }}
        />
      ))}
      <div className="master-overlay" />
      <div className="master-content">
        <p className="eyebrow">{slide.label}</p>
        <h1>Shixin Studio</h1>
        <p>Architecture portfolio and selected works exploring adaptive reuse, urban systems, housing, public space, and visual storytelling.</p>
        <div className="hero-actions">
          <button className="button primary" type="button" onClick={() => navigate(`/projects/${slide.projectSlug}`)}>
            View {slide.title}
          </button>
          <button className="button ghost" type="button" onClick={() => navigate('/projects')}>
            Explore Projects
          </button>
        </div>
      </div>
      <div className="slide-controls">
        <button type="button" onClick={() => setCurrent((current - 1 + masterSlides.length) % masterSlides.length)}>←</button>
        <span>{String(current + 1).padStart(2, '0')} / {String(masterSlides.length).padStart(2, '0')}</span>
        <button type="button" onClick={() => setCurrent((current + 1) % masterSlides.length)}>→</button>
      </div>
    </section>
  )
}

function ProjectCard({ project, index, navigate }) {
  return (
    <article className="project-card" onClick={() => navigate(`/projects/${project.slug}`)}>
      <div className="project-image" style={{ '--image': `url(${project.cover})` }}>
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="project-card-text">
        <p>{project.category}</p>
        <h3>{project.title}</h3>
        <span>{project.type}</span>
      </div>
    </article>
  )
}

function Home({ navigate }) {
  return (
    <>
      <MasterSlideshow navigate={navigate} />
      <section className="section split">
        <div>
          <p className="eyebrow">Visionary Spaces for Tomorrow’s World</p>
          <h2>Architecture where boundaries become freedom.</h2>
        </div>
        <div className="large-copy">
          <p>
            Shixin Studio is a portfolio and evolving design platform for selected academic and professional works by Shixin Li. The first version follows the original Wix portfolio structure while giving the site a cleaner long-term studio identity.
          </p>
          <button className="text-link" type="button" onClick={() => navigate('/about')}>Read about the studio</button>
        </div>
      </section>
      <section className="section">
        <div className="section-row">
          <div>
            <p className="eyebrow">Selected Work</p>
            <h2>Featured Projects</h2>
          </div>
          <button className="text-link" type="button" onClick={() => navigate('/projects')}>Explore all projects</button>
        </div>
        <div className="project-grid">
          {projects.slice(0, 6).map((project, index) => <ProjectCard key={project.slug} project={project} index={index} navigate={navigate} />)}
        </div>
      </section>
    </>
  )
}

function Projects({ navigate }) {
  const groups = useMemo(() => [
    { title: 'Feature Project', items: projects.filter((project) => project.category === 'Feature Project') },
    { title: 'Award Projects', items: projects.filter((project) => project.category === 'Award Project') },
    { title: 'Latest Projects', items: projects.filter((project) => project.category === 'Latest Project') }
  ], [])

  return (
    <main className="page-wrap">
      <section className="page-hero">
        <p className="eyebrow">Projects</p>
        <h1>Selected academic and professional work.</h1>
        <p>The structure follows the original Wix portfolio for now: Feature Project, Award Projects, and Latest Projects. We can refine the order, project captions, and images later.</p>
      </section>
      {groups.map((group) => (
        <section className="section grouped" key={group.title}>
          <div className="section-row"><h2>{group.title}</h2><span>{group.items.length} projects</span></div>
          <div className="project-grid">
            {group.items.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} navigate={navigate} />)}
          </div>
        </section>
      ))}
    </main>
  )
}

function ProjectDetail({ slug, navigate }) {
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <NotFound navigate={navigate} />

  return (
    <main className="page-wrap detail-wrap">
      <section className="detail-hero">
        <div className="detail-image" style={{ '--image': `url(${project.cover})` }} />
        <div className="detail-copy">
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
        </div>
      </section>
      <section className="project-meta">
        <div><span>Year</span><strong>{project.year}</strong></div>
        <div><span>Type</span><strong>{project.type}</strong></div>
        <div><span>Location</span><strong>{project.location}</strong></div>
        <div><span>Role</span><strong>{project.role}</strong></div>
      </section>
      <section className="section split">
        <div><p className="eyebrow">Project Notes</p><h2>Design focus</h2></div>
        <ul className="note-list">
          {project.notes.map((note) => <li key={note}>{note}</li>)}
        </ul>
      </section>
      <section className="section image-strip">
        {[project.cover, project.cover, project.cover].map((image, index) => (
          <div key={`${image}-${index}`} className="image-placeholder" style={{ '--image': `url(${image})` }} />
        ))}
      </section>
      <section className="section next-step">
        <button className="button ghost dark" type="button" onClick={() => navigate('/projects')}>Back to Projects</button>
      </section>
    </main>
  )
}

function Gallery() {
  return (
    <main className="page-wrap">
      <section className="page-hero">
        <p className="eyebrow">Gallery</p>
        <h1>Renderings, diagrams, drawings, and selected visual moments.</h1>
        <p>This page is intentionally image-first. Once your final renders are uploaded, this becomes a clean visual archive.</p>
      </section>
      <section className="gallery-grid">
        {galleryItems.map((image, index) => (
          <div key={image} className="gallery-item" style={{ '--image': `url(${image})` }}>
            <span>{String(index + 1).padStart(2, '0')}</span>
          </div>
        ))}
      </section>
    </main>
  )
}

function About() {
  return (
    <main className="page-wrap">
      <section className="page-hero about-hero">
        <p className="eyebrow">About</p>
        <h1>Shixin Studio is the portfolio and evolving design platform of Shixin Li.</h1>
        <p>
          The work explores architecture through adaptive reuse, public infrastructure, housing, visual systems, and spatial storytelling. This first website version keeps the original Wix portfolio structure while creating a cleaner identity for future studio growth.
        </p>
      </section>
      <section className="section split">
        <div><p className="eyebrow">Background</p><h2>Architecture · Design · Visualization</h2></div>
        <div className="large-copy">
          <p>
            Shixin Li is an architectural designer with academic and professional experience across design research, documentation, modeling, visualization, and urban-scale thinking. The portfolio brings together selected graduate work, competition or award-selected projects, and professional renovation work.
          </p>
          <p>
            The studio name is intentionally flexible: it works as a current portfolio identity and can later grow into a broader design, visualization, and architecture platform.
          </p>
        </div>
      </section>
      <section className="skills-grid">
        {['Architecture Design', 'Adaptive Reuse', 'Housing', 'Public Infrastructure', 'Visualization', 'Revit / Rhino / Adobe'].map((item) => <span key={item}>{item}</span>)}
      </section>
    </main>
  )
}

function Contact() {
  return (
    <main className="page-wrap contact-page">
      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>For portfolio, collaboration, or professional inquiries.</h1>
        <p>Contact information can be updated after you decide which email and links you want public on the new site.</p>
      </section>
      <section className="contact-card">
        <div>
          <span>Email</span>
          <a href="mailto:hello@shixinstudio.com">hello@shixinstudio.com</a>
        </div>
        <div>
          <span>Website</span>
          <a href="https://shixinstudio.com">shixinstudio.com</a>
        </div>
        <div>
          <span>Location</span>
          <p>New York City Area</p>
        </div>
      </section>
    </main>
  )
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div><h2>Shixin Studio</h2><p>Architecture, design research, visualization, and selected work by Shixin Li.</p></div>
      <div className="footer-links">
        {navItems.map((item) => <button type="button" key={item.path} onClick={() => navigate(item.path)}>{item.label}</button>)}
      </div>
      <p className="copyright">© {new Date().getFullYear()} Shixin Studio. All rights reserved.</p>
    </footer>
  )
}

function NotFound({ navigate }) {
  return (
    <main className="page-wrap">
      <section className="page-hero">
        <p className="eyebrow">Page not found</p>
        <h1>This page does not exist yet.</h1>
        <button className="button primary" type="button" onClick={() => navigate('/')}>Back Home</button>
      </section>
    </main>
  )
}

function App() {
  const { pathname, navigate } = usePathname()
  const projectMatch = pathname.match(/^\/projects\/([^/]+)$/)

  let page = <Home navigate={navigate} />
  if (pathname === '/projects') page = <Projects navigate={navigate} />
  else if (projectMatch) page = <ProjectDetail slug={projectMatch[1]} navigate={navigate} />
  else if (pathname === '/gallery') page = <Gallery />
  else if (pathname === '/about') page = <About />
  else if (pathname === '/contact') page = <Contact />
  else if (pathname !== '/') page = <NotFound navigate={navigate} />

  return (
    <>
      <Header pathname={pathname} navigate={navigate} />
      {page}
      <Footer navigate={navigate} />
    </>
  )
}

createRoot(document.getElementById('root')).render(<App />)
