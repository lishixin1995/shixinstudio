// Every project on the site. Images live in public/images/projects/<slug>/;
// a file that isn't there yet shows as a plain light grey block.
//
// images is the project page, top to bottom (see components/Story.jsx):
//   size: 'full', 'two-thirds', 'half' or 'third'. Two halves in a row become a
//     staggered pair; a run of thirds becomes a stepped series.
//   ratio: the placeholder's shape until the real image arrives (real images
//     keep their own shape). 2:1 or wider runs the full row.
//   note: optional description shown with the caption.
// To add a passage of text between images, put { heading: '…', text: ['…'] }
// in the list where it should appear.

export function imagesFor(folder) {
  return (file, caption, size = 'full', ratio = '16 / 9') => ({ src: `/images/${folder}/${file}.jpg`, caption, size, ratio })
}

const pixel = imagesFor('projects/the-pixel-cloud')
const linc = imagesFor('projects/si-linc')
const farragut = imagesFor('projects/farragut-housing')
const nyu = imagesFor('projects/nyu-faculty-housing')
const switchBuilding = imagesFor('projects/the-switch-building')
const townhouse = imagesFor('projects/townhouse-renovation')

export const categories = ['Academic', 'Professional']

export const projects = [
  {
    slug: 'the-pixel-cloud',
    title: 'The Pixel Cloud',
    category: 'Academic',
    label: 'Thesis Project',
    subtitle: 'Adaptive Reuse / Data Center / Social Infrastructure',
    location: 'Haverstraw, New York',
    year: '2024',
    credits: [
      ['Professor', 'Kai-Uwe Bergmann, Jeremy Siegel'],
      ['Teammate', 'Samira Mohamad']
    ],
    heading: 'Reframing Social Infrastructure',
    tagline: 'Between data and nature, a new kind of public space emerges.',
    text: [
      '“The Pixel Cloud” reimagines a retired power plant in Haverstraw, New York, as a new hub where technology, ecology, and community converge. Through adaptive reuse, the project integrates a data center with natural systems to restore the waterfront and redefine public life. Exhibition spaces, research facilities, and a climate center transform the industrial relic into a living framework for collective renewal.'
    ],
    cover: pixel('cover', 'Exterior view'),
    images: [
      pixel('01-site-plan', 'Site plan', 'half', '4 / 5'),
      pixel('02-ground-floor-plan', 'Ground floor plan — library, entrance garden, exhibition, data center lobby, cafe', 'half', '4 / 5'),
      pixel('03-existing-power-plant', 'Existing Bowline Power Plant', 'third', '6 / 5'),
      pixel('04-offset-wall', 'Offset the existing wall', 'third', '6 / 5'),
      pixel('05-green-space', 'Create outdoor green space', 'third', '6 / 5'),
      pixel('06-new-facade', 'Redesign the existing facade to hold the new curtain wall', 'third', '6 / 5'),
      pixel('07-steel-frame', 'Keep the existing steel frame', 'third', '6 / 5'),
      pixel('08-facade-shading', 'Shade the facade to temper natural light', 'third', '6 / 5'),
      pixel('09-second-floor-plan', 'Second floor plan — library, data center and office, gallery', 'half', '4 / 5'),
      pixel('10-garden-atrium', 'Indoor garden atrium', 'half', '16 / 9'),
      pixel('11-gallery-stair', 'Exhibition stair', 'half', '16 / 9'),
      pixel('12-library-data-center', 'Library beside the data center', 'half', '16 / 9'),
      pixel('13-section-perspective', 'Section perspective', 'full', '16 / 9')
    ]
  },
  {
    slug: 'si-linc',
    title: 'S.I LINC',
    category: 'Academic',
    label: 'Learning Incubator',
    subtitle: 'Adaptive Reuse / Waste-to-Energy / Educational Infrastructure',
    location: 'Staten Island, New York',
    year: '',
    credits: [
      ['Professor', 'Landon Brown'],
      ['Teammate', 'Yunzhe Zhu']
    ],
    heading: 'The Learning Plant',
    tagline: 'Where energy becomes knowledge, and industry becomes community.',
    text: [
      'S.I. LINC reimagines a waste-to-energy plant as a place of learning, renewal, and connection. By merging industrial infrastructure with spaces for education and wellness, the project transforms processes of waste and energy into experiences of awareness and healing. Heat recovered from the plant circulates through the pools and spa above, making visible the hidden cycles that sustain our cities. Here, architecture becomes both system and sanctuary — where the act of learning is inseparable from the act of living.'
    ],
    cover: linc('cover', 'View from the highway'),
    images: [
      linc('01-site-plan', 'Site plan', 'full', '2 / 1'),
      linc('02-ground-floor-plan', 'Ground floor plan', 'full', '16 / 9'),
      linc('03-second-floor-plan', 'Second floor plan', 'half', '16 / 10'),
      linc('04-third-floor-plan', 'Third floor plan', 'half', '16 / 10'),
      linc('05-section', 'Section through the plant, pools and waterfront cafe', 'full', '3 / 1'),
      linc('06-structural-model', 'Structural model', 'full', '16 / 10'),
      linc('07-cutaway-axonometric', 'Cutaway axonometric', 'half', '16 / 10'),
      linc('08-exploded-axonometric', 'Steel frame, incinerator and facade systems', 'half', '4 / 5'),
      linc('09-wall-section', 'Facade wall section', 'half', '4 / 5'),
      linc('10-education-tour-detail', 'Education tour section detail', 'half', '4 / 5'),
      linc('11-waterfront', 'Waterfront elevation', 'full', '3 / 1'),
      linc('12-aerial', 'Aerial view', 'half', '16 / 9'),
      linc('13-courtyard', 'Waterfront courtyard', 'half', '16 / 9')
    ]
  },
  {
    slug: 'farragut-housing',
    title: 'Farragut Housing',
    category: 'Academic',
    label: 'Urban Renewal',
    subtitle: 'Converging Pathways: Enhancing Community with Accessible Design',
    location: 'Brooklyn, New York',
    year: '',
    credits: [
      ['Professor', 'James Garrison'],
      ['Teammate', 'WanDong Xue']
    ],
    heading: 'The Garden Community',
    tagline: 'Urban renewal — community living and collective well-being.',
    text: [
      'This project envisions the renewal of the Farragut Housing complex as a model for inclusive and sustainable community living. By integrating public gardens, shared amenities, and educational programs, the design reconnects residents with nature and one another. It transforms existing open space into a network of accessible pathways and communal courtyards — fostering interaction, wellness, and a renewed sense of belonging within the urban fabric.'
    ],
    cover: farragut('cover', 'Towers along the garden pathways'),
    images: [
      farragut('01-site-plan', 'Site plan', 'half', '4 / 5'),
      farragut('02-aerial-night', 'Aerial view at night', 'half', '4 / 5'),
      farragut('03-sky-bridge', 'Sky bridge between towers', 'full', '16 / 9'),
      farragut('04-upper-floor-plan', 'Upper floor plan', 'half', '4 / 3'),
      farragut('05-basement-plan', 'Basement plan', 'half', '4 / 3'),
      farragut('06-lobby-garden', 'Lobby looking onto the courtyard garden', 'full', '16 / 9'),
      farragut('07-facade-detail', 'New brick facade system, section detail', 'half', '4 / 3'),
      farragut('08-balcony-model', 'Balcony section model', 'half', '4 / 3'),
      farragut('09-curtain-wall-model', 'Curtain wall section model', 'half', '4 / 5'),
      farragut('10-curtain-wall-details', 'Curtain wall section details', 'half', '4 / 5')
    ]
  },
  {
    slug: 'nyu-faculty-housing',
    title: 'NYU Faculty Housing',
    category: 'Professional',
    label: 'Professional Work',
    subtitle: 'Interior Planning & Documentation',
    location: 'Manhattan, New York',
    year: '',
    credits: [],
    heading: '',
    tagline: '',
    text: [
      'Interior renovation of a faculty apartment, documented from demolition and construction plans through the reflected ceiling and power plan to kitchen and bathroom elevations.'
    ],
    cover: nyu('cover', 'Construction plan', 'full', '16 / 10'),
    images: [
      nyu('01-demolition-plan', 'Demolition plan', 'half', '16 / 10'),
      nyu('02-ceiling-power-plan', 'Reflected ceiling and power plan', 'half', '16 / 10'),
      nyu('03-kitchen-elevations', 'Kitchen plan and elevations', 'full', '16 / 10'),
      nyu('04-bathroom-elevations', 'Bathroom elevations and enlarged plans', 'full', '16 / 10')
    ]
  },
  {
    slug: 'the-switch-building',
    title: 'The Switch Building',
    category: 'Professional',
    label: 'Professional Work',
    subtitle: 'Interior Planning & Visualization',
    location: 'Manhattan, New York',
    year: '',
    credits: [],
    heading: '',
    tagline: '',
    text: [
      'Interior planning and visualization for a residence on Norfolk Street, from the reworked unit and roof terrace plans to rendered living spaces.'
    ],
    cover: switchBuilding('cover', 'Facade'),
    images: [
      switchBuilding('01-living-dining', 'Living and dining', 'full', '16 / 9'),
      switchBuilding('02-unit-plan', 'Unit plan', 'half', '2 / 3'),
      switchBuilding('03-roof-terrace-plan', 'Upper floor and roof terrace plan', 'half', '2 / 3'),
      switchBuilding('04-kitchen-stair', 'Kitchen and stair', 'half', '16 / 9'),
      switchBuilding('05-bedroom-study', 'Bedroom study', 'half', '16 / 9'),
      switchBuilding('06-dining-bar', 'Dining and bar', 'half', '16 / 9'),
      switchBuilding('07-bedroom', 'Bedroom', 'half', '16 / 9')
    ]
  },
  {
    slug: 'townhouse-renovation',
    title: 'Townhouse Renovation',
    category: 'Professional',
    label: 'Professional Work',
    subtitle: 'Interior Design & Visualization',
    location: 'Manhattan, New York',
    year: '',
    credits: [],
    heading: '',
    tagline: '',
    text: [
      'Renovation of a townhouse on West 79th Street, presented through the front elevation, floor-by-floor plans and rendered interiors.'
    ],
    cover: townhouse('cover', 'Living room'),
    images: [
      townhouse('01-front-elevation', 'Front elevation', 'half', '3 / 4'),
      townhouse('02-floor-plans', 'Floor plans', 'half', '3 / 4'),
      townhouse('03-living-dining', 'Living and dining', 'half', '16 / 9'),
      townhouse('04-kitchen', 'Kitchen', 'half', '16 / 9'),
      townhouse('05-bedroom', 'Bedroom', 'full', '16 / 9')
    ]
  }
]

export const findProject = (slug) => projects.find((project) => project.slug === slug)
