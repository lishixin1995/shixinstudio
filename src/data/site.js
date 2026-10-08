// Everything about the person behind the site: header, About, Contact and footer read from here.

export const site = {
  brand: 'SX Architecture',
  name: 'Shixin Doris Li',
  role: 'Architectural Designer',
  location: 'New York',
  email: 'lishixin1995@gmail.com',
  domain: 'shixinstudio.com',
  selectedWork: '2022 — 2025'
}

export const nav = [
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'AI Lab', path: '/ai-lab' },
  { label: 'Contact', path: '/contact' }
]

export const statement = {
  title: 'Architecture is where boundaries become freedom.',
  text:
    'I once questioned what architecture truly means, and to this day, I am still exploring its definition. To me, architecture is not merely the composition of light, material, and space — it is the experience of freedom within boundaries. Through study and practice, I’ve learned how architecture creates serenity, beauty, and safety in the balance between logic and emotion. As artificial intelligence reshapes design, I seek to explore how technology and architecture together can redefine human experience, while also wondering how a return to the raw imagination of Brutalism might awaken new creativity and emotion.'
}

export const profile =
  'Architectural designer with professional experience at Bade Stageberg Cox Architecture, contributing to construction documentation and illustrative site planning for residential and adaptive reuse projects. Proficient in Revit, AutoCAD, and Rhino, combining design creativity with technical precision in the development of architectural projects.'

export const portrait = '/images/about/portrait.jpg'

export const experience = [
  {
    years: 'Nov 2024 — Sep 2025',
    role: 'Junior Architectural Designer',
    firm: 'Bade Stageberg Cox Architecture',
    points: [
      'Assisted in construction documentation and illustrative site planning for residential and adaptive reuse projects.',
      'Produced perspective renderings, detailed plans, and elevations using Revit and AutoCAD.',
      'Prepared Department of Buildings and Landmarks Preservation submission documents.'
    ]
  },
  {
    years: 'Oct 2019 — Aug 2023',
    role: 'Junior Architectural Designer / Project Manager',
    firm: 'SU Architect P.C.',
    points: [
      'Participated in conceptual design development and client coordination.',
      'Produced perspective renderings and project drawings.',
      'Facilitated communication between the design team, technicians, and clients.',
      'Prepared documentation for Department of Buildings and Landmarks Preservation submissions.'
    ]
  },
  {
    years: 'Jun 2019 — Oct 2019',
    role: 'Drafter',
    firm: 'H.G Lee Architect P.C.',
    points: ['Researched policy documents and organized technical indicators.', 'Assisted in advancing design nodes.']
  }
]

export const education = [
  { years: '2021 — 2024', school: 'Pratt Institute', degree: 'Master of Architecture' },
  { years: '2014 — 2019', school: 'New York City College of Technology', degree: 'Bachelor of Technology' }
]

export const skills = [
  { group: 'Documentation & Modeling', items: ['AutoCAD', 'Revit', 'Rhinoceros'] },
  { group: 'Visualization', items: ['D5 Render', 'ChatGPT', 'Photoshop', 'Illustrator', 'InDesign'] },
  { group: 'AI', items: ['Codex', 'ChatGPT'] }
]

export const languages = ['English', 'Mandarin', 'Cantonese']
